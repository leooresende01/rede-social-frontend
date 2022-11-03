import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Usuario } from 'src/model/usuario';
import { urlApi } from '../util/url-api';

@Injectable({providedIn: 'root'})
export class SeguidoresService {
	private readonly apiUsuariosPath: string = "/api/v1/usuarios"
	constructor(private http: HttpClient, private userAuthenticateService: UserAuthenticateService) {}

	buscarSeguidoresDoUsuario(usuarioUsername: string): Observable<Array<Usuario>> {
		return this.http
			.get<Array<Usuario>>(`${urlApi}${this.apiUsuariosPath}/${usuarioUsername}/seguidores`);
	}
	
}