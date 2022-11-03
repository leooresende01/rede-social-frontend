import { outCred, inCred } from '../util/cred.util';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import * as crypto from "crypto-js";
import { filter, map, Observable } from "rxjs";
import { urlApi } from '../util/url-api';

export class AplicarEstrategiaInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const url = req.url.replace(urlApi, '');
		const metodoHttp = req.method;
		if (this.verificaAUrl(url) && (metodoHttp === 'POST' || metodoHttp === 'PUT')) {
			const requestCriptografada = crypto.AES.encrypt(JSON.stringify(req.body), outCred).toString();
			const requestCryptoClone = req.clone({ body: { payload: requestCriptografada } });
			return this.aplicarEstrategias(next.handle(requestCryptoClone));

		}
		if (metodoHttp === "DELETE") {
			return next.handle(req);
		} return this.aplicarEstrategias(next.handle(req));
	}

	private verificaAUrl(url: string): boolean {
		return url !== '/api/v1/usuarios' &&
			!new RegExp('/api/v1/usuarios/[A-Za-z0-9\.]+/publicacoes$').test(url) &&
			!new RegExp('/api/v1/usuarios/[A-Za-z0-9\.]+$').test(url)
	}

	private aplicarEstrategias(value: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
		return value.pipe(filter((event: HttpEvent<any>) => (event instanceof HttpResponse)))
			.pipe(map((event: any) => this.resolverARequisicao(event)));
	}
	private resolverARequisicao(event: any): any {
		const reqPay = event.body.payload;
		if (reqPay) {
			const bodyDescript = crypto.AES.decrypt(reqPay, inCred)
				.toString(crypto.enc.Utf8)
				.toString();
			const body = JSON.parse(bodyDescript);
			return event.clone({ body });
		} return event;
	}

}