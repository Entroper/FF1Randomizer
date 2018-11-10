async function handleFileSelect(inputId) {
	const input = document.getElementById(inputId);
	const file = input.files[0];
	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onload = e => {
			let encoded = e.target.result.split(',')[1];
			resolve(encoded);
		};
		reader.onerror = () => {
			reader.abort();
			reject(new DOMException("Error reading file"));
		};

		reader.readAsDataURL(file);
	});
}

async function downloadROM(filename, encoded) {
	const url = "data:application/octet-stream;base64," + encoded;
	const result = await fetch(url);
	const blob = await result.blob();

	var anchor = document.createElement('a');
	anchor.download = filename;
	anchor.href = window.URL.createObjectURL(blob);
	anchor.dispatchEvent(new MouseEvent('click'));
}

const funKey = 'fun';

function savePreferences(fun) {
	localStorage.setItem(funKey, JSON.stringify(fun));
	document.getElementById('funKeyMessage').innerText = 'Preferences Saved.';
}

function clearPreferences() {
	localStorage.clear(funKey);
	document.getElementById('funKeyMessage').innerText = 'Preferences Cleared.';
}

function loadPreferences() {
	let fun = localStorage.getItem(funKey);
	fun = fun ? JSON.parse(fun) : {}

	document.getElementById('funKeyMessage').innerText = 'Your preferred Fun % flags have been automatically restored.';
	return fun;
}
