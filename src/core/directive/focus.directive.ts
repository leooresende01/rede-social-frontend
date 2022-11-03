import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
	selector: '[focus]'
})
export class FocusDirective implements OnInit {

	constructor(private elementRef: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}
	
	ngOnInit(): void {
		this.elementRef.nativeElement.focus();
	}


}