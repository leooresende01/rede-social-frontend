import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DiretivaModule } from 'src/core/directive/diretiva.module';
import { PipeModule } from './../../core/pipe/pipe.mudule';
import { IndexComponent } from './index.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { ValidatorsModule } from './signup/validators/validators.module';

@NgModule({
	declarations: [LoginComponent, IndexComponent, SignupComponent],
	exports: [IndexComponent],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, PipeModule, DiretivaModule, ValidatorsModule]
})
export class IndexModule {

}