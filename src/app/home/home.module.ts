import { DiretivaModule } from 'src/core/directive/diretiva.module';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ChatModule } from "./chats/chat.module";
import { EditUserModule } from "./edit-user/edit-user.module";
import { HeaderModule } from './header/header.module';
import { HomeComponent } from "./home.component";
import { InformacoesModule } from './perfil/informacoes/informacoes.module';
import { PerfilModule } from './perfil/perfil.module';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './timeline/timeline.module';

@NgModule({
	declarations: [HomeComponent],
	exports: [HomeComponent],
	imports: [RouterModule, DiretivaModule, ChatModule, PerfilModule, InformacoesModule, TimelineModule, HeaderModule, SharedModule, EditUserModule]
}) 
export class HomeModule {

}