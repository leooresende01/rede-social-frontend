import { MensagemDto } from "./mensagem.dto";

export class ChatDto {
	public id: number;
	public usuarioQueIniciou: string;
	public oOutroUsuarioDoChat: string;
	public dataDeCriacao: string;
	public ultimaMensagem: MensagemDto;
	public quemOUsuarioAutenticadoEstaConversando: string;
}