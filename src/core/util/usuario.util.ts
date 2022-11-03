import { outCred } from './cred.util';
import { ElementRef, Renderer2 } from '@angular/core';
import * as crypto from "crypto-js";
import { AtualizarUsuarioDto } from '../dto/atualizar-usuario.dto';
import { RegistroForm } from './../dto/registro.dto';
import { imgDefault } from './imagem-default';

export class UsuarioUtil {
	static pegarFormData(form: RegistroForm): FormData {
		const formData = new FormData();
		formData.append('nomeCompleto', UsuarioUtil.resolverValoresDaRequisicao(form.nomeCompleto));
		formData.append('username', UsuarioUtil.resolverValoresDaRequisicao(form.username));
		formData.append('password', UsuarioUtil.resolverValoresDaRequisicao(form.password));
		if (form.imagemPath)
		formData.append('file', form.imagemPath, form.imagemPath.name);
		return formData;
	}

	static ocutarModal(modal: ElementRef<HTMLDivElement>, renderer: Renderer2): void {
		renderer.setStyle(modal.nativeElement, 'display', 'none');
	}

	static pegarFormDataAtualizacaoDeInformacoes(atualizarUsuarioDto: AtualizarUsuarioDto) {
		const formData = new FormData();
		formData.append('nomeCompleto', UsuarioUtil.resolverValoresDaRequisicao(atualizarUsuarioDto.nomeCompleto));
		formData.append('username', UsuarioUtil.resolverValoresDaRequisicao(atualizarUsuarioDto.username));
		if (atualizarUsuarioDto.imagem)
			formData.append('file', atualizarUsuarioDto.imagem, atualizarUsuarioDto.imagem.name);
		return formData;
	}

	static definirImagemDefault(event: Event) {
		const imagem = event.target as HTMLImageElement;
		imagem.src = imgDefault;
	}

	private static resolverValoresDaRequisicao(value: string): string {
		return crypto.AES.encrypt(value, outCred).toString();
	}
}