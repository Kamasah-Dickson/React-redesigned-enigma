import React from "react";
import Aside from "./Aside";
import { useState } from "react";

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
							<h1>{headStep[step].h1}</h1>
							<p>{headStep[step].p}</p>
							<form>
								<label htmlFor="name">Name</label>
								<input type="text" placeholder="e.g Kamasah Dickson" />
								<label htmlFor="name">Email address</label>
								<input
									type="email"
									placeholder="e.g Kamasahdickson19@gmail.com"
								/>
								<label htmlFor="name">phone number</label>
								<input type="text" placeholder="e.g +233594571065" />
							</form>
						</div>
					</div>

					<form className="move-forward">
						<div className="container">
							<button>Next Step</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
