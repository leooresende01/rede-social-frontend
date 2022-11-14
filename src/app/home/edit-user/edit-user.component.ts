import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AtualizarUsuarioDto } from 'src/core/dto/atualizar-usuario.dto';
import { LoginService } from 'src/core/service/login.service';
import { UsuarioService } from 'src/core/service/usuario.service';
import { FormularioUtil } from 'src/core/util/formulario.util';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { urlApi } from 'src/core/util/url-api';
import { UsuarioUtil } from 'src/core/util/usuario.util';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';
import { AlertService } from './../../../core/observable/alert.service';
import { Usuario } from './../../../model/usuario';

@Component({
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
	public usuario: Usuario;
	private usuarioSubscription: Subscription
	public formGroup: FormGroup;
	public urlApi: string = urlApi;
	public mensagemErro: string;

	@ViewChild('fotoInput')
	public elementoInput: ElementRef<HTMLInputElement>;

	@ViewChild('imagemElement')
	public imagemElementRef: ElementRef<HTMLImageElement>;

	constructor(private activateRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private usuarioService: UsuarioService,
		private alertService: AlertService,
		private router: Router,
		private loginService: LoginService,
		private userAuthService: UserAuthenticateService) { }

	ngOnInit(): void {
		this.usuarioSubscription = this.activateRoute.data
			.subscribe(data => this.usuario = data['usuario']);
		this.formGroup = this.formBuilder.group({
			nome: [this.usuario.nomeCompleto, [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\ ]+$/)]],
			username: [this.usuario.username, [Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9\.]+$/), Validators.required]]
		});
	}

	editarUsuario(): void {
		const listaDeFiles = this.elementoInput.nativeElement.files as FileList;
		const nomeCompleto = this.pegarValorDoInput('nome');
		const username = this.pegarValorDoInput('username');
		const imagemDoPerfil = listaDeFiles[0];
		const atualizarUsuarioDto = new AtualizarUsuarioDto(username, nomeCompleto, imagemDoPerfil);
		this.usuarioService.autalizarInformacoesUsuario(atualizarUsuarioDto)
			.subscribe(usuarioAtualizado => this.atualizarInformacoesUsuario(usuarioAtualizado)
				, (err) => this.mensagemErro = err.error.mensagem);
	}

	atualizarInformacoesUsuario(usuarioAtualizado: Usuario): void {
		this.loginService.atualizarToken()
			.subscribe(loginDto => {
				this.alertService.nextValue(new Alert('Usuario atualizado com sucesso', AlertType.SUCCESS));
				this.userAuthService.salvarLoginDto(loginDto);
				this.router.navigate(['/home', usuarioAtualizado.username], { replaceUrl: true });
			});
	}

	pegarValorDoInput(inputName: string): string {
		return this.formGroup.get(inputName)?.value;
	}

	carregarImagemProUsuario(event: Event) {
		FormularioUtil.mostrarImagem(event, this.elementoInput, this.imagemElementRef);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.usuarioSubscription);
	}
}
