import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AtualizarCurtidaService } from 'src/core/observable/atualizar-curtidas.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Curtida } from './../../../../../model/curtida';

@Component({
	selector: 'rs-mostrar-pessoas-que-curtiram',
	templateUrl: './mostrar-pessoas-que-curtiram.component.html',
	styleUrls: ['../../informacoes/mostrar-seguidores-seguindo/mostrar-seguidores-seguindo.component.css', 
		'./mostrar-pessoas-que-curtiram.component.css']
})
export class MostrarPessoasQueCurtiramComponent implements OnInit {
	public usernameUsuarioAutenticado: string;
	public urlApi: string = urlApi;

	@ViewChild('btnClose')
	public btnClose: ElementRef<HTMLButtonElement>;

	public curtidas: Array<Curtida> | null;
	@Input()
	public donoDaPublicacao: string;
	@Input()
	public idDaPublicacao: number;

	private subscription: Subscription;

	constructor(private userAuthenticateService: UserAuthenticateService,
		private router: Router,
		private atualizarCurtidaService: AtualizarCurtidaService) { }

	ngOnInit(): void {
		this.usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		this.subscription = this.atualizarCurtidaService.getObservable()
			.subscribe(curtidas => this.curtidas = curtidas);
	}

	irParaOPerfilDoUsuario(username: string) {
		this.btnClose.nativeElement.click();
		this.router.navigate(['/home', username]);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.subscription);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
}
