import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'rs-index-signup-validators',
	templateUrl: './validators.component.html',
	styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
	@Input()
	public formGroup: FormGroup;
	
	@Input()
	public inputName: string;

	constructor() { }

	ngOnInit(): void {
	}

}
