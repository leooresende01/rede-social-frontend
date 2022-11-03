import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private renderer: Renderer2) { }

	ngOnInit(): void {
		const body = document.body;
		this.renderer.setStyle(body, 'background-color', 'rgba(233, 233, 233, 0.600)');
	}

}
