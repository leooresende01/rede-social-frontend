export class Usuario {
	public id: number;
	public username: string;
	public nomeCompleto: string;
	public publicacoes: number;
	public seguidores: number;
	public seguindo: number;
	public ehSeguidoPeloUsuarioAutenticado: boolean;
	public segueOUsuarioAutenticado: boolean;
}