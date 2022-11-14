import { ChatDto } from "../dto/chat.dto";

export class ChatUtil {
	public static definirComQuemOUsuarioEstaConversando(chat: ChatDto, usernameUsuarioAutenticado: string): void {
		if (chat.ultimaMensagem) chat.ultimaMensagem.foiVista = true;
		const usuarioQueIniciouOChat = chat.usuarioQueIniciou;
		if (usuarioQueIniciouOChat !== usernameUsuarioAutenticado) {
			chat.quemOUsuarioAutenticadoEstaConversando = usuarioQueIniciouOChat;
			return;
		} else {
			chat.quemOUsuarioAutenticadoEstaConversando = chat.oOutroUsuarioDoChat;
		}
	}

	static formatarData(dataSemFormatar: Date): string {
		dataSemFormatar.setHours(dataSemFormatar?.getHours() - 3);

		let day = String(dataSemFormatar.getDate());
		let month = String(dataSemFormatar.getMonth() + 1);
		let year = String(dataSemFormatar.getFullYear());
		let hour = String(dataSemFormatar.getHours());
		let minutes = String(dataSemFormatar.getMinutes());

		day = checkZero(day);
		month = checkZero(month);
		year = checkZero(year);
		hour = checkZero(hour);
		minutes = checkZero(minutes);

		return `${day}/${month}/${year} as ${hour}:${minutes}`;

		function checkZero(dataSemFormatar: string) {
			if (dataSemFormatar.length == 1) {
				dataSemFormatar = "0" + dataSemFormatar;
			}
			return dataSemFormatar;
		}
	}
}