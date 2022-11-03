export const outCred: string = (() => {
	return bin2String(atob("MTAwMTAxMSwxMDExMDAwLDEwMDEwMDEsMTEwMTAwLDEwMTAwMTAsMTExMDAwMCwxMDExMDEwLDExMDExMQ==").split(','));
})();
export const inCred: string = (() => {
	return bin2String(atob("MTExMDAxMSwxMTAwMTEwLDEwMDExMTEsMTExMTAwMCwxMDEwMTExLDExMDEwMCwxMDAwMTEw").split(','))
})();

function bin2String(array: any) {
	var result = "";
	for (var i = 0; i < array.length; i++) {
		result += String.fromCharCode(parseInt(array[i], 2));
	}
	return result;
}