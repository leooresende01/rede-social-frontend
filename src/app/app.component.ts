import { PlatformLocation } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BarraDeProgressoService } from 'src/core/observable/barra-de-progresso.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { AlertService } from '../core/observable/alert.service';
import { Alert } from './../model/alert';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	public alerts: Array<Alert> = new Array<Alert>();
	private alertSubscription: Subscription;
	public mostrarProgresso: boolean;
	routerEventSubscription: Subscription;
	ocutarBarraDeProgressoSubscription: Subscription;

	constructor(private alertService: AlertService,
		private router: Router,
		private barraDeProgressoService: BarraDeProgressoService,
		private renderer: Renderer2,
		private location: PlatformLocation) { }

	ngOnInit(): void {
		this.alertSubscription = this.alertService.getObservable()
			.subscribe(alert => this.mostrarMensagemDeAlerta(alert));

		this.ocutarBarraDeProgressoSubscription = this.barraDeProgressoService.getObservable()
			.subscribe(valor => this.mostrarProgresso = valor);

		this.routerEventSubscription = this.router.events
			.subscribe(event => this.mostrarBarraDeProgressoAoNavegarEOcutarModal(event));

		this.location.onPopState((event) => this.ocutarModal());
	}

	mostrarBarraDeProgressoAoNavegarEOcutarModal(event: any): void {
		if (event instanceof NavigationStart) {
			this.mostrarProgresso = true;
			this.verificarEOcutarModal(event);
		}

		if (event instanceof NavigationEnd) {
			this.mostrarProgresso = false;
		}
	}
	verificarEOcutarModal(event: any) {
		try {
			const proximaUrlDaNavegacao = event.url.split('?')[0];
			if (proximaUrlDaNavegacao === '/') {
				this.ocutarModal();
			}
		} catch (e) { }
	}
	ocutarModal() {
		const elementoModalBackground = this.renderer.selectRootElement('.modal-backdrop');
		this.renderer.removeClass(elementoModalBackground, 'modal-backdrop');

		const elementoBody = document.body;
		this.renderer.setStyle(elementoBody, 'overflow', 'auto');
	}

	mostrarMensagemDeAlerta(alert: Alert): void {
		this.alerts.splice(0, 1);
		const index = this.alerts.push(alert);
		setTimeout(() => this.alerts.splice(index - 1, 1), 3500);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.alertSubscription,
			this.routerEventSubscription,
			this.ocutarBarraDeProgressoSubscription);
	}
}
