import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AtualizarCurtidaService } from 'src/core/observable/atualizar-curtidas.service';
import { CurtidaService } from 'src/core/service/curtida.service';
import { SeguidoresSeguindoUtil } from 'src/core/util/seguidores-seguindo.util';
import { Publicacao } from 'src/model/publicacao';
import { Curtida } from './../../../../../model/curtida';

@Component({
	selector: 'rs-home-perfil-publicacoes-pessoasquecurtiram',
	templateUrl: './pessoas-que-curtiram.component.html',
	styleUrls: ['./pessoas-que-curtiram.component.css']
})
export class PessoasQueCurtiramComponent implements OnInit, OnDestroy {
	@Input()
	public publicacao: Publicacao;

	public curtidas: Array<Curtida>;
	curtidasSubscription: Subscription;

	constructor(private curtidaService: CurtidaService,
		private atualizarCurtidaService: AtualizarCurtidaService) { }

	ngOnInit(): void {
	}

	buscarPessoasQueCurtiram(donoDaPublicacao: string, idDaPublicacao: number): void {
		this.atualizarCurtidaService.nextValue(null);
		this.curtidasSubscription = this.curtidaService.buscarCurtidasDeUmaPublicacao(donoDaPublicacao, idDaPublicacao)
			.subscribe(curtidas => {
				if (curtidas) {
					this.publicacao.primeiraCurtida = curtidas[0];
					this.atualizarCurtidaService.nextValue(curtidas);
				}
			});
	}

	ngOnDestroy(): void {
		SeguidoresSeguindoUtil.desativarObservable(this.curtidasSubscription);
	}
}
