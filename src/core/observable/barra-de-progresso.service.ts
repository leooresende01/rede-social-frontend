import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BarraDeProgressoService {

	private subject: Subject<boolean> = new BehaviorSubject<boolean>(false);

	getObservable(): Observable<boolean> {
		return this.subject.asObservable();
	}

	nextValue(value: boolean): void {
		this.subject.next(value);
	}

	exibirBarraDeProgresso() {
		this.subject.next(true);
	}

	ocultarBarraDeProgresso() {
		this.subject.next(false);
	}
}