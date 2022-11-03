import { ElementRef } from "@angular/core";

export class FormularioUtil {
	static mostrarImagem(event: Event, 
			inputImageElement: ElementRef<HTMLInputElement>, 
			imagemElement: ElementRef<HTMLImageElement>) {
		const file: File = this.pegarImagemDoInput(inputImageElement);
		var reader = new FileReader();

		var imgtag = imagemElement.nativeElement;

		reader.onload = function (event: any) {
			imgtag.src = event.target.result;
		};

		reader.readAsDataURL(file);
	}

	static pegarImagemDoInput(imagemElement: ElementRef<HTMLInputElement>): File {
		const fileList = imagemElement.nativeElement.files as FileList;
		return fileList[0];
	}
}