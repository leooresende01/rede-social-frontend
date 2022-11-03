import { SeguidoresSeguindoUtil } from './../../../core/util/seguidores-seguindo.util';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Publicacao } from './../../../model/publicacao';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
	public publicacoes: Array<Publicacao>;
	private publicacoesSubscription: Subscription;

	constructor(private activatedRoute: ActivatedRoute) {}
	
	ngOnInit(): void {
		this.publicacoesSubscription = this.activatedRoute.data
			.subscribe(data => this.publicacoes = data['publicacoes']);		
	}
	
	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.publicacoesSubscription);
	}
}
