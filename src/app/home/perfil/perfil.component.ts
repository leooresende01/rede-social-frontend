import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { Usuario } from 'src/model/usuario';
import { Publicacao } from './../../../model/publicacao';

@Component({
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
	public usuario: Usuario;
	public usernameUsuarioAutenticado: string;
	public publicacoes: Array<Publicacao>;
	
	private usuarioSubscription: Subscription;
	constructor(private activatedRoute: ActivatedRoute, 
		private userAuthenticateService: UserAuthenticateService) { } 

	ngOnInit(): void {
		this.usuarioSubscription = this.activatedRoute.data
			.subscribe(data => this.pegarEAtualizarInformacoesDaPublicacaoEUsuario(data));
		this.usernameUsuarioAutenticado = this.userAuthenticateService.pegarUsernameUsuarioAutenticado();
	}
	
	pegarEAtualizarInformacoesDaPublicacaoEUsuario(data: Data): void {
		const publicacoes = data['publicacoes'];
		if (publicacoes) this.publicacoes = publicacoes;

		const usuario = data['usuario'];
		if (usuario) this.usuario = usuario;
	}

	ngOnDestroy() {
		SeguidoresSeguindoUtil.desativarObservable(this.usuarioSubscription);
	}

}
