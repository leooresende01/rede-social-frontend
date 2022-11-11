import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtualizarNovaPublicacaoService } from 'src/core/observable/atualizar-nova-publicacao.service';
import { FormularioUtil } from 'src/core/util/formulario.util';
import { Alert } from 'src/model/alert';
import { AlertType } from 'src/model/alert-type';
import { AlertService } from '../../../core/observable/alert.service';
import { PublicacaoService } from './../../../core/service/publicacao.service';

@Component({
	selector: 'rs-newpublicacao',
	templateUrl: './new-publicacao.component.html',
	styleUrls: ['./new-publicacao.component.css', '../../index/shared/index.style.css']
})
export class NewPublicacaoComponent implements OnInit {
	public formGroup: FormGroup;

	@ViewChild('img')
	public imagemElement: ElementRef<HTMLImageElement>;

	@ViewChild('inputFile')
	public inputImagemElement: ElementRef<HTMLInputElement>;

	@ViewChild('btnClose')
	public btnCloseElement: ElementRef<HTMLButtonElement>;

	@ViewChild('legenda')
	public inputLegendaElement: ElementRef<HTMLTextAreaElement>;
	public progressoSubmit: number;

	constructor(private formBuilder: FormBuilder,
		private publicacaoService: PublicacaoService,
		private alertService: AlertService,
		private atualizarNovaPublicacaoService: AtualizarNovaPublicacaoService) { }

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			imagem: ['', [Validators.required]]
		})
	}

	carregarImagemProUsuario(event: Event) {
		FormularioUtil.mostrarImagem(event, this.inputImagemElement, this.imagemElement);
	}

	salvarPublicacao() {
		const inputImage = FormularioUtil.pegarImagemDoInput(this.inputImagemElement);
		const legenda = this.inputLegendaElement.nativeElement.value;
		this.publicacaoService.criarPublicacao(inputImage, legenda)
			.subscribe(evento => this.atualizarStatusDoUpload(evento),
				(err) => {
					this.alertService.nextValue(new Alert("Ocorreu um erro no servidor", AlertType.DANGER));
					this.resetarFormularios();
				});
	}

	atualizarStatusDoUpload(event: any): void {
		if (event.type === HttpEventType.Response) {
			this.alertService.nextValue(new Alert('Publicação salva com sucesso', AlertType.SUCCESS));
			this.resetarFormularios();
		}
		if (event.type === HttpEventType.UploadProgress) {
			this.progressoSubmit = Math.round(100 * event.loaded / event.total);
		}
	}
	resetarFormularios() {
		this.formGroup.reset();
		this.progressoSubmit = 0;
		this.atualizarNovaPublicacaoService.atualizarPublicacoes();
		this.btnCloseElement.nativeElement.click();
	}
}
