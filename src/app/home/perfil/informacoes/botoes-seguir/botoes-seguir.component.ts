import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Alert } from 'src/model/alert';
import { Usuario } from 'src/model/usuario';
import { AlertService } from '../../../../../core/observable/alert.service';
import { AtualizarSeguidoresSeguindoService } from '../../../../../core/observable/atualizar-seguidores-seguindo.service';
import { SeguindoService } from '../../../../../core/service/seguindo.service';
import { SeguidoresSeguindoUtil } from '../../../../../core/util/seguidores-seguindo.util';
import { AlertType } from '../../../../../model/alert-type';

@Component({
	selector: 'rs-home-perfil-informacoes-botoesseguir',
	templateUrl: './botoes-seguir.component.html',
	styleUrls: ['./botoes-seguir.component.css']
})
export class BotoesSeguirComponent implements OnInit {
	@ViewChild('elementoLoanding')
	public elementoLoanding: ElementRef<HTMLDivElement>;

	@Input()
	public usernameUsuarioAutenticado: string;

	@Input()
	public usuario: Usuario;


	constructor(private seguindoService: SeguindoService,
		private alertService: AlertService,
		private renderer: Renderer2,
		private atualizarSeguidoresSeguindoService: AtualizarSeguidoresSeguindoService) { }

	ngOnInit(): void {
	}

	seguirUsuario(event: Event) {
		const botao = event.target as HTMLButtonElement;
		SeguidoresSeguindoUtil.trocarOBotaoParaLoading(botao, this.renderer, this.elementoLoanding);
		this.seguindoService.seguirUsuario(this.usuario.username)
			.subscribe(usuario => this.alterarInformacoesDoUsuarioSeguido(usuario), (err) => this.tratarErros(botao));
	}


	deixarDeSeguir(event: Event) {
		const botao = event.target as HTMLButtonElement;
		SeguidoresSeguindoUtil.trocarOBotaoParaLoading(botao, this.renderer, this.elementoLoanding);
		this.seguindoService.deixarDeSeguirUmUsuario(this.usuario.username)
			.subscribe(nada => this.alterarInformacoesUsuarioUnfollowed(), (err) => this.tratarErros(botao));
	}

	alterarInformacoesDoUsuarioSeguido(usuario: Usuario): void {
		SeguidoresSeguindoUtil.atualizarInformacoesDoUsuarioSeguido(this.usuario, usuario);
		this.removerBotaoLoading();
	}

	alterarInformacoesUsuarioUnfollowed(): void {
		SeguidoresSeguindoUtil.atualizarInformacoesDoUsuarioUnfollowed(this.usuario);
		this.removerBotaoLoading();
	}

	private removerBotaoLoading() {
		const loadingElemento = this.elementoLoanding.nativeElement;
		this.renderer.setStyle(loadingElemento, 'display', 'none');
		this.atualizarSeguidoresSeguindoService.proximoValor('true');
	}

	private tratarErros(botao: HTMLButtonElement): void {
		const loadingElemento = this.elementoLoanding.nativeElement;
		this.renderer.setStyle(botao, 'display', 'flex');
		this.renderer.setStyle(loadingElemento, 'display', 'none');
		this.alertService.nextValue(new Alert('Ocorreu um erro desconhecido', AlertType.DANGER));
	}
}

