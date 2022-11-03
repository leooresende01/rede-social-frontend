import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Alert } from "src/model/alert";

@Injectable({providedIn: 'root'})
export class AlertService {
	private subject: Subject<Alert> = new Subject<Alert>();

	getObservable(): Observable<Alert> {
		return this.subject.asObservable();
	}

	nextValue(alert: Alert): void {
		this.subject.next(alert);
	}
}