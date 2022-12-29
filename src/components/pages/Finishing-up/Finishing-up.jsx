import "./finishing-up.scss";

export default function Finishing_up({
	step,
	headStep,
	choosedPlan,
	plan,
	planPrice,
	setStep,
	addOnData,
	FinishingFormik,
}) {
	return (
		<form id="finishUp" onSubmit={FinishingFormik.handleSubmit}>
			<h1 tabIndex="0">{headStep[step].h1}</h1>
			<p tabIndex="0">{headStep[step].p}</p>
			<div className="finish-up">
				<div className="planed">
					<div className="left">
						<h3>
							{choosedPlan} ({plan ? "yearly" : "Monthly"})
						</h3>
						<span onClick={() => setStep(1)}>Change</span>
					</div>
					<div className="price">
						${planPrice}
						{plan ? "/yr" : "/mo"}
					</div>
				</div>
				<div className="added-on">
					{Object.values(addOnData)
						.filter((value) => value.name && value.price)
						.map((value, index) => {
							return (
								<div key={index} className="added">
									<span>{value.name}</span>
									<div className="price">{`+$${value.price}/${
										plan ? "yr" : "mo"
									}`}</div>
								</div>
							);
						})}
				</div>
			</div>
			<div className="total-plan">
				<span>Total ({plan ? "per year" : "per month"})</span>
				<div className="total-price">
					{!plan && "+"}$
					{Object.values(addOnData)
						.filter((values) => values.price && values.name)
						.map((values) => values.price)
						.reduce((total, value) => total + value, 0) + planPrice}
					{plan ? "/yr" : "/mo"}
				</div>
			</div>
		</form>
	);
}
