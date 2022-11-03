import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Publicacao } from 'src/model/publicacao';
import { urlApi } from '../util/url-api';

@Injectable({providedIn: 'root'})
export class PublicacaoService {
	private apiUsuarioPath: string = "/api/v1/usuarios";
	
	constructor(private http: HttpClient, private userAuthService: UserAuthenticateService) {}
	
	buscarPublicacoesDoUsuario(username: string): Observable<Array<Publicacao>> {
		return this.http.get<Array<Publicacao>>(`${urlApi}${this.apiUsuarioPath}/${username}/publicacoes`);
	}

	criarPublicacao(inputImage: File, legenda: string): Observable<any> {
		const username = this.userAuthService.pegarUsernameUsuarioAutenticado();
		const formData = new FormData();
		formData.append('imagem', inputImage, inputImage.name);
		formData.append('legenda', legenda);
		return this.http.post(`${urlApi}${this.apiUsuarioPath}/${username}/publicacoes`, formData, {observe: 'events', reportProgress: true});
	}

	deletarPublicacao(id: number, username: string): Observable<void> {
		return this.http.delete<void>(`${urlApi}${this.apiUsuarioPath}/${username}/publicacoes/${id}`);
	}
}