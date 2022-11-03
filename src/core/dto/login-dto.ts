export class LoginDto {
	constructor(public token: string, public authType: string, public expirationTime: number, public refreshToken: string) { }
	
	static mapearParaLoginDto(obj: any): LoginDto {
		return new LoginDto(obj.token, obj.authType, obj.expirationTime, obj.refreshToken);
	}
}