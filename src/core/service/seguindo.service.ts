import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Paginacao } from 'src/model/paginacao';
import { Usuario } from 'src/model/usuario';
import { urlApi } from '../util/url-api';

@Injectable({ providedIn: 'root' })
export class SeguindoService {
	private readonly usuarioApiPath: string = "/api/v1/usuarios";
	private readonly quantidadeDeSeguindosPorPagina: number = 8;

	constructor(private http: HttpClient, private userAuthenticateService: UserAuthenticateService) { }
	
	buscarPessoasQueOUsuarioSegue(username: string, pagina: number): Observable<Paginacao> {
		const params = new HttpParams().set('pagina', pagina).set('quantidade', this.quantidadeDeSeguindosPorPagina);
		return this.http.get<Paginacao>(`${urlApi}${this.usuarioApiPath}/${username}/seguindo`, {params});
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

	buscarPublicacoesDeQuemOUsuarioAutenticadoSegue(usernameUsuarioAutenticado: string, pagina: number): Observable<Paginacao> {
		const headers = this.userAuthenticateService.pegarHeaderAuthorization();
		let params = new HttpParams()
			.set('pagina', pagina)
			.set('quantidadeDePublicacoes', 12);
		return this.http.get<Paginacao>(`${urlApi}${this.usuarioApiPath}/${usernameUsuarioAutenticado}/seguindo/publicacoes`, {headers, params});
	}
}