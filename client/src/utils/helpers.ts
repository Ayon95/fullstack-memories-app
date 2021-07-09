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
