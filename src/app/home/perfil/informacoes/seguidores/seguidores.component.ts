import { Component, Input, OnInit } from '@angular/core';
import { Paginacao } from 'src/model/paginacao';
import { Usuario } from 'src/model/usuario';

@Component({
	selector: 'rs-seguidores',
	templateUrl: './seguidores.component.html',
	styleUrls: ['./seguidores.component.css']
})
export class SeguidoresComponent implements OnInit {
	public seguidores: Paginacao;
	
	@Input()
	public usuarioUsername: string;

	@Input()
	public set seguidoresSet(seguidores: Paginacao | null) {
		this.seguidores = seguidores as Paginacao;
	}

	ngOnInit(): void {
	}
}
