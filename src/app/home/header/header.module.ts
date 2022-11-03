import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PipeModule } from "src/core/pipe/pipe.mudule";
import { FindUserComponent } from "../find-user/find-user.component";
import { NewPublicacaoComponent } from "../new-publicacao/new-publicacao.component";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header.component";
import { UserOptionsComponent } from "./user-options/user-options.component";

@NgModule({
	declarations: [HeaderComponent, UserOptionsComponent, FindUserComponent, NewPublicacaoComponent],
	exports: [HeaderComponent],
	imports: [RouterModule, CommonModule, ReactiveFormsModule, PipeModule, SharedModule],
})
export class HeaderModule {

}