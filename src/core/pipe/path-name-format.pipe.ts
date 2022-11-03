import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
	name: 'pathNameFormat'
  })
export class PathNameFormatPipe implements PipeTransform {
	transform(value: string, ...args: any[]) {
		let valueSplit = "/";
		if (/\\/.test(value)) {
			valueSplit = "\\";
		}
		const pathSplit = value.split(valueSplit);
		const quantidadeDeElementos = pathSplit.length;
		return pathSplit[quantidadeDeElementos - 1];
	}

}