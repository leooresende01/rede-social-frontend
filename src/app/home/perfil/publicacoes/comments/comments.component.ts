import { Comentario } from './../../../../../model/comentario';
import { ComentarioService } from './../../../../../core/service/comentario.service';
import { ComentarioDto } from './../../../../../core/dto/comentario.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AtualizarComentariosService } from 'src/core/observable/atualizar-comentarios.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { urlApi } from './../../../../../core/util/url-api';
import { Publicacao } from 'src/model/publicacao';

@Component({
	selector: 'rs-home-perfil-publicacoes-comments',
	templateUrl: './comments.component.html',
	styleUrls: [
		'../../informacoes/seguidores/seguidores.component.css',
		'../mostrar-pessoas-que-curtiram/mostrar-pessoas-que-curtiram.component.css',
		'./comments.component.css'
	]
})
export class CommentsComponent implements OnInit, OnDestroy {
	public comentarios: Array<Comentario> | null | undefined;
	public urlApi: string = urlApi;
	public usuarioAuthenticadoUsername: string;
	public publicacao: Publicacao;

	private comentariosSubscription: Subscription;
	public formGroup: FormGroup;
	@ViewChild('btnClose')
	public btnClose: ElementRef<HTMLButtonElement>;
	@ViewChild('elementoLoanding')
	public elementoLoanding: ElementRef<HTMLDivElement>;
	@ViewChild('botaoSubmit')
	public botaoSubmit: ElementRef<HTMLButtonElement>;

	constructor(private router: Router,
		private atualizarComentariosService: AtualizarComentariosService,
		private userAuthService: UserAuthenticateService,
		private formBuilder: FormBuilder,
		private comentarioService: ComentarioService,
		private renderer: Renderer2) { }

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			comentario: ['', Validators.required]
		});
		this.usuarioAuthenticadoUsername = this.userAuthService.pegarUsernameUsuarioAutenticado();
		this.comentariosSubscription = this.atualizarComentariosService.getObservable()
			.subscribe(publicacaoComentarioUtil => {
				this.comentarios = publicacaoComentarioUtil?.comentarios;
				this.publicacao = publicacaoComentarioUtil?.publicacao as Publicacao;
			});
	}

	irParaOPerfilDoUsuario(username: string) {
		this.btnClose.nativeElement.click();
		this.router.navigate(['/home', username]);
	}

	deletarComentario(usernameDonoDaPublicacao: string, idDaPublicacao: number, idDoComentario: number): void {
		this.comentarioService.deletarComentario(usernameDonoDaPublicacao, idDaPublicacao, idDoComentario)
			.subscribe(() => {
				const comentarioIndex = this.comentarios?.findIndex(comentario => comentario.id === idDoComentario) as number;
				this.comentarios?.splice(comentarioIndex, 1);
				this.publicacao.comentarios = this.comentarios?.length as number;
			});
	}

	enviarComentario(event: Event) {
		SeguidoresSeguindoUtil
			.trocarOBotaoParaLoading(this.botaoSubmit.nativeElement, this.renderer, this.elementoLoanding);
		const comentario = this.formGroup.get('comentario')?.value;
		const comentarioDto = new ComentarioDto(comentario);
		const dono = this.publicacao?.dono as string;
		const idDaPublicacao = this.publicacao?.id as number;
		this.comentarioService.enviarComentario(comentarioDto, dono, idDaPublicacao)
			.subscribe(comentario => this.atualizarComentarioAdicionado(comentario));
	}

	atualizarComentarioAdicionado(comentario: Comentario): void {
		this.comentarios?.push(comentario);
		this.formGroup.reset();
		this.publicacao.comentarios = this.comentarios?.length as number;
		SeguidoresSeguindoUtil
			.voltarOBotaoParaONormal(this.botaoSubmit.nativeElement, this.renderer, this.elementoLoanding);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.comentariosSubscription);
	}
}
