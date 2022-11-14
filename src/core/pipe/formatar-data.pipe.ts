import { ChatUtil } from './../util/chat.util';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'formatarData'
})
export class FormatarDataPipe implements PipeTransform {
	
	transform(value: Date | string, ...args: any[]) {
		return ChatUtil.formatarData(new Date(value));
	}

}