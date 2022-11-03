import { AlertType } from "./alert-type";

export class Alert {
	public mensagem: string;
	public alertType: AlertType;


	constructor(mensagem: string, alertType: AlertType) {
		this.mensagem = mensagem;
		this.alertType = alertType;
	}

    /**
     * Getter mensagem
     * @return {string}
     */
	public getMensagem(): string {
		return this.mensagem;
	}

    /**
     * Getter alertType
     * @return {AlertType}
     */
	public getAlertType(): AlertType {
		return this.alertType;
	}

    /**
     * Setter mensagem
     * @param {string} value
     */
	public setMensagem(value: string) {
		this.mensagem = value;
	}

    /**
     * Setter alertType
     * @param {AlertType} value
     */
	public setAlertType(value: AlertType) {
		this.alertType = value;
	}
	
}