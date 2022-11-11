import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PipeModule } from "src/core/pipe/pipe.mudule";
import { SharedModule } from '../shared/shared.module';
import { PublicacoesModule } from './../perfil/publicacoes/publicacoes.module';
import { CardFotosComponent } from "./card-fotos/card-fotos.component";
import { TimelineComponent } from "./timeline.component";
import { MostrarUsuariosAleatoriosComponent } from './mostrar-usuarios-aleatorios/mostrar-usuarios-aleatorios.component';
import { InformacoesModule } from "../perfil/informacoes/informacoes.module";

@NgModule({
	declarations: [TimelineComponent, CardFotosComponent, MostrarUsuariosAleatoriosComponent],
	exports: [TimelineComponent],
	imports: [RouterModule, CommonModule, ReactiveFormsModule, PipeModule, PublicacoesModule, SharedModule, InformacoesModule]
})
export class TimelineModule {

}