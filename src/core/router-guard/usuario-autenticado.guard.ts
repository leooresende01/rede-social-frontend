import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class UsuarioAutenticadoGuard implements CanActivate {
	
	constructor(private userAuthService: UserAuthenticateService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		const usuarioEstaAutenticado = this.userAuthService.verificaSeOUsuarioEstaAuthenticado();
		if (usuarioEstaAutenticado) {
			this.router.navigate(['/home']);
			return false;
		} return true;
	}
	
}