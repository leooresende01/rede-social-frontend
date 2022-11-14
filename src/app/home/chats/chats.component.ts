import { ChatUtil } from './../../../core/util/chat.util';
import { ChatService } from './../../../core/service/chat.service';
import { MensagemService } from './../../../core/service/mensagem.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { ChatDto } from './../../../core/dto/chat.dto';
import { SeguidoresSeguindoUtil } from './../../../core/util/seguidores-seguindo.util';
import { MensagemDto } from 'src/core/dto/mensagem.dto';

@Component({
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
	public chats: Array<ChatDto> = new Array<ChatDto>;
	public urlApi: string = urlApi;
	public usuarioAuthenticadoUsername: string;
	private chatSubscription: Subscription;
	private mensagemSubscription: Subscription;

	constructor(private activatedRoute: ActivatedRoute,
		private userAuthService: UserAuthenticateService,
		private mensagemService: MensagemService,
		private chatService: ChatService) { }

	ngOnInit(): void {
		this.usuarioAuthenticadoUsername = this.userAuthService.pegarUsernameUsuarioAutenticado();
		this.chatSubscription = this.activatedRoute.data
			.subscribe((data) => this.chats = data['chats']);
		this.mensagemSubscription = this.mensagemService.escutarMensagensDoServidor()
			.subscribe(mensagem => this.adicionarMensagemAoChat(mensagem));
	}

	private adicionarMensagemAoChat(mensagem: MensagemDto): void {
		const chatDaMensagemRecebidaIndex: number = this.chats.findIndex(chat => chat.id === mensagem.chatId);
		if (chatDaMensagemRecebidaIndex !== -1) {
			const chatMensagemRecebida: ChatDto = this.chats[chatDaMensagemRecebidaIndex];
			chatMensagemRecebida.ultimaMensagem = mensagem;
			this.chats[chatDaMensagemRecebidaIndex] = chatMensagemRecebida;
			mensagem.foiVista = false;
			this.ordenarChatsPorMensagensMaisRecentes();
			return;
		}
		this.chatService.buscarChatDoUsuarioAutenticadoPeloId(mensagem.chatId)
			.subscribe(chat => {
				ChatUtil.definirComQuemOUsuarioEstaConversando(chat, this.usuarioAuthenticadoUsername);
				chat.ultimaMensagem.foiVista = false;
				this.chats.push(chat);
				this.ordenarChatsPorMensagensMaisRecentes();
			});
	}

	private ordenarChatsPorMensagensMaisRecentes() {
		this.chats.sort((chat1, chat2) =>
			chat2.ultimaMensagem.dataSemFormatar > chat1.ultimaMensagem.dataSemFormatar ? 1 : -1);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.chatSubscription, this.mensagemSubscription);
	}
}
