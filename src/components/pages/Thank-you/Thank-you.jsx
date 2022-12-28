import React from "react";
import thankYou from "../../../images/icon-thank-you.svg";
import "./thank-you.scss";

export default function Thank_you({ headStep, step }) {
	return (
		<form id="Thanks">
			<div className="provide-details thank-you-details">
				<img src={thankYou} alt="thank you" />
				<h1 tabIndex="0">{headStep[step].h1}</h1>
				<p tabIndex="0">{headStep[step].p}</p>
			</div>
		</form>
	);
}
