import React from "react";

export default function Aside({ step }) {
	return (
		<div className="aside">
			<div className="steps">
				<div className={`step ${step === 0 && "active"}`} aria-label="1">
					1
				</div>
				<div className={`step ${step === 1 && "active"}`} aria-label="2">
					2
				</div>
				<div className={`step ${step === 2 && "active"}`} aria-label="3">
					3
				</div>
				<div
					className={`step ${step === 3 && "active"} ${step === 4 && "active"}`}
					aria-label="4"
				>
					4
				</div>
			</div>
		</div>
	);
}
