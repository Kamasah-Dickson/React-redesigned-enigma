import React from "react";
import { useRef } from "react";
import "./add-ons.scss";
import { useEffect } from "react";

export default function Add_ons({ headStep, step, addOnsFormik }) {
	const serviceRef = useRef(null);
	const storageRef = useRef(null);
	const profileRef = useRef(null);

	//I used useEffect here to check if the add-ons page renders
	//and the addOnsFomik's data has a checked to be true then checkboxes
	// will be checked...
	//NB: I am conditionally rendering pages due to the nex/prev buttons

	useEffect(() => {
		addOnsFormik.values.onlineService
			? serviceRef.current?.parentElement.classList.add("active")
			: serviceRef.current?.parentElement.classList.remove("active");

		addOnsFormik.values.largerStorage
			? storageRef.current?.parentElement.classList.add("active")
			: storageRef.current?.parentElement.classList.remove("active");

		addOnsFormik.values.customizableProfile
			? profileRef.current?.parentElement.classList.add("active")
			: profileRef.current?.parentElement.classList.remove("active");
	}, []);

	const handleFocus = (e) => {
		e.target.classList.add("active");
	};
	const handleBlur = (e) => {
		e.target.classList.remove("active");
		return;
	};

	return (
		<div className="container">
			<form id="add_onsForm" onSubmit={addOnsFormik.handleSubmit}>
				<div className="provide-details">
					<h1 tabIndex="0">{headStep[step].h1}</h1>
					<p tabIndex="0">{headStep[step].p}</p>
					<div className="pick-add-ons">
						<label
							htmlFor="service"
							className="add-ons service"
							tabIndex={0}
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
							onClick={
								addOnsFormik.values.onlineService
									? serviceRef.current?.parentElement.classList.add("active")
									: serviceRef.current?.parentElement.classList.remove("active")
							}
						>
							<input
								ref={serviceRef}
								checked={addOnsFormik.values.onlineService}
								type="checkbox"
								name="onlineService"
								id="service"
								value={addOnsFormik.values.onlineService}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Online Service</h3>
								<p>Access to multiplayer games</p>
							</div>
							<span>+$1/monthly</span>
						</label>
						<label
							htmlFor="storage"
							className="add-ons storage"
							tabIndex={0}
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
							aria-label="Online services"
							onClick={
								addOnsFormik.values.largerStorage
									? storageRef.current?.parentElement.classList.add("active")
									: storageRef.current?.parentElement.classList.remove("active")
							}
						>
							<input
								ref={storageRef}
								checked={addOnsFormik.values.largerStorage}
								type="checkbox"
								id="storage"
								name="largerStorage"
								value={addOnsFormik.values.largerStorage}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Larger storage</h3>
								<p>Extra 1TB of cloud save</p>
							</div>
							<span>+$2/monthly</span>
						</label>
						<label
							htmlFor="profile"
							className="add-ons profile"
							tabIndex={0}
							onBlur={(e) => handleBlur(e)}
							onFocus={(e) => handleFocus(e)}
							onClick={
								addOnsFormik.values.customizableProfile
									? profileRef.current?.parentElement.classList.add("active")
									: profileRef.current?.parentElement.classList.remove("active")
							}
						>
							<input
								ref={profileRef}
								type="checkbox"
								checked={addOnsFormik.values.customizableProfile}
								id="profile"
								name="customizableProfile"
								value={addOnsFormik.values.customizableProfile}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Customizable profile</h3>
								<p>custom theme on your profile</p>
							</div>
							<span>+$2/monthly</span>
						</label>
					</div>
				</div>
			</form>
		</div>
	);
}
