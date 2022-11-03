import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoCurtidasUtil } from 'src/core/util/publicacao-comentario.util';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Publicacao } from 'src/model/publicacao';
import { AtualizarComentariosService } from '../../../../core/observable/atualizar-comentarios.service';
import { ComentarioService } from './../../../../core/service/comentario.service';

@Component({
	selector: 'rs-home-timeline-card-fotos',
	templateUrl: './card-fotos.component.html',
	styleUrls: ['../../perfil/publicacoes/publicacoes.component.css', './card-fotos.component.css']
})
export class CardFotosComponent implements OnInit {
	@Input()
	public publicacoes: Array<Publicacao>;
	public urlApi: string = urlApi;

	constructor(private atualizarComentariosService: AtualizarComentariosService,
		private comentarioService: ComentarioService) { }

	ngOnInit(): void {
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	buscarComentarios(event: Event, publicacao: Publicacao) {
		this.atualizarComentariosService.nextValue(null);
		this.comentarioService.buscarComentariosDeUmaPublicacao(publicacao.dono, publicacao.id)
			.subscribe(comentarios => {
				PublicacaoCurtidasUtil.atualizarEMostrarComentarios(comentarios, this.publicacoes);
				this.atualizarComentariosService.nextValue(new PublicacaoCurtidasUtil(publicacao, comentarios));
			});
	}
}
