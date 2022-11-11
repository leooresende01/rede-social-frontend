import { UserAuthenticateService } from '../../../../core/service/user-authenticate.service';
import { AlertService } from '../../../../core/observable/alert.service';
import { CurtidaService } from '../../../../core/service/curtida.service';
import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoUtil } from 'src/core/util/publicacao.util';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';
import { Publicacao } from 'src/model/publicacao';

@Component({
	selector: 'rs-curtir-descurtir',
	templateUrl: './curtir-descurtir.component.html',
	styleUrls: ['./curtir-descurtir.component.css']
})
export class CurtirDescurtirComponent implements OnInit {
	@Input()
	public publicacoes: Array<Publicacao>;
	@Input()
	public publicacao: Publicacao;
	
	private usuarioAuthenticadoUsername: string

	constructor(private curtidaService: CurtidaService,
		private alertService: AlertService,
		private userAuthSerivice: UserAuthenticateService) { }

	ngOnInit(): void {
		this.usuarioAuthenticadoUsername = this.userAuthSerivice.pegarUsernameUsuarioAutenticado();
	}

	curtirPublicacao(event: Event, id: number, username: string): void {
		this.desabilitarCurtida(event);
		this.curtidaService.curtirUmaPublicacao(id, username)
			.subscribe(publicacao => {
				PublicacaoUtil.atualizarInformacoesDaPublicacaoCurtida(publicacao, this.publicacoes);
				this.habilitarCurtida(event);
			}, (err) => {
				this.alertService.nextValue(new Alert(err.mensagem, AlertType.DANGER));
				this.habilitarCurtida(event);
			});
	}

	descurtirPublicacao(event: Event, id: number, username: string): void {
		this.desabilitarCurtida(event);
		this.curtidaService.descurtirPublicacao(id, username)
			.subscribe(() => {
				PublicacaoUtil.atualizarInformacoesDaPublicacaoDescurtida(this.publicacoes, id, this.usuarioAuthenticadoUsername);
			}, (err) => {
				this.alertService.nextValue(new Alert(err.mensagem, AlertType.DANGER));
				this.habilitarCurtida(event);
			});
	}

	desabilitarCurtida(event: Event) {
		const imagemElemento = event.target as HTMLImageElement;
		imagemElemento.classList.add('remover-eventos')
	}

	habilitarCurtida(event: Event) {
		const imagemElemento = event.target as HTMLImageElement;
		imagemElemento.classList.remove('remover-eventos')
	}
}
