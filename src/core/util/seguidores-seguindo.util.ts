import { ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from "rxjs";
import { Usuario } from "src/model/usuario";

export class SeguidoresSeguindoUtil {
	static atualizarInformacoesDoUsuarioUnfollowed(usuario: Usuario) {
		usuario.ehSeguidoPeloUsuarioAutenticado = false;
		usuario.seguidores--;
	}

	static atualizarInformacoesDoUsuarioSeguido(usuario: Usuario, usuarioSeguido: Usuario) {
		usuario.ehSeguidoPeloUsuarioAutenticado = usuarioSeguido.ehSeguidoPeloUsuarioAutenticado;
		usuario.segueOUsuarioAutenticado = usuarioSeguido.segueOUsuarioAutenticado;
		usuario.seguidores = usuarioSeguido.seguidores;
	}

	static atualizarStatusDoUsuarioSeguido(usuario: Usuario, seguidores: Array<Usuario>): void {
		const seguidorIndex = seguidores?.findIndex(seguidorLista => seguidorLista.id === usuario.id);
		const seguidor = seguidores[seguidorIndex];
		seguidor.seguidores = usuario.seguidores;
		seguidor.seguindo = usuario.seguindo;
		seguidor.publicacoes = usuario.publicacoes;
		seguidor.segueOUsuarioAutenticado = usuario.segueOUsuarioAutenticado;
		seguidor.ehSeguidoPeloUsuarioAutenticado = usuario.ehSeguidoPeloUsuarioAutenticado;
	}

	static atualizarStatusUsuarioUnfollowed(username: string, seguidores: Array<Usuario>): void {
		const seguidorIndex = seguidores.findIndex(seguidorFind => seguidorFind.username === username);
		const seguidor = seguidores[seguidorIndex];
		seguidor.ehSeguidoPeloUsuarioAutenticado = false;
	}

	static desativarObservable(...subscriptions: Array<Subscription>) {
		subscriptions.forEach(subscription => {
			if (subscription) {
				subscription.unsubscribe();
			}
		});
	}

	static trocarOBotaoParaLoading(botao: HTMLButtonElement,
			renderer: Renderer2,
			elementoDivLoanding: ElementRef<HTMLDivElement>) {
		const loadingElemento = elementoDivLoanding.nativeElement;
		renderer.setStyle(loadingElemento, 'display', 'flex');
		renderer.setStyle(botao, 'display', 'none');
		const html = `
		<button *ngIf="loading" class="${botao.className}" type="button" #elementoLoanding>
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
		${botao.textContent}
		</button>`;
		renderer.setProperty(loadingElemento, 'innerHTML', html);
	}

	static voltarOBotaoParaONormal(botao: HTMLButtonElement, renderer: Renderer2, elementoDivLoanding: ElementRef<HTMLDivElement>) {
		renderer.setStyle(elementoDivLoanding.nativeElement, 'display', 'none');
		renderer.setStyle(botao, 'display', 'inline-block');
	}
}