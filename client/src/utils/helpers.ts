import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from './types';

export async function convertToBase64(file: File) {
	const binaryString = await readFileBinaryAsync(file);
	// converting to base64
	return btoa(binaryString);
}

// promisifying file-reading operation
function readFileBinaryAsync(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		// create a file reader
		const reader = new FileReader();
		// this handler will be executed each time a file is successfully read
		reader.onload = () => {
			if (!reader.result) return;
			resolve(reader.result as string);
		};

		// this handler will be executed when an error occurs during file-reading
		reader.onerror = () => {
			console.error(reader.error);
			reject(reader.error);
		};

		// read the content of the file as binary string
		// load event will be triggered when this completes successfully
		reader.readAsBinaryString(file);
	});
}

// this function will get user (if any) from local storage
export function getUserFromLocalStorage() {
	const data = localStorage.getItem('memoriesUser');
	if (!data) return;
	const user: User = JSON.parse(data);
	return user;
}

// this function will check whether the token has expired or not
export function checkExpiredToken(token: string) {
	const decodedToken = jwtDecode<JwtPayload>(token);
	// if the expiration time (Unix timestamp) is less than the current timestamp, then it means the token has expired
	// note that the Unix timestamp is in seconds, so it needs to be converted to milliseconds
	return decodedToken.exp! * 1000 < new Date().getTime();
}
