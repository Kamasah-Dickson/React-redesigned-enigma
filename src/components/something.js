import { useState } from "react";

const useForm = (Validate) => {
	const [errors, setErrors] = useState({});
	const [headStep, setHeadStep] = useState([
		{
			h1: "Personal info",
			p: "Please provide your name, email address, and phone number.",
		},
		{
			h1: "Select your plan",
			p: "You have the option of monthly or yearly billing.",
		},
		{
			h1: "Pick add-ons",
			p: "Add-ons help enhance your gaming experience.",
		},
		{
			h1: "Finishing up",
			p: "Double-check everything looks OK before confirming",
		},
	]);
	const [step, setStep] = useState(0);

	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const handleData = (e) => {
		const { value, name } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
		setErrors(Validate(data));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// const checkForErrors = Object.values(errors).every((error) => error === "");
		// console.log(checkForErrors);
		if (Object.values(errors).some((error) => error !== "")) {
			// setErrors(Validate(data));
			console.log(errors);
		} else if (Object.values(data).every((data) => data !== "")) {
			setStep((prev) => prev + 1);
		}
	};

	return {
		handleData,
		handleSubmit,
		errors,
		data,
		headStep,
		step,
		setHeadStep,
	};
};

export default useForm;
