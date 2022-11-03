import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Publicacao } from './../../model/publicacao';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SeguindoService } from '../service/seguindo.service';

@Injectable({ providedIn: 'root' })
export class PublicacoesTimelineResolve implements Resolve<Array<Publicacao>> {

	constructor(private segundoService: SeguindoService, private userAuthenticateService: UserAuthenticateService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Publicacao[] | Observable<Publicacao[]> | Promise<Publicacao[]> {
		let usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		if (usernameUsuarioAutenticado) {
			return this.segundoService.buscarPublicacoesDeQuemOUsuarioAutenticadoSegue(usernameUsuarioAutenticado);
		} throw new Error();
	}

}