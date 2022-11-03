import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Curtida } from './../../model/curtida';

@Injectable({providedIn: 'root'})
export class AtualizarCurtidaService {

	private subject: BehaviorSubject<Array<Curtida> | null> = new BehaviorSubject<Array<Curtida> | null>(null);

	constructor() {} 

	getObservable(): Observable<Array<Curtida> | null>  {
		return this.subject.asObservable();
	}

	nextValue(curtidas: Array<Curtida> | null ): void {
		this.subject.next(curtidas);
	}
}