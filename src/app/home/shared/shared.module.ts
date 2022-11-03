import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CurtirDescurtirComponent } from './curtir-descurtir/curtir-descurtir.component';
import { SpinnerLoadingComponent } from "./spinner-loading/spinner-loading.component";

@NgModule({
	declarations: [SpinnerLoadingComponent, CurtirDescurtirComponent],
	exports: [SpinnerLoadingComponent, CurtirDescurtirComponent],
	imports: [CommonModule]
})
export class SharedModule {

}