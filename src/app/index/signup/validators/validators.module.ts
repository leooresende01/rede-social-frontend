import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ValidatorsComponent } from './validators.component';

@NgModule({
	declarations: [ValidatorsComponent],
	exports: [ValidatorsComponent],
	imports: [CommonModule]
})
export class ValidatorsModule {

}