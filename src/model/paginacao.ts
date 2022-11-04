import { Publicacao } from "./publicacao";
import { Usuario } from "./usuario";

export class Paginacao {
	constructor(public content: Array<Publicacao | Usuario>,
		public last: boolean) {}
}