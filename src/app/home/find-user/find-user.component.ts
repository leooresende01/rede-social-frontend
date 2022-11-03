import { urlApi } from 'src/core/util/url-api';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario';
import { UsuarioUtil } from 'src/core/util/usuario.util';

@Component({
	selector: 'rs-home-finduser',
	templateUrl: './find-user.component.html',
	styleUrls: ['./find-user.component.css']
})
export class FindUserComponent implements OnInit {
	public usuarios: Array<Usuario>;
	public urlApi: string = urlApi;
	
	@Input()
	public formGroup: FormGroup;

	@Input()
	public nome: string;

	public usuarioAutenticadoUsername: string;
	@Input()
	public set usuariosConsulta(usuarios: Array<Usuario> | any) {
		this.usuarios = usuarios as Array<Usuario>;
	}

	constructor(private router: Router, private userAuthService: UserAuthenticateService) { }

	ngOnInit(): void {
		this.usuarioAutenticadoUsername = this.userAuthService.pegarUsernameUsuarioAutenticado();
	}

	irParaOUsuarioSelecionado(username: string) {
		this.formGroup.reset();
		this.router.navigate(['/home', username]);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

}
