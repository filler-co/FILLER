// validate for presence
export default function validateForm({ name, email, question }) {
	if (!name.trim()) {
		return `Name is required`;
	}

	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!email) {
		return 'Email required';
	}

	if (email) {
		if (!regex.test(email.toLowerCase())) {
			//console.log('check Email');
			return 'Email format is invalid, please follow eg: bob@example.com';
		}
	}

	if (!question) {
		return `Question is required`;
	}

	return null;
}

// // validate for presence
// export function validatePresence(elementInput, elementName) {
// 	if (!elementInput.trim()) {
// 		return  `${elementName} is required`;
// 	}
// 	return null;
// }

// // validate for format
// export function validateFormat(elementInput, elementName) {

// 	const regexEmail =
// 		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 	if (elementInput) {
// 		if (!regex.test(elementInput.toLowerCase())) {
// 			console.log('check Email', elementName);
// 			return 'Email is invalid, please follow eg: bob@example.com';
// 		}
// 	}

// 	return null;
// }

// // validate for length
// export function validateLength(elementInput, elementName) {

// 	if (!elementInput) {
// 		return `${elementName} is required`;
// 	}

// 	return null;
// }
