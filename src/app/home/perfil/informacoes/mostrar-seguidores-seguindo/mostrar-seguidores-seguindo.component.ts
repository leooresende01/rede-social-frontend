import { AlertType } from 'src/model/alert-type';
import { AlertService } from './../../../../../core/observable/alert.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SeguidoresService } from 'src/core/service/seguidores.service';
import { SeguindoService } from 'src/core/service/seguindo.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Paginacao } from 'src/model/paginacao';
import { Usuario } from 'src/model/usuario';
import { Alert } from 'src/model/alert';

@Component({
	selector: 'rs-home-perfil-informacoes-mostrarseguidoresseguindo',
	templateUrl: './mostrar-seguidores-seguindo.component.html',
	styleUrls: ['./mostrar-seguidores-seguindo.component.css']
})

export class MostrarSeguidoresSeguindoComponent implements OnInit {
	public urlApi: string = urlApi;
	public seguidoresOuSeguindos: Array<Usuario>;
	private paginaAtual: number;
	public estaBuscandoAlgumSeguidor: boolean;
	public ultimaPagina: boolean;
	private subscription: any;
	public usernameUsuarioAutenticado: string;

	@ViewChild('modal')
	public modal: ElementRef<HTMLDivElement>;

	@ViewChild('btnClose')
	public btnClose: ElementRef<HTMLButtonElement>;

	@Input()
	public modalTarget: string;

	@Input()
	public set paginacao(paginacao: Paginacao) {
		this.seguidoresOuSeguindos = paginacao?.content as Array<Usuario>;
		this.ultimaPagina = paginacao?.last;
		this.paginaAtual = 0;
	}

	@Input()
	public usuarioUsername: string;

	@Input()
	public eventTarget: string;

	constructor(private userAuthenticateService: UserAuthenticateService,
		private router: Router,
		private seguidoresService: SeguidoresService,
		private seguindoService: SeguindoService,
		private alert: AlertService) { }

	ngOnInit(): void {
		this.usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
	}

	irParaOPerfilDoUsuario(username: string) {
		this.btnClose.nativeElement.click();
		this.router.navigate(['/home', username]);
	}

	buscarMaisSeguidoresOuSeguindo(): void {
		if (!this.ultimaPagina && !this.estaBuscandoAlgumSeguidor) {
			this.paginaAtual++;
			this.estaBuscandoAlgumSeguidor = true;
			this.modalTarget === 'Seguidores' &&
				this.buscarMaisSeguidores();
			this.modalTarget === 'Seguindo' &&
				this.buscarMaisSeguindo();
		}
	}

	private buscarMaisSeguindo() {
		this.subscription = this.seguindoService.buscarPessoasQueOUsuarioSegue(this.usuarioUsername, this.paginaAtual)
			.subscribe(paginacao => this.adicionarSeguidoresOuSeguindoBuscados(paginacao), 
			(err) => this.tratarErros(err))
	}

	private buscarMaisSeguidores() {
		this.subscription = this.seguidoresService.buscarSeguidoresDoUsuario(this.usuarioUsername, this.paginaAtual)
			.subscribe(paginacao => this.adicionarSeguidoresOuSeguindoBuscados(paginacao), 
			(err) => this.tratarErros(err));
	}

	
	private adicionarSeguidoresOuSeguindoBuscados(paginacao: Paginacao): void {
		this.estaBuscandoAlgumSeguidor = false;
		this.seguidoresOuSeguindos = this.seguidoresOuSeguindos
		.concat(paginacao.content as Array<Usuario>);
		this.ultimaPagina = paginacao.last;
	}
	
	tratarErros(err: any): void {
		this.paginaAtual--;
		this.estaBuscandoAlgumSeguidor = false;
		this.alert.nextValue(new Alert(err.error.mensagem, AlertType.DANGER));
		
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.subscription);
	}
}
