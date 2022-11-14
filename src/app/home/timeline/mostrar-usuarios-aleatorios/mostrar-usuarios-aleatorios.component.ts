import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { Subscription } from 'rxjs';
import { AlertService } from './../../../../core/observable/alert.service';
import { Router } from '@angular/router';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/core/service/usuario.service';
import { Usuario } from 'src/model/usuario';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Paginacao } from 'src/model/paginacao';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';

@Component({
	selector: 'rs-mostrar-usuarios-aleatorios',
	templateUrl: './mostrar-usuarios-aleatorios.component.html',
	styleUrls: [
		'../../perfil/informacoes/mostrar-seguidores-seguindo/mostrar-seguidores-seguindo.component.css',
		'./mostrar-usuarios-aleatorios.component.css'
	]
})
export class MostrarUsuariosAleatoriosComponent implements OnInit, OnDestroy {
	public usuarios: Array<Usuario>;
	public usernameUsuarioAutenticado: string;
	public urlApi: string = urlApi;
	private paginaAtual: number = 0;
	public estaBuscandoAlgumSeguidor: boolean;
	public ultimaPagina: boolean;
	private usuarioSubscription: Subscription;

	constructor(private usuarioService: UsuarioService,
		private userAuthService: UserAuthenticateService,
		private router: Router,
		private alert: AlertService) { }
		
		ngOnInit(): void {
			this.usuarioService.buscarUsuarios(this.paginaAtual)
			.subscribe(usuariosPage => { 
				this.usuarios = usuariosPage.content as Array<Usuario>;
				this.ultimaPagina = usuariosPage.last;
			});
			this.usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();
	}
	
	irParaOPerfilDoUsuario(username: string) {
		this.router.navigate(['/home', username]);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
	
	buscarMaisSeguidoresOuSeguindo(): void {
		if (!this.ultimaPagina && !this.estaBuscandoAlgumSeguidor) {
			this.paginaAtual++;
			this.estaBuscandoAlgumSeguidor = true;
			this.usuarioSubscription = this.usuarioService.buscarUsuarios(this.paginaAtual)
				.subscribe(paginacao => this.adicionarSeguidoresOuSeguindoBuscados(paginacao));
		}
	}

	private adicionarSeguidoresOuSeguindoBuscados(paginacao: Paginacao): void {
		this.estaBuscandoAlgumSeguidor = false;
		this.usuarios = this.usuarios
		.concat(paginacao.content as Array<Usuario>);
		this.ultimaPagina = paginacao.last;
	}
	
	tratarErros(err: any): void {
		this.paginaAtual--;
		this.estaBuscandoAlgumSeguidor = false;
		this.alert.nextValue(new Alert(err.error.mensagem, AlertType.DANGER));
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.usuarioSubscription);
	}
}
