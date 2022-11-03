import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Publicacao } from 'src/model/publicacao';
import { Usuario } from 'src/model/usuario';
import { urlApi } from '../util/url-api';

@Injectable({ providedIn: 'root' })
export class SeguindoService {
	private readonly usuarioApiPath: string = "/api/v1/usuarios";
	
	constructor(private http: HttpClient, private userAuthenticateService: UserAuthenticateService) { }
	
	buscarPessoasQueOUsuarioSegue(username: string): Observable<Array<Usuario>> {
		return this.http.get<Array<Usuario>>(`${urlApi}${this.usuarioApiPath}/${username}/seguindo`);
	}
	
	seguirUsuario(usernameUsuarioSeguido: string): Observable<Usuario> {
		const usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		return this.http
			.post<Usuario>(`${urlApi}${this.usuarioApiPath}/${usernameUsuarioAutenticado}/seguindo/${usernameUsuarioSeguido}`,
				null);
	}
	
	
	deixarDeSeguirUmUsuario(usernameUsuarioUnfollowed: string): Observable<any> {
		const usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		return this.http
			.delete(`${urlApi}${this.usuarioApiPath}/${usernameUsuarioAutenticado}/seguindo/${usernameUsuarioUnfollowed}`);
	}

	buscarPessoaQueOUsuarioSeguePeloUsername(username: string): Observable<Usuario> {
		const usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		return this.http
		.get<Usuario>(`${urlApi}${this.usuarioApiPath}/${usernameUsuarioAutenticado}/seguindo/${username}`);
	}

	buscarPublicacoesDeQuemOUsuarioAutenticadoSegue(usernameUsuarioAutenticado: string): Observable<Array<Publicacao>> {
		const headers = this.userAuthenticateService.pegarHeaderAuthorization();
		return this.http.get<Array<Publicacao>>(`${urlApi}${this.usuarioApiPath}/${usernameUsuarioAutenticado}/seguindo/publicacoes`, {headers});
	}
}