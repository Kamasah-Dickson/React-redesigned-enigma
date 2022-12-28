import "./plan.scss";
import React, { useRef } from "react";
import arcade from "../../../images/icon-arcade.svg";
import advance from "../../../images/icon-advanced.svg";
import pro from "../../../images/icon-pro.svg";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useState } from "react";

export default function Plan({
	headStep,
	step,
	plan,
	setPlan,
	PlanFormik,
	setPlanPrice,
}) {
	const arcadePrice = !plan ? "$9" : "$90/yr";
	const advancePrice = !plan ? "$12/mo" : "$120/yr";
	const proPrice = !plan ? "$15/mo" : "$150/yr";
	// want the raw value for summation
	const numArcadePrice = !plan ? 9 : 90;
	const numAdvancePrice = !plan ? 12 : 120;
	const numProPrice = !plan ? 15 : 150;

	const toggleProps = {
		"aria-label": plan ? "set plan yearly" : "plan yearly",
	};

	//** */ NB:planFormik is useFormik object storing state....can be found at forms.jsx

	// ==============Set an active className for Plans🙂===============
	const [activePlan, setActivePlan] = useState("");

	const arcadeRef = useRef();
	const advanceRef = useRef();
	const proRef = useRef();

	// the useEffect below checks if the element already has the active class before adding it.
	//  This way, the active class will not be removed when plan
	// or PlanFormik.values.planChoosed change.

	// ** I created this logic because,
	// ** Whenever a user chooses a plan and clicks the next button
	// ** and click the prev button, the active class resets.

	useEffect(() => {
		const arcadePlan = arcadeRef.current;
		const advancePlan = advanceRef.current;
		const proPlan = proRef.current;

		switch (PlanFormik.values.planChoosed) {
			case arcadePlan.getAttribute("value"):
				if (!arcadePlan.classList.contains("active")) {
					arcadePlan.classList.add("active");
				}
				advancePlan.classList.remove("active");
				proPlan.classList.remove("active");
				setPlanPrice(numArcadePrice);
				break;

			case advancePlan.getAttribute("value"):
				if (!advancePlan.classList.contains("active")) {
					advancePlan.classList.add("active");
				}
				arcadePlan.classList.remove("active");
				proPlan.classList.remove("active");
				setPlanPrice(numAdvancePrice);
				break;
			case proPlan.getAttribute("value"):
				if (!proPlan.classList.contains("active")) {
					proPlan.classList.add("active");
				}
				advancePlan.classList.remove("active");
				arcadePlan.classList.remove("active");
				setPlanPrice(numProPrice);
				break;

			default:
				break;
		}
	}, [plan, PlanFormik.values.planChoosed]);

	// ======================end of choose plans======================

	function handleFocus(e) {
		setActivePlan(e.target.getAttribute("value"));
		e.target.classList.add("active");
		PlanFormik.values.planChoosed = e.target.getAttribute("value");
	}
	function handleBlur(e) {
		e.target.classList.remove("active");
	}

	return (
		<div className="container">
			<form id="planForm" onSubmit={PlanFormik.handleSubmit}>
				<div className="provide-details">
					<h1 tabIndex="0">{headStep[step].h1}</h1>
					<p tabIndex="0">{headStep[step].p}</p>
					<div className="plans">
						<div
							className="plan"
							ref={arcadeRef}
							tabIndex="0"
							value="Arcade"
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
						>
							<div className="img">
								<img src={arcade} aria-hidden="true" />
							</div>
							<div className="plan-details">
								<h2>Arcade</h2>
								<p>{arcadePrice}</p>
								<span>{!plan || "2 months free"}</span>
							</div>
						</div>
						<div
							className="plan"
							tabIndex="0"
							ref={advanceRef}
							value="advanced"
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
						>
							<div className="img">
								<img src={advance} aria-hidden="true" />
							</div>
							<div className="plan-details">
								<h2>Advanced</h2>
								<p>{advancePrice}</p>
								<span>{!plan || "2 months free"}</span>
							</div>
						</div>
						<div
							className="plan"
							tabIndex="0"
							ref={proRef}
							value="pro"
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
						>
							<div className="img">
								<img src={pro} aria-hidden="true" />
							</div>
							<div className="plan-details">
								<h2>Pro</h2>
								<p>{proPrice}</p>
								<span>{!plan || "2 months free"}</span>
							</div>
						</div>
						{PlanFormik.errors.planChoosed && (
							<p className="error">
								{"Please Select an arcade,advanced or a Pro plan "}
							</p>
						)}
					</div>
					<div className="choice">
						<span
							className="focus"
							onClick={() => setPlan(false)}
							aria-label="plan monthly"
						>
							Monthly
						</span>

						<Switch
							checked={plan}
							value={plan}
							onChange={(e) => (
								setPlan(!plan),
								(PlanFormik.values.period = e.target.value
									? "yearly"
									: "Monthly")
							)}
							//allows the modification or addition of attributes
							inputProps={toggleProps}
							className="switch"
							id="check"
						/>
						<span aria-label="plan yearly" onClick={() => setPlan(true)}>
							Yearly
						</span>
					</div>
				</div>
			</form>
		</div>
	);
}
