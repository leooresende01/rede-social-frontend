import { ChatMensagemComponent } from './home/chats/chat-mensagem/chat-mensagem.component';
import { ChatsResolve } from './../core/resolver/chats.resolve';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesUsuarioAutenticadoResolve } from 'src/core/resolver/informacoes-usuario-autenticado.resolve';
import { UsuarioAutenticadoGuard } from 'src/core/router-guard/usuario-autenticado.guard';
import { PublicacaoResolve } from './../core/resolver/publicacao.resolve';
import { PublicacoesTimelineResolve } from './../core/resolver/publicacoes-timeline.resolve';
import { UsuarioPerfilResolve } from './../core/resolver/usuario-perfil.resolve';
import { ChatsComponent } from './home/chats/chats.component';
import { EditUserComponent } from './home/edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './home/perfil/perfil.component';
import { TimelineComponent } from './home/timeline/timeline.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './index/login/login.component';
import { SignupComponent } from './index/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '', component: IndexComponent, children: [
			{ path: '', component: LoginComponent, canActivate: [UsuarioAutenticadoGuard], title: 'Login', data: { animation: 'LoginAnimation' } },
			{ path: 'signup', component: SignupComponent, canActivate: [UsuarioAutenticadoGuard], title: 'Cadastrar', data: { animation: 'CadastroAnimation' } }
		]
	},
	{
		path: 'home', component: HomeComponent, children: [
			{ path: '', component: TimelineComponent, resolve: { publicacoes: PublicacoesTimelineResolve }, runGuardsAndResolvers: 'paramsOrQueryParamsChange', title: 'Publicações', data: { animation: 'PublicacoesAnimation' } },
			{ path: 'editarInformacoes', component: EditUserComponent, resolve: { usuario: InformacoesUsuarioAutenticadoResolve }, title: 'Editar informações', data: {animation: 'EditAnimation'} },
			{ path: 'chats', component: ChatsComponent, resolve: { chats: ChatsResolve }, title: 'Chats', data: { animation: 'ChatsAnimation' } },
			{ path: 'chats/:username', component: ChatMensagemComponent, runGuardsAndResolvers: 'always', title: 'Chat', data: { animation: 'ChatUserAnimation' } },
			{ path: ':username', component: PerfilComponent, resolve: { usuario: UsuarioPerfilResolve, publicacoes: PublicacaoResolve }, runGuardsAndResolvers: 'always', title: 'Perfil', data: { animation: 'PerfilAnimation' } }
		]
	},
	{ path: '**', redirectTo: '/not-found' },
	{ path: 'not-found', component: NotFoundComponent, title: 'Não encontrado' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),],
	exports: [RouterModule]
})
export class AppRoutingModule { }
