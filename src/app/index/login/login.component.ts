import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/core/service/login.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { LoginForm } from './../../../core/dto/login-form';
import { UserAuthenticateService } from './../../../core/service/user-authenticate.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../shared/index.style.css']
})
export class LoginComponent implements OnInit {
	public form: FormGroup;
	private nextUrl: string;
	private queriesParamsSubscription: Subscription;
	public serverMessage: string;
	public submitedForm: boolean;

	constructor(private formBuilder: FormBuilder,
		private loginService: LoginService,
		private userAuthenticateService: UserAuthenticateService,
		private activateRoute: ActivatedRoute) { }

	ngOnInit(): void {
		window.localStorage.clear();
		this.nextUrl = this.activateRoute.snapshot
			.queryParams['nextUrl'];
		this.form = this.formBuilder.group({
			username: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9\.]+$/), Validators.required]],
			password: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.required]]
		});
	}

	autenticarUsuario() {
		this.submitedForm = true;
		this.serverMessage = '';
		const username = this.pegarValorDoInput('username');
		const password = this.pegarValorDoInput('password');
		const loginForm = new LoginForm(username, password);
		this.loginService.autenticarUsuario(loginForm)
			.subscribe(tokenDto => this.userAuthenticateService
				.autenticarEIrParaAHome(tokenDto, username, this.nextUrl),
				(err) => this.serverMessage = err.error.mensagem);
	}

	pegarValorDoInput(inputName: string): string {
		return this.form.get(inputName)?.value;
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.queriesParamsSubscription);
	}
}
