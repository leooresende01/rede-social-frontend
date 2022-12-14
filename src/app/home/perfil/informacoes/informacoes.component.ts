import { Paginacao } from 'src/model/paginacao';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription, filter } from 'rxjs';
import { AtualizarSeguidoresSeguindoService } from 'src/core/observable/atualizar-seguidores-seguindo.service';
import { SeguidoresService } from 'src/core/service/seguidores.service';
import { SeguindoService } from 'src/core/service/seguindo.service';
import { UsuarioService } from 'src/core/service/usuario.service';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Usuario } from 'src/model/usuario';
import { urlApi } from 'src/core/util/url-api';

@Component({
	selector: 'rs-informacoes',
	templateUrl: './informacoes.component.html',
	styleUrls: ['./informacoes.component.css', './botoes-seguir/botoes-seguir.component.css']
})
export class InformacoesComponent implements OnInit, OnDestroy {
	public urlApi: string = urlApi;
	public seguidores$: Observable<Paginacao>;
	public seguindo$: Observable<Paginacao>;
	public atualizarInformacoesDoUsuarioSubscription: Subscription;
	private readonly startPage: number = 0;
	private atualizarUsuarioSubscription: Subscription;
	
	@Input()
	public usuario: Usuario;

	@Input()
	public usernameUsuarioAutenticado: string;

	constructor(private seguidoresService: SeguidoresService,
		private seguindoService: SeguindoService,
		private atualizarSeguidoresSeguindoService: AtualizarSeguidoresSeguindoService,
		private usuarioService: UsuarioService) { }

	ngOnInit(): void {
		this.atualizarInformacoesDoUsuarioSubscription = this.atualizarSeguidoresSeguindoService.getObservable()
			.pipe(filter(username => !!username))
			.subscribe(username => this.buscarEAtualizarInformacoesDoUsuario());
	}

	buscarEAtualizarInformacoesDoUsuario(): void {
		this.atualizarUsuarioSubscription = this.usuarioService.buscarUsuarioPeloUsername(this.usuario.username)
			.subscribe(usuario => this.usuario = usuario);
	}

	buscarSeguidores(usuarioUsername: string): void {
		this.seguidores$ = this.seguidoresService.buscarSeguidoresDoUsuario(usuarioUsername, this.startPage);
	}

	buscarPessoasQueOUsuarioSegue(usuarioUsername: string): void {
		this.seguindo$ = this.seguindoService.buscarPessoasQueOUsuarioSegue(usuarioUsername, this.startPage);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil
			.desativarObservable(this.atualizarInformacoesDoUsuarioSubscription, this.atualizarUsuarioSubscription);
	}
}
