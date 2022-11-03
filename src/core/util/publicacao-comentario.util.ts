import { Publicacao } from 'src/model/publicacao';
import { Comentario } from './../../model/comentario';
export class PublicacaoCurtidasUtil {

	static atualizarEMostrarComentarios(comentarios: Comentario[], publicacoes: Array<Publicacao>): void  {
		publicacoes.forEach(publicacao => {
			if (publicacao.id === comentarios[0]?.publicacao) {
				publicacao.comentarios = comentarios.length;
			}
		});
	}

	constructor(public publicacao: Publicacao, public comentarios: Array<Comentario> | null) {}
}