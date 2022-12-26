import "./plan.scss";
import React from "react";
import arcade from "../../../images/icon-arcade.svg";
import advance from "../../../images/icon-advanced.svg";
import pro from "../../../images/icon-pro.svg";
import Switch from "@mui/material/Switch";

export default function Plan({ headStep, formik, step, plan, setPlan }) {
	const toggleProps = {
		"aria-label": plan ? "set plan yearly" : "set plan monthly",
	};
	return (
		<div className="container">
			<div className="provide-details">
				<h1>{headStep[step].h1}</h1>
				<p>{headStep[step].p}</p>
				<div className="plans">
					<div className="plan">
						<div className="img">
							<img src={arcade} alt="arcade" />
						</div>
						<div className="plan-details">
							<h2>Arcade</h2>
							<p>{!plan ? "$9/mo" : "$90/yr"}</p>
							<span>{!plan || "2 months free"}</span>
						</div>
					</div>
					<div className="plan">
						<div className="img">
							<img src={advance} alt="advance" />
						</div>
						<div className="plan-details">
							<h2>Advanced</h2>
							<p>{!plan ? "$12/mo" : "$120/yr"}</p>
							<span>{!plan || "2 months free"}</span>
						</div>
					</div>
					<div className="plan">
						<div className="img">
							<img src={pro} alt="pro" />
						</div>
						<div className="plan-details">
							<h2>Pro</h2>
							<p>{!plan ? "$15/mo" : "$150/yr"}</p>
							<span>{!plan || "2 months free"}</span>
						</div>
					</div>
				</div>
				<div className="choice">
					<label htmlFor="check">
						<span className="focus">Monthly</span>

						<Switch
							checked={plan}
							onChange={() => setPlan(!plan)}
							inputProps={toggleProps}
							className="switch"
							id="check"
						/>
						<span>Yearly</span>
					</label>
				</div>
			</div>
		</div>
	);
}
