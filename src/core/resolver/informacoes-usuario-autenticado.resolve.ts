import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Usuario } from './../../model/usuario';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';

@Injectable({ providedIn: 'root' })
export class InformacoesUsuarioAutenticadoResolve implements Resolve<Usuario> {

	constructor(private usuarioService: UsuarioService,
		private userAuthService: UserAuthenticateService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Usuario | Observable<Usuario> | Promise<Usuario> {
		const usernameUsuarioAutenticado: string = this.userAuthService.pegarUsernameUsuarioAutenticado();
		return this.usuarioService.buscarUsuarioPeloUsername(usernameUsuarioAutenticado);
	}

}