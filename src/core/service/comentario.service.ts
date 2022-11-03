import { urlApi } from './../util/url-api';
import { Comentario } from './../../model/comentario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ComentarioDto } from '../dto/comentario.dto';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
	private pathUserApi: string = '/api/v1/usuarios';

	constructor(private http: HttpClient) { }

	buscarComentariosDeUmaPublicacao(dono: string, idDaPublicacao: number): Observable<Array<Comentario>> {
		return this.http
			.get<Array<Comentario>>(`${urlApi}${this.pathUserApi}/${dono}/publicacoes/${idDaPublicacao}/comentarios`);
	}

	enviarComentario(comentarioDto: ComentarioDto, dono: string, idDaPublicacao: number): Observable<Comentario> {
		return this.http
			.post<Comentario>(`${urlApi}${this.pathUserApi}/${dono}/publicacoes/${idDaPublicacao}/comentarios`, comentarioDto);
	}

	deletarComentario(usernameDonoDaPublicacao: string, idDaPublicacao: number, idDoComentario: number): Observable<void> {
		return this.http
			.delete<void>(`${urlApi}${this.pathUserApi}/${usernameDonoDaPublicacao}/publicacoes/${idDaPublicacao}/comentarios/${idDoComentario}`);
	}
}