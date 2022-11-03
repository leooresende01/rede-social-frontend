import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'formatarNomeDoUsuario'
})
export class NomeDoUsuarioFormatPipe implements PipeTransform {
	
	transform(value: string, ...args: any[]) {
		if (value.length > 20) {
			return `${value.substring(0, 19)}...`;
		} return value;
	}

}