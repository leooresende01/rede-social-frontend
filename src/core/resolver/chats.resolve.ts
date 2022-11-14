import { ChatUtil } from './../util/chat.util';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { ChatDto } from './../dto/chat.dto';
import { ChatService } from './../service/chat.service';

@Injectable({providedIn: 'root'})
export class ChatsResolve implements Resolve<Array<ChatDto>> {

	constructor(private chatService: ChatService, private userAuthService: UserAuthenticateService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ChatDto[] | Observable<ChatDto[]> | Promise<ChatDto[]> {
		return this.chatService.buscarChatsDoUsuarioAutenticado()
			.pipe(tap(chats => chats.forEach(chat => ChatUtil.definirComQuemOUsuarioEstaConversando(chat, this.userAuthService.pegarUsernameUsuarioAutenticado()))));
	}
}