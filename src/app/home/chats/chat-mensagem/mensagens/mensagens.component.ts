import { MensagemDto } from 'src/core/dto/mensagem.dto';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioUtil } from 'src/core/util/usuario.util';

@Component({
	selector: 'rs-mensagens',
	templateUrl: './mensagens.component.html',
	styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
	@Input()
	public mensagem: MensagemDto;

	@Input()
	public usuarioAuthenticadoUsername: string;

	@Input()
	public urlApi: string;
	
	constructor() { }

	ngOnInit(): void {
	}

	errorImage(event: Event) {
		UsuarioUtil.definirImagemDefault(event);
	}
}
