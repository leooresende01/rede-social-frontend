import { NgModule } from "@angular/core";
import { InformacoesModule } from "./informacoes/informacoes.module";
import { PerfilComponent } from './perfil.component';
import { PublicacoesModule } from './publicacoes/publicacoes.module';

@NgModule({
	declarations: [PerfilComponent],
	imports: [PublicacoesModule, InformacoesModule],
	exports: [PerfilComponent]
})
export class PerfilModule {

}