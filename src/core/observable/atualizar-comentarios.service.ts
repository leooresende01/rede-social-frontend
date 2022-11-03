import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PublicacaoCurtidasUtil } from '../util/publicacao-comentario.util';

@Injectable({providedIn: 'root'})
export class AtualizarComentariosService {
	private subject: BehaviorSubject<PublicacaoCurtidasUtil | null> = new BehaviorSubject<PublicacaoCurtidasUtil | null>(null);

	getObservable(): Observable<PublicacaoCurtidasUtil | null> {
		return this.subject.asObservable();
	}

	nextValue(value: PublicacaoCurtidasUtil | null): void {
		this.subject.next(value);
	}
}