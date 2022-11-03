import { UsuarioUtil } from './../util/usuario.util';
import { UserAuthenticateService } from './user-authenticate.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Usuario } from 'src/model/usuario';
import { RegistroForm } from '../dto/registro.dto';
import { AtualizarUsuarioDto } from '../dto/atualizar-usuario.dto';
import { urlApi } from '../util/url-api';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
	private readonly pathApi = "/api/v1/usuarios";
	
	constructor(private http: HttpClient,
		private userAuthenticateService: UserAuthenticateService) { }
		
	registrarUsuario(registroForm: RegistroForm): Observable<any> {
		const formData = UsuarioUtil.pegarFormData(registroForm);
		return this.http.post<any>(`${urlApi}${this.pathApi}`, formData, {
			reportProgress: true,
			observe: 'events'
		});
	}
	
	autalizarInformacoesUsuario(atualizarUsuarioDto: AtualizarUsuarioDto): Observable<Usuario> {
		const usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
		const formData = UsuarioUtil.pegarFormDataAtualizacaoDeInformacoes(atualizarUsuarioDto);
		return this.http
			.put<Usuario>(`${urlApi}${this.pathApi}/${usernameUsuarioAutenticado}`, formData);	
	}

	buscarUsuarioPeloUsername(username: string): Observable<Usuario> {
		return this.http.get<Usuario>(`${urlApi}${this.pathApi}/${username}`);
	}
	
	buscarUsuarioPorRegex(value: any): Observable<Array<Usuario>> {
		return this.http.get<Array<Usuario>>(`${urlApi}${this.pathApi}/regex/${value}`);
	}

}