import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BarraDeProgressoService } from '../observable/barra-de-progresso.service';
@Injectable({providedIn: 'root'})
export class PrograssoInterceptor implements HttpInterceptor {
	
	constructor(private barraDeProgressoService: BarraDeProgressoService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const hr = document.getElementById('nome');
        return next.handle(req).pipe(tap((event: any) => {
            if (event instanceof HttpResponse) {
                this.barraDeProgressoService.ocultarBarraDeProgresso();
            }
        }, (err) => {
            this.barraDeProgressoService.ocultarBarraDeProgresso();
        }),);
	}

}