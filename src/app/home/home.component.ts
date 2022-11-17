import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { homeTransitionAnimations } from '../animations/home.animations';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [homeTransitionAnimations]
})
export class HomeComponent implements OnInit {

	constructor(private renderer: Renderer2,
		private contexts: ChildrenOutletContexts) { }

	ngOnInit(): void {
		const body = document.body;
		this.renderer.setStyle(body, 'background-color', 'rgba(233, 233, 233, 0.600)');
	}

	getRouteAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}
}
