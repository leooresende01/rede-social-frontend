import { Publicacao } from 'src/model/publicacao';
export class PublicacaoUtil {
	static atualizarInformacoesDaPublicacaoCurtida(publicacao: Publicacao, publicacoes: Array<Publicacao>) {
		const publicacaoIndex = publicacoes.findIndex(publicacaoFind => publicacaoFind.id === publicacao.id);
		const publicacaoDaLista = publicacoes[publicacaoIndex];
		
		publicacaoDaLista.usuarioAutenticadoCurtiu = publicacao.usuarioAutenticadoCurtiu;
		publicacaoDaLista.curtidas = publicacao.curtidas;
		publicacaoDaLista.primeiraCurtida = publicacao.primeiraCurtida;

		publicacoes[publicacaoIndex] = publicacaoDaLista;
		return publicacoes;
	}

	static atualizarInformacoesDaPublicacaoDescurtida(publicacoes: Publicacao[], id: number, username: string) {
		const publicacaoIndex = publicacoes.findIndex(publicacao => publicacao.id === id);
		const publicacaoDaLista = publicacoes[publicacaoIndex];
		publicacaoDaLista.usuarioAutenticadoCurtiu = false;
		if (publicacaoDaLista.primeiraCurtida?.curtidor === username) {
			publicacaoDaLista.primeiraCurtida = null;
		}
		publicacaoDaLista.curtidas--;
		publicacoes[publicacaoIndex] = publicacaoDaLista;
	}
}