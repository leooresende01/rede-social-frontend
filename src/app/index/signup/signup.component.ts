import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/core/service/usuario.service';
import { Alert } from 'src/model/alert';
import { AlertService } from '../../../core/observable/alert.service';
import { RegistroForm } from './../../../core/dto/registro.dto';
import { AlertType } from './../../../model/alert-type';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css', '../shared/index.style.css']
})
export class SignupComponent implements OnInit, OnDestroy {
	public formGroup: FormGroup;
	public serverMessage: string;
	public progressoSubmit: number;
	public submitedForm: boolean;
	public isSubmit: boolean;

	@ViewChild('inputFile')
	public elemento: ElementRef<HTMLInputElement>;

	constructor(private formBuilder: FormBuilder,
		private usuarioService: UsuarioService,
		private router: Router,
		private alertService: AlertService) { }
		
		ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			nome: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\ ]+$/)]],
			username: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9\.]+$/), Validators.required]],
			password: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.required]]
		})
	}

	registrarUsuario(): void {
		this.serverMessage = '';
		if (this.isSubmit) {
			return;
		}
		this.isSubmit = true;
		const nomeCompleto = this.pegarValorDoInput('nome');
		const username = this.pegarValorDoInput('username');
		const password = this.pegarValorDoInput('password');
		const listaDeFiles = this.elemento.nativeElement.files as FileList;
		const imagemDoPerfil = listaDeFiles[0];

		const registroForm = new RegistroForm(nomeCompleto, username, password, imagemDoPerfil);
		this.usuarioService.registrarUsuario(registroForm)
		.subscribe(event => this.atualizarProgressoEIrParaATelaDeLogin(event), (err) => {
			this.serverMessage = err.error.mensagem;
			this.isSubmit = false;
		});
	}

	atualizarProgressoEIrParaATelaDeLogin(event: any): void {
		console.log('Progresso');
		if (event.type === HttpEventType.Response) {
			this.alertService.nextValue(new Alert('Usuario cadastrado com sucesso', AlertType.SUCCESS));
			this.router.navigate(['/']);
		}
		if (event.type === HttpEventType.UploadProgress) {
			this.progressoSubmit = Math.round(100 * event.loaded / event.total);
		}
	}

	pegarValorDoInput(inputName: string): string {
		return this.formGroup.get(inputName)?.value;
	}

	ngOnDestroy(): void {
		setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 1);
	}
}
