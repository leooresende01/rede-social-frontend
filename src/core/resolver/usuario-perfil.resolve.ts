import { AlertType } from 'src/model/alert-type';
import { Alert } from 'src/model/alert';
import { AlertService } from './../observable/alert.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/model/usuario';
import { UsuarioService } from '../service/usuario.service';
@Injectable({providedIn: 'root'})
export class UsuarioPerfilResolve implements Resolve<Usuario> {
	
	constructor(private usuarioService: UsuarioService,
		private router: Router,
		private alertService: AlertService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Usuario | Observable<Usuario> | Promise<Usuario> {
		const username = route.params['username'];
		return this.usuarioService.buscarUsuarioPeloUsername(username)
			.pipe(catchError(error => {
				if (error.status === 404) {
					this.router.navigate(['/not-found']);
				}
				this.alertService.nextValue(new Alert(error.error.mensagem, AlertType.DANGER));
				return throwError(error);
			}));
	}

}