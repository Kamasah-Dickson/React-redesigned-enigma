import React from "react";
import { useRef } from "react";
import "./add-ons.scss";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function Add_ons({
	headStep,
	step,
	addOnsFormik,
	plan,
	dispatch,
}) {
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
	}, [
		addOnsFormik.values.onlineService,
		addOnsFormik.values.largerStorage,
		addOnsFormik.values.customizableProfile,
	]);

	//Used an individual useEffect below instead of one big if else check
	//with one useEffect and all dependency. I chose an individual useEffect to
	//  help update the necessary state. I could have done the previous one above like below
	// but I wanted you to notice the difference .....just in case.

	useEffect(() => {
		if (addOnsFormik.values.onlineService) {
			dispatch({
				type: "SERVICES",
				payload: {
					name: "Online Service",
					price: plan ? 10 : 1,
				},
			});
		} else {
			dispatch({
				type: "SERVICES",
				payload: {
					name: "",
					price: "",
				},
			});
		}
	}, [addOnsFormik.values.onlineService, plan]);
	useEffect(() => {
		if (addOnsFormik.values.largerStorage) {
			dispatch({
				type: "STORAGE",
				payload: {
					name: "Larger storage",
					price: plan ? 20 : 2,
				},
			});
		} else {
			dispatch({
				type: "STORAGE",
				payload: {
					name: "",
					price: "",
				},
			});
		}
	}, [addOnsFormik.values.largerStorage, plan]);

	useEffect(() => {
		if (addOnsFormik.values.customizableProfile) {
			dispatch({
				type: "PROFILE",
				payload: {
					name: "Customizable Profile",
					price: plan ? 20 : 2,
				},
			});
		} else {
			dispatch({
				type: "PROFILE",
				payload: {
					name: "",
					price: "",
				},
			});
		}
	}, [addOnsFormik.values.customizableProfile, plan]);

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
							name="Online Service"
							tabIndex={0}
							onFocus={(e) => handleFocus(e)}
							onBlur={(e) => handleBlur(e)}
							onClick={
								addOnsFormik.values.onlineService
									? serviceRef.current?.parentElement.classList.add("active")
									: serviceRef.current?.parentElement.classList.remove("active")
							}
						>
							<Checkbox
								size="medium"
								className="checkbox"
								ref={serviceRef}
								id="service"
								checked={addOnsFormik.values.onlineService}
								name="onlineService"
								value={addOnsFormik.values.onlineService}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Online Service</h3>
								<p>Access to multiplayer games</p>
							</div>
							<span>{plan ? "+$10/yr" : "+$1/mo"}</span>
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
							<Checkbox
								className="checkbox"
								size="medium"
								id="storage"
								ref={storageRef}
								checked={addOnsFormik.values.largerStorage}
								type="checkbox"
								name="largerStorage"
								value={addOnsFormik.values.largerStorage}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Larger storage</h3>
								<p>Extra 1TB of cloud save</p>
							</div>
							<span>{plan ? "+$20/yr" : "+$2/mo"}</span>
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
							<Checkbox
								className="checkbox"
								size="medium"
								id="profile"
								ref={profileRef}
								type="checkbox"
								checked={addOnsFormik.values.customizableProfile}
								name="customizableProfile"
								value={addOnsFormik.values.customizableProfile}
								onChange={addOnsFormik.handleChange}
							/>
							<div className="title">
								<h3>Customizable profile</h3>
								<p>custom theme on your profile</p>
							</div>
							<span>{plan ? "+$20/yr" : "+$2/mo"}</span>
						</label>
					</div>
				</div>
			</form>
		</div>
	);
}
