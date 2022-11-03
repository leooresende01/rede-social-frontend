import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AtualizarSeguidoresSeguindoService {
	private subject: Subject<string| null> = new BehaviorSubject<null | string>(null);

	getObservable(): Observable<string| null> {
		return this.subject.asObservable();
	}

	proximoValor(value: string | null): void {
		this.subject.next(value);
	}
}