import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LoginDto } from "../dto/login-dto";
import { RefreshTokenDto } from './../dto/refresh-token.dto';
import { AlertService } from './../observable/alert.service';

@Injectable({providedIn: 'root'})
export class UserAuthenticateService {
	private readonly atributoLoginDtoNome: string = "loginDto";
	public usernameUsuarioAutenticado: string = 'usernameUsuarioAutenticado';

	constructor(private router: Router, private alertService: AlertService) {
	}

	autenticarEIrParaAHome(loginDto: LoginDto, username: string, nextUrl: string = '/home'): void {
		this.salvarLoginDto(loginDto);
		localStorage.setItem(this.usernameUsuarioAutenticado, username);
		this.router.navigateByUrl(nextUrl);
	}

	salvarLoginDto(loginDto: LoginDto) {
		this.fazerLoggout();
		const loginDtoSerializado = JSON.stringify(loginDto);

		localStorage.setItem(this.atributoLoginDtoNome, loginDtoSerializado);
	}

 	verificaSeOUsuarioEstaAuthenticado(): boolean {
		try {	
			return !!this.pegarLoginDto();
		} catch(e) {}
		return false;
	}
	
	pegarLoginDto(): LoginDto | null {
		const loginDtoSerializado = localStorage.getItem(this.atributoLoginDtoNome);
		if (loginDtoSerializado) {
			const obj = JSON.parse(loginDtoSerializado);
			return LoginDto.mapearParaLoginDto(obj);
		} return null;
	}
	
	pegarHeaderAuthorization(): HttpHeaders {
		try {
			const loginDto = this.pegarLoginDto() as LoginDto;
			return new HttpHeaders({Authorization: `${loginDto.authType} ${loginDto.token}`});
		} catch (e) {}
		return new HttpHeaders();
	}
	
	pegarUsernameUsuarioAutenticado(): string {
		try {
			const loginDto = JSON.parse(localStorage.getItem(this.atributoLoginDtoNome) as string) as LoginDto;
			const tokenParseado = this.descriptografarTokenJWT(loginDto.token);
			return tokenParseado.sub;
		} catch(e) {}
		return '';
	}

	private descriptografarTokenJWT(token: string) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	}

	refazerLoginCasoAtualizacaoDoTokenFalhar() {
		this.fazerLoggout();
		const url = this.router.url.split('?')[0];
		this.router.navigate(['/'], {replaceUrl: true, queryParams: {nextUrl: url}});
		// this.alertService.nextValue(new Alert('Sessão expirada, necessário refazer o login', AlertType.WARNING));
	}

	fazerLoggout(): void {
		localStorage.clear();
	}

	pegarRefreshToken(): RefreshTokenDto {
		const loginDto = this.pegarLoginDto() as LoginDto; 
		const refreshToken = loginDto?.refreshToken;
		return new RefreshTokenDto(refreshToken);
	}
}