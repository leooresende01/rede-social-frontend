import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { indexTransitionAnimations } from '../animations/index.animations';

@Component({
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css'],
	animations: [indexTransitionAnimations]
})
export class IndexComponent implements OnInit {

	constructor(private rederer: Renderer2,
		private contexts: ChildrenOutletContexts) { }

	ngOnInit(): void {
		const body = document.body;
		this.rederer.setStyle(body, 'background-color', '#e9e9e957');
	}

	getRouteAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}

}
