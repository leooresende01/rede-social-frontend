import { urlApi } from 'src/core/util/url-api';
import { ChatDto } from './../dto/chat.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService {
	private readonly chatPath: string = '/api/v1/chats';

	constructor(private http: HttpClient) {}

	buscarChatsDoUsuarioAutenticado(): Observable<Array<ChatDto>> {
		return this.http
			.get<Array<ChatDto>>(`${urlApi}${this.chatPath}`);
	} 

	buscarChatDoUsuarioAutenticadoPeloId(idDoChat: number): Observable<ChatDto> {
		return this.http
			.get<ChatDto>(`${urlApi}${this.chatPath}/${idDoChat}`);
	} 
}