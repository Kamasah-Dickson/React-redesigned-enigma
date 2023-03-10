import "./personal-info.scss";

export default function Personal_info({ formik, step, headStep }) {
	return (
		<>
			<h1>{headStep[step].h1}</h1>
			<p>{headStep[step].p}</p>
			<form id="myForm" onSubmit={formik.handleSubmit}>
				<label htmlFor="name">
					<p>Name</p>
					<p className="error-desktop">{formik.errors.name}</p>
				</label>
				<input
					id="name"
					type="text"
					value={formik.values.name}
					name="name"
					onChange={formik.handleChange}
					onBlur={formik.handleChange}
					placeholder="e.g Kamasah Dickson"
				/>
				{formik.touched.name && formik.errors.name && (
					<p className="error">{formik.errors.name}</p>
				)}

				<label htmlFor="email">
					<p>Email address</p>
					<p className="error-desktop">{formik.errors.email}</p>
				</label>
				<input
					id="email"
					type="email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleChange}
					placeholder="e.g kamasahdickson19@gmail.com"
				/>
				{formik.touched.email && formik.errors.email && (
					<p className="error">{formik.errors.email}</p>
				)}

				<label htmlFor="phone">
					<p>phone number</p>
					<p className="error-desktop">{formik.errors.phone}</p>
				</label>
				<input
					id="phone"
					type="text"
					name="phone"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleChange}
					placeholder="e.g +233594571065"
				/>
				{formik.touched.phone && formik.errors.phone && (
					<p className="error">{formik.errors.phone}</p>
				)}
			</form>
		</>
	);
}
