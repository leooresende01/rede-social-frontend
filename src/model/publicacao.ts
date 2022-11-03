import { Curtida } from './curtida';
export class Publicacao {
	public id: number;
	public comentarios: number;
	public curtidas: number;
	public dono: string;
	public usuarioAutenticadoCurtiu: boolean;
	public dataDePublicacao: string;
	public legenda: string;
	public primeiraCurtida: Curtida | null;
}