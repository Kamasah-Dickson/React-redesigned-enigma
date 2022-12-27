import React from "react";
import Aside from "./Aside";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Personal_info from "./pages/Personal-info/Personal-info";
import Plan from "./pages/plan/Plan";
import Add_ons from "./pages/Add-ons/Add-ons";

export default function Form() {
	const [step, setStep] = useState(2);
	const [plan, setPlan] = useState(false); //true = monthly && false = yearly;
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

	// ==================Pages form data and validation==============

	const addOnsFormik = useFormik({
		initialValues: {
			onlineService: false,
			largerStorage: false,
			customizableProfile: false,
		},
		validationSchema: Yup.object({
			onlineService: Yup.boolean(),
			largerStorage: Yup.boolean(),
			customElements: Yup.boolean(),
		}),
		onSubmit: (values) => {
			setStep((prev) => prev + 1);
			console.log(values);
		},
	});

	const PlanFormik = useFormik({
		initialValues: {
			planChoosed: "",
			period: "Monthly",
		},
		validationSchema: Yup.object({
			planChoosed: Yup.string().required("Please choose a plan"),
		}),
		onSubmit: (values) => {
			if (Object.values(values).every((data) => data !== "")) {
				console.log(values);
				setStep((prev) => prev + 1);
			}
		},
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.min(15, "Name must be at least 15 characters long")
				.required("Name is required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			phone: Yup.string()
				.min(10, "Phone number must be at least 10")
				.required("Phone number is required"),
		}),

		onSubmit: (values) => {
			if (Object.values(values).every((data) => data !== "")) {
				console.log(values);
			}
			setStep((prev) => prev + 1);
		},
	});

	// ================end of page form vadidations==============

	function handleSteps() {
		if (formik.errors && PlanFormik.errors) {
			return;
		} else {
			setStep((prev) => prev + 1);
		}
	}

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

					{step === 1 && (
						<Plan
							step={step}
							headStep={headStep}
							plan={plan}
							setPlan={setPlan}
							PlanFormik={PlanFormik}
						/>
					)}
					{step === 2 && (
						<Add_ons
							step={step}
							headStep={headStep}
							addOnsFormik={addOnsFormik}
						/>
					)}

					<div className=" form move-forward">
						<div
							className="container"
							style={{ justifyContent: "space-between" }}
						>
							<button
								className="forward"
								type="submit"
								onClick={handleSteps}
								form={
									step === 0
										? "myForm"
										: step === 1
										? "planForm"
										: step === 2
										? "add_onsForm"
										: null
								}
							>
								Next Step
							</button>
							{step > 0 && (
								<button
									className="back"
									style={{ display: "flex" }}
									onClick={() => setStep((prev) => prev - 1)}
								>
									Go back
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
