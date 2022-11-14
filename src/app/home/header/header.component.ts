import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { debounceTime, filter, Observable, of, pluck, Subscription } from 'rxjs';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';
import { UsuarioService } from 'src/core/service/usuario.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { urlApi } from 'src/core/util/url-api';
import { Usuario } from 'src/model/usuario';
import { UsuarioUtil } from './../../../core/util/usuario.util';

@Component({
	selector: 'rs-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	public url: string;
	public queryUser: string;
	public elementActive: boolean;
	public usernameUsuarioAutenticado: string;
	public formGroup: FormGroup;
	public usuariosConsulta$: Observable<Array<Usuario>>;
	private urlSubscription: Subscription;
	public imagemUser: string;
	private readonly timeSleep: number = 500;
	consultaSubscription: Subscription;
	public urlApi: string = urlApi;

	constructor(private activateRoute: ActivatedRoute,
		private router: Router,
		private userAuthService: UserAuthenticateService,
		private formBuilder: FormBuilder,
		private usuarioService: UsuarioService) { }


	ngOnInit(): void {
		this.definirFormulario();
		this.url = this.router.url;
		this.observarConsultaDoUsuario();
		this.observarNavegacoesDeRota()
		this.usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();
	}

	observarConsultaDoUsuario() {
		this.consultaSubscription = this.formGroup.valueChanges
			.pipe(debounceTime(this.timeSleep))
			.pipe(pluck('query'))
			.pipe(filter((username: string) => {
				if (username?.length && !/^\s$/.test(username)) return true;
				this.usuariosConsulta$ = of([]);
				return false;
			}))
			.subscribe((username) => this.usuariosConsulta$ = this.usuarioService.buscarUsuarioPorRegex(username));
	}

	observarNavegacoesDeRota() {
		this.urlSubscription = this.router.events
			.pipe(filter(e => e instanceof RouterEvent && 
					(e instanceof NavigationEnd || e instanceof NavigationStart)))
			.subscribe(e => {
				if (e instanceof NavigationEnd) {
					this.url = this.router.url;
				}

				if (e instanceof NavigationStart && this.router.url === '/home/editarInformacoes') {
					this.atualizarImagemDoUsuarioNoHeader();
				}
			});
	}

	
	private definirFormulario() {
		this.formGroup = this.formBuilder.group({
			query: ['', Validators.required]
		});
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.consultaSubscription, this.urlSubscription);
	}

	ocultarMenuQuery() {
		setTimeout(() => this.elementActive = false, 200);
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
	
	private atualizarImagemDoUsuarioNoHeader() {
		const usernameUsuarioAutenticado = this.userAuthService.pegarUsernameUsuarioAutenticado();
		this.usernameUsuarioAutenticado = '';
		setTimeout(() => this.usernameUsuarioAutenticado = usernameUsuarioAutenticado, 200);
	}
}
