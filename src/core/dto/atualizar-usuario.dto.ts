export class AtualizarUsuarioDto {
	constructor(public username: string, public nomeCompleto: string, public imagem: File) {}
}