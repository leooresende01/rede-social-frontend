import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, delay, retryWhen, Subscription, tap, throwError, delayWhen, timer } from 'rxjs';
import { MensagemDto } from 'src/core/dto/mensagem.dto';
import { MensagemService } from 'src/core/service/mensagem.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { SeguidoresSeguindoUtil } from './../../../../core/util/seguidores-seguindo.util';

@Component({
	templateUrl: './chat-mensagem.component.html',
	styleUrls: ['./chat-mensagem.component.css']
})
export class ChatMensagemComponent implements OnInit, OnDestroy {
	public usuarioAuthenticadoUsername: string;
	public urlApi: string = urlApi;
	public mensagens: Array<MensagemDto> | undefined;
	public formGroup: FormGroup;
	public outroUsuarioDoChat: string;

	private mensagensChatSubscription: Subscription;
	private mensagemSubscription: Subscription;
	private paramsUrlSubscription: Subscription;
	private desconnectionSubscription: Subscription;
	private reconexaoSubscription: Subscription;

	@ViewChild('chatArea')
	public chatMensagensArea: ElementRef<HTMLDivElement>;

	constructor(private activateRouter: ActivatedRoute,
		private userAuthService: UserAuthenticateService,
		private mensagemService: MensagemService,
		private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.usuarioAuthenticadoUsername = this.userAuthService.pegarUsernameUsuarioAutenticado();
		this.pegarParametroDaUrlEBuscarMensagensDoChat();
		this.formGroup = this.formBuilder.group({
			mensagem: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern(/[^\s]/)]]
		});
		this.mensagemSubscription = this.mensagemService.escutarMensagensDoServidor()
			.subscribe(mensagem => this.mensagens?.push(mensagem) && this.scrollToBottom(), (e) => alert(e));
		this.desconnectionSubscription = this.mensagemService.desconnectEvent()
			.subscribe(e => this.esperarAReconexaoEBuscarNovasMensagens());
	}

	esperarAReconexaoEBuscarNovasMensagens(): void {
		if (this.mensagens) {
			this.mensagens = undefined
		}

		if (!this.mensagens) {
			this.reconexaoSubscription = this.mensagemService.buscarMensagensComOUsuario(this.outroUsuarioDoChat)
				.pipe(retryWhen(delayWhen(val => timer(5000))))
				.subscribe(mensagens => {
					this.mensagens = mensagens;
					this.scrollToBottom();
				})
			return;
		}
	}

	pegarParametroDaUrlEBuscarMensagensDoChat() {
		this.paramsUrlSubscription = this.activateRouter.params
			.subscribe((params => {
				this.outroUsuarioDoChat = params['username'];
				this.buscarMensagensDoChat(this.outroUsuarioDoChat);
			}));
	}

	buscarMensagensDoChat(username: string): void {
		this.mensagensChatSubscription = this.mensagemService.buscarMensagensComOUsuario(username)
			.subscribe(mensagens => {
				this.mensagens = mensagens;
				this.scrollToBottom();
			}, (err) => this.mensagens = new Array<MensagemDto>());
	}

	enviarMensagem(): void {
		const mensagem = this.formGroup.get('mensagem')?.value;
		const mensagemDto = this.mensagemService.enviarMensagem(mensagem, this.outroUsuarioDoChat);
		this.mensagens?.push(mensagemDto);
		this.mensagens = this.mensagens;
		this.formGroup.reset();
		this.scrollToBottom();
	}

	scrollToBottom(): void {
		try {
			setTimeout(() => this.chatMensagensArea.nativeElement.scrollTop = this.chatMensagensArea.nativeElement.scrollHeight, 200);
		} catch (err) { }
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.mensagensChatSubscription,
			this.mensagemSubscription,
			this.paramsUrlSubscription,
			this.desconnectionSubscription,
			this.reconexaoSubscription);
	}
}
