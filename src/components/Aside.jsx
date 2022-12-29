import React from "react";

export default function Aside({ step }) {
	return (
		<div className="aside">
			<div className="steps">
				<div className={`step ${step === 0 && "active"}`} aria-label="1">
					<p>1</p>
					<div className="tree">
						<span>STEP 1</span>
						<h2>YOUR INFO</h2>
					</div>
				</div>
				<div className={`step ${step === 1 && "active"}`} aria-label="2">
					<p>2</p>
					<div className="tree">
						<span>STEP 2</span>
						<h2>SELECT PLAN</h2>
					</div>
				</div>
				<div className={`step ${step === 2 && "active"}`} aria-label="3">
					<p>3</p>
					<div className="tree">
						<span>STEP 3</span>
						<h2>ADD-ONS</h2>
					</div>
				</div>
				<div
					className={`step ${step === 3 && "active"} ${step === 4 && "active"}`}
					aria-label="4"
				>
					<p>4</p>
					<div className="tree">
						<span>STEP 4</span>
						<h2>SUMMARY</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
