import React from "react";
import Aside from "./Aside";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Personal_info from "./pages/Personal-info";

export default function Form() {
	const [step, setStep] = useState(0);
	const [plan, setPlan] = useState(true); //true = monthly && false = yearly;
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

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.max(15, "Name must be at least 15 characters long")
				.required("Name is required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is requred"),
			phone: Yup.string()
				.min(10, "Phone number must be at least 10")
				.required("Phone number is required"),
		}),

		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<>
			<div className="form-section">
				<div className="form-wrapper">
					<div className="aside-wrapper">
						<div className="container">
							<Aside step={step} setStep={setStep} />
						</div>
					</div>
					{step === 0 && (
						<Personal_info step={step} formik={formik} headStep={headStep} />
					)}

					<div className=" form move-forward">
						<div className="container">
							<button type="submit" form="myForm">
								Next Step
							</button>
							<button className="back">Go back</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
