import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AtualizarNovaPublicacaoService {

	private subject: Subject<string | null> = new BehaviorSubject<string | null>(null);

	getObservable(): Observable<string | null> {
		return this.subject.asObservable();
	}

	atualizarPublicacoes(): void {
		this.subject.next("Atualiza ai");
	} 
}