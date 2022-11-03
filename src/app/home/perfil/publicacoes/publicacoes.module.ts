import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PipeModule } from "src/core/pipe/pipe.mudule";
import { SharedModule } from "../../shared/shared.module";
import { MostrarPessoasQueCurtiramComponent } from "./mostrar-pessoas-que-curtiram/mostrar-pessoas-que-curtiram.component";
import { PessoasQueCurtiramComponent } from "./pessoas-que-curtiram/pessoas-que-curtiram.component";
import { PublicacoesComponent } from "./publicacoes.component";
import { CommentsComponent } from './comments/comments.component';

@NgModule({
	declarations: [PublicacoesComponent, PessoasQueCurtiramComponent, MostrarPessoasQueCurtiramComponent, CommentsComponent],
	imports: [RouterModule, CommonModule, ReactiveFormsModule, PipeModule, SharedModule],
	exports: [PublicacoesComponent, PessoasQueCurtiramComponent, CommentsComponent]
})
export class PublicacoesModule {

}