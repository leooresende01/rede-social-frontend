
export class Comentario {
	constructor(public id: number, 
		public publicacao: number, 
		public comentador: string, 
		public comentario: string,
		public dataDoComentario: string) { }
}