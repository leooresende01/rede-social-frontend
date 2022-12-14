import { FormatarDataPipe } from './formatar-data.pipe';
import { PathNameFormatPipe } from 'src/core/pipe/path-name-format.pipe';
import { NgModule } from "@angular/core";
import { NomeDoUsuarioFormatPipe } from './nome-do-usuario-format.pipe';

@NgModule({
	declarations: [PathNameFormatPipe, NomeDoUsuarioFormatPipe, FormatarDataPipe],
	exports: [PathNameFormatPipe, NomeDoUsuarioFormatPipe, FormatarDataPipe]
})
export class PipeModule {

}