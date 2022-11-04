import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Paginacao } from 'src/model/paginacao';
import { urlApi } from '../util/url-api';

@Injectable({providedIn: 'root'})
export class SeguidoresService {
	private readonly apiUsuariosPath: string = "/api/v1/usuarios";
	private readonly quantidadeDeSeguidoresPorBusca: number = 8;

	constructor(private http: HttpClient, private userAuthenticateService: UserAuthenticateService) {}

	buscarSeguidoresDoUsuario(usuarioUsername: string, pagina: number): Observable<Paginacao> {
		const params = new HttpParams().set('pagina', pagina).set('quantidade', this.quantidadeDeSeguidoresPorBusca);
		return this.http
			.get<Paginacao>(`${urlApi}${this.apiUsuariosPath}/${usuarioUsername}/seguidores`, {params});
	}
	
}