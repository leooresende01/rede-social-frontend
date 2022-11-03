import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';
import { Publicacao } from 'src/model/publicacao';
import { AlertService } from '../observable/alert.service';
import { PublicacaoService } from './../service/publicacao.service';
@Injectable({ providedIn: 'root' })
export class PublicacaoResolve implements Resolve<Array<Publicacao>>{

	constructor(private publicacaoService: PublicacaoService,
		private router: Router,
		private alertService: AlertService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Publicacao[] | Observable<Publicacao[]> | Promise<Publicacao[]> {
		const usuarioUsername = route.params['username'];
		return this.publicacaoService.buscarPublicacoesDoUsuario(usuarioUsername)
			.pipe(catchError(error => {
			if (error.status === 404) {
				this.router.navigate(['/not-found']);
			}
			this.alertService.nextValue(new Alert(error.error.mensagem, AlertType.DANGER));
			return throwError(error);
		}));
	}
}