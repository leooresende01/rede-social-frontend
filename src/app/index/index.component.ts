import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	constructor(private rederer: Renderer2) { }

	ngOnInit(): void {
		const body = document.body;
		this.rederer.setStyle(body, 'background-color', '#e9e9e957');
	}

}
