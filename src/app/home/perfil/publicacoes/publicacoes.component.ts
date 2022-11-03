import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AtualizarComentariosService } from 'src/core/observable/atualizar-comentarios.service';
import { AtualizarNovaPublicacaoService } from 'src/core/observable/atualizar-nova-publicacao.service';
import { ComentarioService } from 'src/core/service/comentario.service';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { PublicacaoCurtidasUtil } from 'src/core/util/publicacao-comentario.util';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { urlApi } from 'src/core/util/url-api';
import { Alert } from 'src/model/alert';
import { Publicacao } from 'src/model/publicacao';
import { Usuario } from 'src/model/usuario';
import { AlertService } from './../../../../core/observable/alert.service';
import { PublicacaoService } from './../../../../core/service/publicacao.service';
import { AlertType } from './../../../../model/alert-type';

@Component({
	selector: 'rs-home-perfil-publicacoes',
	templateUrl: './publicacoes.component.html',
	styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit, OnDestroy {
	public urlApi: string = urlApi;
	public usuarioAuthenticadoUsername: string;
	private atualizacaoDePublicacaoSubscribe: Subscription;

	@Input()
	public publicacoes: Array<Publicacao>;

	@Input()
	public usuarioDonoDasPublicacoes: Usuario;

	constructor(private userAuthService: UserAuthenticateService,
		private atualizarNovaPublicacaoService: AtualizarNovaPublicacaoService,
		private publicacoesService: PublicacaoService,
		private alertService: AlertService,
		private atualizarComentariosService: AtualizarComentariosService,
		private comentarioService: ComentarioService) { }

	ngOnInit(): void {
		this.atualizacaoDePublicacaoSubscribe = this.atualizarNovaPublicacaoService.getObservable()
			.subscribe(username => {
				const oUsuarioQuePublicouEstaNoPerfilDele = this.usuarioAuthenticadoUsername === this.usuarioDonoDasPublicacoes.username;
				if (username && oUsuarioQuePublicouEstaNoPerfilDele) this.publicacoesService.buscarPublicacoesDoUsuario(this.usuarioAuthenticadoUsername)
					.subscribe(publicacoes => this.publicacoes = publicacoes);
			});
		this.usuarioAuthenticadoUsername = this.userAuthService.pegarUsernameUsuarioAutenticado();
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.atualizacaoDePublicacaoSubscribe);
	}

	buscarComentarios(event: Event, publicacao: Publicacao) {
		this.atualizarComentariosService.nextValue(null);
		this.comentarioService.buscarComentariosDeUmaPublicacao(publicacao.dono, publicacao.id)
			.subscribe(comentarios => {
				PublicacaoCurtidasUtil.atualizarEMostrarComentarios(comentarios, this.publicacoes);
				this.atualizarComentariosService
					.nextValue(new PublicacaoCurtidasUtil(publicacao, comentarios))
			});
	}

	deletarPublicacao(id: number, username: string): void {
		this.publicacoesService.deletarPublicacao(id, username)
			.subscribe(() => {
				const indexPublicacao = this.publicacoes.findIndex(publicacao => publicacao.id === id);
				this.publicacoes.splice(indexPublicacao, 1);
				this.alertService.nextValue(new Alert("Publicação deletada com sucesso", AlertType.SUCCESS))
			}, (err) => this.alertService
				.nextValue(new Alert(err.error.mensagem, AlertType.DANGER)));
	}
}
