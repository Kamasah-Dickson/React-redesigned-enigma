import "./plan.scss";
import React, { useRef } from "react";
import arcade from "../../../images/icon-arcade.svg";
import advance from "../../../images/icon-advanced.svg";
import pro from "../../../images/icon-pro.svg";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useState } from "react";
export default function Plan({ headStep, step, plan, setPlan, PlanFormik }) {
	const toggleProps = {
		"aria-label": plan ? "set plan yearly" : "plan yearly",
	};

	// NB:planFormik is an object I created  with react useFormik state....can be found at forms.jsx

	// ==============Set an active className for Plans🙂===============
	const [activePlan, setActivePlan] = useState("");

	const arcadeRef = useRef();
	const advanceRef = useRef();
	const proRef = useRef();

	// ** I created this logic because,
	// ** Whenever a user chooses a plan and clicks the next button and click the prev button, the active class resets.

	useEffect(() => {
		const arcadePlan = arcadeRef.current;
		const advancePlan = advanceRef.current;
		const proPlan = proRef.current;

		switch (PlanFormik.values.planChoosed) {
			case arcadePlan.getAttribute("value"):
				return (
					arcadePlan.classList.add("active"),
					advancePlan.classList.remove("active"),
					proPlan.classList.remove("active")
				);

			case advancePlan.getAttribute("value"):
				return (
					advancePlan.classList.add("active"),
					arcadePlan.classList.remove("active"),
					proPlan.classList.remove("active")
				);
			case proPlan.getAttribute("value"):
				return (
					proPlan.classList.add("active"),
					advancePlan.classList.remove("active"),
					arcadePlan.classList.remove("active")
				);

			default:
				return;
		}
	}, [activePlan]);

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
								<p>{!plan ? "$9/monthly" : "$90/yr"}</p>
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
								<p>{!plan ? "$12/monthly" : "$120/yr"}</p>
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
								<p>{!plan ? "$15/monthly" : "$150/yr"}</p>
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
