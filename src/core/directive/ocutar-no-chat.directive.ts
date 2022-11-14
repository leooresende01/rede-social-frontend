import { SeguidoresSeguindoUtil } from './../util/seguidores-seguindo.util';
import { Router, NavigationEnd } from '@angular/router';
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { filter, tap, Subscription } from 'rxjs';

@Directive({
	selector: '[ocutarNoChat]'
})
export class OcutarNoChatDirective implements OnInit, OnDestroy {
	private ocutarChatSubscription: Subscription;
	
	constructor(private router: Router,
		private element: ElementRef<HTMLElement>,
		private renderer: Renderer2) {}
		
		ngOnInit(): void {
		if (this.verificaSeEstaNoChat(this.router.url)) {
			this.renderer.addClass(this.element.nativeElement, 'ocutar');
		} 

		this.ocutarChatSubscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: any) => {
				const urlAtual = event.url;
				if (this.verificaSeEstaNoChat(urlAtual)) {
					this.renderer.addClass(this.element.nativeElement, 'ocutar');
					return;
				} this.renderer.removeClass(this.element.nativeElement, 'ocutar');
			});	
		}

	verificaSeEstaNoChat(urlAtual: string): Boolean {
		return new RegExp('/home/chats/(.*)').test(urlAtual);
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.ocutarChatSubscription);
	}
}