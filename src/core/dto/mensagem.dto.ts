import { ChatUtil } from "../util/chat.util";
import { MensagemForm } from "./mensagem.form";

export class MensagemDto {
	public id: number;
	public mensagem: string;
	public emissor: string;
	public destinatario: string;
	public dataDeEnvio: string;
	public dataSemFormatar: Date | string;
	public chatId: number;
	public foiVista: boolean;
	
	static mapearFormParaDto(mensagemForm: MensagemForm, usernameUsuarioAutenticado: string): MensagemDto {
		const mensagemDto = new MensagemDto();
		const dataAtual = new Date();
		dataAtual.setHours(dataAtual.getHours() + 3);
		mensagemDto.dataSemFormatar = String(dataAtual);
		mensagemDto.destinatario = mensagemForm.sendTo;
		mensagemDto.emissor = usernameUsuarioAutenticado;
		mensagemDto.mensagem = mensagemForm.mensagem;
		return mensagemDto;
	}
}