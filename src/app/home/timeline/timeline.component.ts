import { AlertType } from 'src/model/alert-type';
import { AlertService } from './../../../core/observable/alert.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { SeguidoresSeguindoUtil } from './../../../core/util/seguidores-seguindo.util';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { Publicacao } from './../../../model/publicacao';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Paginacao } from 'src/model/paginacao';
import { SeguindoService } from 'src/core/service/seguindo.service';
import { Alert } from 'src/model/alert';

@Component({
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
	public publicacoes: Array<Publicacao>;
	private publicacoesSubscription: Subscription;
	private paginacao: Paginacao;
	private pagina: number = 0;
	private ultimaPagina: boolean;
	private usernameUsuarioAutenticado: string;
	public estaBuscandoAlgumaPublicacao: boolean = false;

	constructor(private activatedRoute: ActivatedRoute,
		private seguindoService: SeguindoService,
		private userAuthService: UserAuthenticateService,
		private alert: AlertService) { }

	ngOnInit(): void {
		this.publicacoesSubscription = this.activatedRoute.data
			.subscribe(data => this.fazerOBindDosElementosDoResolver(data));
		this.usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();

		window.addEventListener('scroll', () => this.verificarSeOUsuarioChegouNoFinalDaPagina());
	}
	
	fazerOBindDosElementosDoResolver(data: Data): void {
		this.paginacao = data['publicacoes'];
		this.publicacoes = this.paginacao.content as Array<Publicacao>;
		this.ultimaPagina = this.paginacao.last;
	}

	verificarSeOUsuarioChegouNoFinalDaPagina(): void {
		let documentHeight = document.body.scrollHeight;
		let currentScroll = window.scrollY + window.innerHeight;
		let modifier = 200;
		if (currentScroll + modifier > documentHeight) {
			!this.ultimaPagina &&
				!this.estaBuscandoAlgumaPublicacao &&
				this.buscarMaisPublicacoes();
		}
	}

	buscarMaisPublicacoes() {
		this.estaBuscandoAlgumaPublicacao = true;
		this.pagina++;
		this.seguindoService
			.buscarPublicacoesDeQuemOUsuarioAutenticadoSegue(this.usernameUsuarioAutenticado, this.pagina)
			.subscribe(paginacao => this.adicionarAsNovasPublicacoes(paginacao), (err) => this.mostrarErros(err));
	}

	adicionarAsNovasPublicacoes(paginacao: Paginacao): void {
		this.publicacoes = this.publicacoes.concat(paginacao.content as Array<Publicacao>);
		this.ultimaPagina = paginacao.last;
		this.estaBuscandoAlgumaPublicacao = false;
	}

	mostrarErros(err: any): void {
		this.estaBuscandoAlgumaPublicacao = false;
		this.alert.nextValue(new Alert(err.error.mensagem, AlertType.DANGER));
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.publicacoesSubscription);
	}
}
