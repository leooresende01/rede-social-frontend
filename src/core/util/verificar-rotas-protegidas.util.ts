import { urlApi } from './url-api';
import { HttpRequest } from "@angular/common/http";

const rotasNaoProtegidas = [
	{path: '/api/v1/usuarios', method: 'POST'},
	{path: '/api/v1/login', method: 'POST'},
	{path: '/api/v1/login/atualizarToken', method: 'POST'}
];

export default function verificarSeUmaRotaEhProtegida(req: HttpRequest<any>) {
	const rotaDaApi: string = req.url.replace(urlApi, '');
	const metodoHttp = req.method;
	const indiceRotaProtegida = rotasNaoProtegidas.findIndex(rota => {
		return rotaDaApi === rota.path && metodoHttp === rota.method;
	});
	if (indiceRotaProtegida === -1) return true;
	return false;
}