import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Usuario } from 'src/model/usuario';

@Component({
	selector: 'rs-home-perfil-seguidores',
	templateUrl: './seguidores.component.html',
	styleUrls: ['./seguidores.component.css']
})
export class SeguidoresComponent implements OnInit {
	public seguidores: Array<Usuario>;
	public usernameUsuarioAutenticado: string;
	public urlApi: string = urlApi;

	@ViewChild('modal')
	public modal: ElementRef<HTMLDivElement>;

	@ViewChild('btnClose')
	public btnClose: ElementRef<HTMLButtonElement>;

	@Input()
	public usuarioUsername: string;

	@Input()
	public set seguidoresSet(seguidores: Array<Usuario> | null) {
		this.seguidores = seguidores as Array<Usuario>;
	}

	constructor(private userAuthenticateService: UserAuthenticateService,
		private router: Router,
		private renderer: Renderer2) { }

	ngOnInit(): void {
		this.usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
	}

	irParaOPerfilDoUsuario(username: string) {
		this.btnClose.nativeElement.click();
		this.router.navigate(['/home', username]);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
}
