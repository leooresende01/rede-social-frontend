import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, of, switchMap, take, throwError } from "rxjs";
import { UserAuthenticateService } from "../service/user-authenticate.service";
import verificarSeUmaRotaEhProtegida from "../util/verificar-rotas-protegidas.util";
import { LoginDto } from '../dto/login-dto';
import { LoginService } from '../service/login.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({ providedIn: 'root' })
export class AdicionarOuAtualizarTokenInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private userAuthService: UserAuthenticateService,
		private loginService: LoginService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
		if (!verificarSeUmaRotaEhProtegida(req)) return next.handle(req);
		const token = this.userAuthService.pegarLoginDto()?.token;
		if (token) {
			req = this.addTokenHeader(req, token);
		}
		return next.handle(req).pipe(catchError(error => {
			if (error instanceof HttpErrorResponse && error.status === 401) {
				return this.atualizarToken(req, next);
			}
			return throwError(error);
		}));
	}

	private atualizarToken(request: HttpRequest<any>, next: HttpHandler) {
		const tokenRefresh = this.userAuthService.pegarRefreshToken().refreshToken;
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);


			if (tokenRefresh) {
				return this.loginService.atualizarToken().pipe(
					switchMap((loginDto: LoginDto) => {
						this.isRefreshing = false;

						this.userAuthService.salvarLoginDto(loginDto);
						this.refreshTokenSubject.next(loginDto.token);

						return next.handle(this.addTokenHeader(request, loginDto.token));
					}),
					catchError((err) => {
						this.isRefreshing = false;

						this.userAuthService.refazerLoginCasoAtualizacaoDoTokenFalhar();
						return throwError(err);
					})
				);
			}
		}
		if (!tokenRefresh) {
			this.isRefreshing = false;
			this.userAuthService.refazerLoginCasoAtualizacaoDoTokenFalhar();
		}
		return this.refreshTokenSubject.pipe(
			filter(token => token !== null),
			take(1),
			switchMap((token) => next.handle(this.addTokenHeader(request, token)))
		);
	}

	private addTokenHeader(request: HttpRequest<any>, token: string) {
		return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
	}
}

