export const Validate = (fields) => {
	const errors = {};

	if (!fields.name.trim()) {
		errors.name = "Username required";
	}

	if (!fields.email) {
		errors.email = "This field is required";
	}
	//  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
	// 	errors.email = "Invalid email";
	// }

	// if (!fields.password) {
	// 	errors.password = "Password required";
	// } else if (fields.password < 6) {
	// 	errors.password = "Passwords must be 6 characters or more";
	// }

	if (!fields.phone) {
		errors.phone = "Phone number required";
	} else if (isNaN(fields.phone)) {
		errors.phone = "Please enter a number";
	} else if (!/^\d{10}$/.test(fields.phone)) {
		errors.phone = "Phone must be a 10-digit number";
	}

	return errors;
};
