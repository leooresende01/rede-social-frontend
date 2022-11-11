import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'rs-spinnerloading',
	templateUrl: './spinner-loading.component.html',
	styleUrls: ['./spinner-loading.component.css']
})
export class SpinnerLoadingComponent implements OnInit {
	@Input()
	public elementoAguardado: any;
	
	constructor() { }

	ngOnInit(): void {
	}

}
