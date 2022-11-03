import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user.component';
import { NgModule } from "@angular/core";
import { ValidatorsModule } from 'src/app/index/signup/validators/validators.module';

@NgModule({
	declarations: [EditUserComponent],
	imports: [ReactiveFormsModule, ValidatorsModule]
})
export class EditUserModule {

}