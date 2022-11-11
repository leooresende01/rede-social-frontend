import { Component, Input, OnInit } from '@angular/core';
import { Paginacao } from 'src/model/paginacao';

@Component({
	selector: 'rs-seguindo',
	templateUrl: './seguindo.component.html',
	styleUrls: ['./seguindo.component.css', '../seguidores/seguidores.component.css']
})
export class SeguindoComponent implements OnInit {
	public seguindo: Paginacao;

	@Input()
	public usuarioUsername: string;

	@Input()
	public set seguindoSet(seguindo: Paginacao | null) {
		this.seguindo = seguindo as Paginacao;
	}


	ngOnInit(): void {
	}

}
