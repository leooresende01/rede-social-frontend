import { PipeModule } from './../../../core/pipe/pipe.mudule';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ChatMensagemComponent } from "./chat-mensagem/chat-mensagem.component";
import { ChatsComponent } from "./chats.component";
import { SharedModule } from '../shared/shared.module';
import { MensagensComponent } from './chat-mensagem/mensagens/mensagens.component';

@NgModule({
	declarations: [ChatsComponent, ChatMensagemComponent, MensagensComponent],
	imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule, PipeModule]
})
export class ChatModule {

}