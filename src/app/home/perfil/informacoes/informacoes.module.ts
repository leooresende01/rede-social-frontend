import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from 'src/core/pipe/pipe.mudule';
import { SharedModule } from '../../shared/shared.module';
import { BotoesSeguirComponent } from './botoes-seguir/botoes-seguir.component';
import { InformacoesComponent } from './informacoes.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';
import { SeguindoComponent } from './seguindo/seguindo.component';
import { MostrarSeguidoresSeguindoComponent } from './mostrar-seguidores-seguindo/mostrar-seguidores-seguindo.component';

@NgModule({
	declarations: [InformacoesComponent, SeguindoComponent, SeguidoresComponent, BotoesSeguirComponent, MostrarSeguidoresSeguindoComponent],
	imports: [RouterModule, CommonModule, ReactiveFormsModule, PipeModule, SharedModule],
	exports: [InformacoesComponent]
})
export class InformacoesModule {

}