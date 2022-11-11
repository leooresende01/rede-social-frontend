import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticateService } from 'src/core/service/user-authenticate.service';

@Component({
	selector: 'rs-user-options-header',
	templateUrl: './user-options.component.html',
	styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {

	@Input()
	public usernameUsuarioAutenticado: string;

	constructor(private userAuthenticateService: UserAuthenticateService,
			private router: Router) { }

	ngOnInit(): void {
	}

	fazerLoggout(): void {
		this.userAuthenticateService.fazerLoggout();
		this.router.navigate(['/'], {replaceUrl: true});
	}
}
