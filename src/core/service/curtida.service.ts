import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Publicacao } from 'src/model/publicacao';
import { urlApi } from '../util/url-api';
import { Curtida } from './../../model/curtida';

@Injectable({providedIn: 'root'})
export class CurtidaService {
	private apiUsuarioPath: string = '/api/v1/usuarios';
	
	constructor(private http: HttpClient, private userAuthService: UserAuthenticateService) {}
	
	buscarCurtidasDeUmaPublicacao(donoDaPublicacao: string, idDaPublicacao: number): Observable<Array<Curtida>> {
		return this.http
			.get<Array<Curtida>>(`${urlApi}${this.apiUsuarioPath}/${donoDaPublicacao}/publicacoes/${idDaPublicacao}/curtidas`);
	}

	curtirUmaPublicacao(id: number, username: string): Observable<Publicacao> {
		return this.http.post<Publicacao>(`${urlApi}${this.apiUsuarioPath}/${username}/publicacoes/${id}/curtidas`, null);
	}

	descurtirPublicacao(id: number, username: string): Observable<void> {
		return this.http.delete<void>(`${urlApi}${this.apiUsuarioPath}/${username}/publicacoes/${id}/curtidas`);
	}
}