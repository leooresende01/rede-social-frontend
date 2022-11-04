import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Publicacao } from './../../model/publicacao';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SeguindoService } from '../service/seguindo.service';
import { Paginacao } from 'src/model/paginacao';

@Injectable({ providedIn: 'root' })
export class PublicacoesTimelineResolve implements Resolve<Paginacao> {
	private readonly paginaInicial: number = 0;
	constructor(private segundoService: SeguindoService, private userAuthenticateService: UserAuthenticateService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Paginacao | Observable<Paginacao> | Promise<Paginacao> {
		let usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		if (usernameUsuarioAutenticado) {
			return this.segundoService.buscarPublicacoesDeQuemOUsuarioAutenticadoSegue(usernameUsuarioAutenticado, this.paginaInicial);
		} throw new Error();
	}

}