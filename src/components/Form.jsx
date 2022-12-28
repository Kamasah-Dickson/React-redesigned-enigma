import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useReducer } from "react";
import Personal_info from "./pages/Personal-info/Personal-info";
import Plan from "./pages/plan/Plan";
import Add_ons from "./pages/Add-ons/Add-ons";
import Finishing_up from "./pages/Finishing-up/Finishing-up";
import Thank_you from "./pages/Thank-you/Thank-you";
import Aside from "./Aside";

export default function Form() {
	const [step, setStep] = useState(0);
	const [planPrice, setPlanPrice] = useState("");
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
		{
			h1: "Thank you",
			p: "Thanks for confirming your subscription! we hope you have fun using out platform. if you ever need support, please feel free to email us at support@loremGaming.com.",
		},
	]);

	// ==================Pages form data and validation==============

	const [addOnData, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "SERVICES":
					return {
						...state,
						service: {
							name: action.payload.name,
							price: action.payload.price,
						},
					};
				case "STORAGE":
					return {
						...state,
						storage: {
							name: action.payload.name,
							price: action.payload.price,
							id: 8,
						},
					};

				case "PROFILE":
					return {
						...state,
						profile: {
							name: action.payload.name,
							price: action.payload.price,
						},
					};
			}
		},
		{
			service: {
				name: "",
				price: "",
				id: 2,
			},
			storage: {
				name: "",
				price: "",
				id: 12,
			},
			profile: {
				name: "",
				price: "",
				id: 9,
			},
		}
	);

	const [finalData, setFinalData] = useState({});

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
				setFinalData(values);
			}
			setStep((prev) => prev + 1);
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
				setFinalData((prev) => ({ ...prev, ...values }));
				setStep((prev) => prev + 1);
			}
		},
	});

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
			setFinalData((prev) => ({ ...prev, ...values }));
			setStep((prev) => prev + 1);
		},
	});

	const FinishingFormik = useFormik({
		initialValues: { data: "" },
		onSubmit: (values) => {
			setFinalData((prev) => ({ ...prev, ...values }));
			setStep((prev) => prev + 1);
			console.log(finalData);
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
					<div className="container">
						<div className="provide-details">
							{step === 0 && (
								<Personal_info
									step={step}
									formik={formik}
									headStep={headStep}
								/>
							)}

							{step === 1 && (
								<Plan
									step={step}
									headStep={headStep}
									plan={plan}
									setPlan={setPlan}
									PlanFormik={PlanFormik}
									setPlanPrice={setPlanPrice}
								/>
							)}
							{step === 2 && (
								<Add_ons
									step={step}
									headStep={headStep}
									addOnsFormik={addOnsFormik}
									plan={plan}
									dispatch={dispatch}
								/>
							)}

							{step === 3 && (
								<Finishing_up
									step={step}
									headStep={headStep}
									choosedPlan={PlanFormik.values.planChoosed}
									plan={plan}
									planPrice={planPrice}
									setStep={setStep}
									addOnData={addOnData}
									FinishingFormik={FinishingFormik}
								/>
							)}
							{step === 4 && <Thank_you headStep={headStep} step={step} />}
							<div
								className=" desktop-move-forward"
								style={step === 4 ? { display: "none" } : {}}
							>
								<div
									className="container"
									style={{ justifyContent: "space-between" }}
								>
									<button
										style={
											step === 3
												? { backgroundColor: "hsl(243, 100%, 62%)" }
												: {}
										}
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
												: step === 3
												? "finishUp"
												: null
										}
									>
										{step === 3 ? "Confirm" : "Next step"}
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
					<div
						className=" form move-forward"
						style={step === 4 ? { display: "none" } : {}}
					>
						<div
							className="container"
							style={{ justifyContent: "space-between" }}
						>
							<button
								style={
									step === 3 ? { backgroundColor: "hsl(243, 100%, 62%)" } : {}
								}
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
										: step === 3
										? "finishUp"
										: null
								}
							>
								{step === 3 ? "Confirm" : "Next step"}
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
