import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delayWhen, Observable, retryWhen, Subject, tap, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';
import { MensagemForm } from '../dto/mensagem.form';
import { urlApi, wsUrl } from '../util/url-api';
import { MensagemDto } from './../dto/mensagem.dto';
import { AlertService } from './../observable/alert.service';

@Injectable({ providedIn: 'root' })
export class MensagemService {
	private readonly wsUrl: string = wsUrl;
	private conexaoWS: WebSocketSubject<MensagemDto | MensagemForm>;
	private pathApi: string = "/api/v1/chats";
	private deconnect: Subject<any> = new Subject<any>();

	constructor(private userAuthService: UserAuthenticateService,
		private http: HttpClient,
		private alert: AlertService) {
		this.configurarConexaoWS();
	}

	configurarConexaoWS() {
		const token = this.userAuthService.pegarLoginDto()?.token;
		this.conexaoWS = webSocket(`${this.wsUrl}/${token}`);
	}

	escutarMensagensDoServidor(): Observable<MensagemDto> {
		this.reiniciarConexao();
		const mensagemObservable = this.conexaoWS.asObservable() as Observable<MensagemDto>;
		return mensagemObservable
			.pipe(retryWhen(errors =>
				errors.pipe(tap(e => {
					this.alert
						.nextValue(new Alert('Conexão perdida, reconectando...', AlertType.DANGER));
					this.deconnect.next(e);
				}),
					delayWhen(val => timer(3000)))
			));
	}

	desconnectEvent(): Observable<any> {
		return this.deconnect.asObservable();
	}

	buscarMensagensComOUsuario(username: string): Observable<Array<MensagemDto>> {
		return this.http.get<Array<MensagemDto>>(`${urlApi}${this.pathApi}/${username}/mensagens`);
	}

	enviarMensagem(mensagem: string, outroUsuarioDoChat: string): MensagemDto {
		const token = this.userAuthService.pegarLoginDto()?.token as string;
		const usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();
		const mensagemForm = new MensagemForm(mensagem, outroUsuarioDoChat, token);
		this.conexaoWS.next(mensagemForm);
		return MensagemDto.mapearFormParaDto(mensagemForm, usernameUsuarioAutenticado);
	}

	fecharConexaoWebSocket(): void {
		this.conexaoWS.complete();
	}

	reiniciarConexao() {
		this.fecharConexaoWebSocket();
		this.conexaoWS.unsubscribe();
		this.configurarConexaoWS();
	}
}