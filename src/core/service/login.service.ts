import { BehaviorSubject } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { LoginForm } from './../dto/login-form';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LoginDto } from './../dto/login-dto';
import { urlApi } from '../util/url-api';

@Injectable({ providedIn: 'root' })
export class LoginService {
	private readonly loginPath: string = "/api/v1/login";

	constructor(private http: HttpClient, 
		private userAuthService: UserAuthenticateService) { }

	autenticarUsuario(loginForm: LoginForm): Observable<LoginDto> {
		return this.http.post<LoginDto>(`${urlApi}${this.loginPath}`, loginForm);
	}

	atualizarToken(): Observable<LoginDto> {
		const refreshToken = this.userAuthService.pegarRefreshToken();
		return this.http.post<LoginDto>(`${urlApi}${this.loginPath}/atualizarToken`, refreshToken);
	}
}