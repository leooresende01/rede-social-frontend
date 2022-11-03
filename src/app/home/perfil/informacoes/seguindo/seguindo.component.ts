import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AtualizarSeguidoresSeguindoService } from 'src/core/observable/atualizar-seguidores-seguindo.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { UsuarioService } from 'src/core/service/usuario.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Usuario } from 'src/model/usuario';
import { SeguindoService } from './../../../../../core/service/seguindo.service';
import { urlApi } from 'src/core/util/url-api';

@Component({
	selector: 'rs-home-perfil-seguindo',
	templateUrl: './seguindo.component.html',
	styleUrls: ['./seguindo.component.css', '../seguidores/seguidores.component.css']
})
export class SeguindoComponent implements OnInit {
	public seguindo: Array<Usuario>;
	public usernameUsuarioAutenticado: string;
	public urlApi: string = urlApi;
	
	@ViewChild('btnClose')
	public btnClose: ElementRef<HTMLButtonElement>;
	
	@Input()
	public usuarioUsername: string;

	@Input()
	public set seguindoSet(seguindo: Array<Usuario> | null) {
		this.seguindo = seguindo as Array<Usuario>;
	}

	constructor(private userAuthService: UserAuthenticateService,
		private router: Router) { }

	ngOnInit(): void {
		this.usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();
	}

	irParaOPerfilDoUsuario(username: string) {
		this.btnClose.nativeElement.click();
		this.router.navigate(['/home', username]);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
}
