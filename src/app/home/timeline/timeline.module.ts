import { PublicacoesModule } from './../perfil/publicacoes/publicacoes.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PipeModule } from "src/core/pipe/pipe.mudule";
import { CardFotosComponent } from "./card-fotos/card-fotos.component";
import { TimelineComponent } from "./timeline.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [TimelineComponent, CardFotosComponent],
	exports: [TimelineComponent],
	imports: [RouterModule, CommonModule, ReactiveFormsModule, PipeModule, PublicacoesModule, SharedModule]
})
export class TimelineModule {

}