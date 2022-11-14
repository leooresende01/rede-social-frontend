import { OcutarNoChatDirective } from './ocutar-no-chat.directive';
import { FocusDirective } from 'src/core/directive/focus.directive';
import { NgModule } from "@angular/core";

@NgModule({
	declarations: [FocusDirective, OcutarNoChatDirective],
	exports: [FocusDirective, OcutarNoChatDirective]
})
export class DiretivaModule {

}