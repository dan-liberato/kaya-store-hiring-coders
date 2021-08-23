import React, { useState } from "react";
import axios from "axios";
// import { useCssHandles } from 'vtex.css-handles'

import styles from "./styles.css";
// const CSS_HANDLES = ['container', 'content', 'background', 'text', 'item'] as const

interface InputPlaceholdersProps {
	name?: string;
	email?: string;
	phone?: string;
}

interface FormProps {
	title: string;
	imageUrl: string;
	imageAlt: string;
	placeholders: InputPlaceholdersProps;
}

const LeadsModalForm: StorefrontFunctionComponent<FormProps> = ({
	title,
	imageUrl,
	imageAlt,
	placeholders,
}) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const { name, email, phone } = formData;
		const saveLead = await axios
			.post(
				"https://rhohdg10tj.execute-api.us-east-1.amazonaws.com/coupon/leads",
				{
					data: JSON.stringify({
						name,
						email,
						phone,
					}),

					status: 200,
					headers: {
						"Access-Control-Allow-Origin": "*",
						// 		"Content-Type": "application/json",
						// 		// "x-api-key": "O5G5okeOR17sjYWJbDHik6pO0Bma22q3LT12H8G5",
					},
				}
			)
			.then((response) => response);
		console.log(saveLead.data);
	};

	return (
		<div className={styles.container}>
			<div>
				<h3 className={styles.title}>{title}</h3>
			</div>
			<div className={styles.content}>
				<div className={styles.containerImage}>
					<img
						src={imageUrl}
						alt={imageAlt}
						className={styles.imageBanner}
					/>
				</div>

				<div className={styles.containerForm}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.formField}>
							<input
								type="text"
								name="name"
								onChange={onChange}
								placeholder={placeholders.name}
								className={styles.formInput}
								required
							/>
						</div>
						<div className={styles.formField}>
							<input
								type="email"
								name="email"
								onChange={onChange}
								placeholder={placeholders.email}
								className={styles.formInput}
								required
							/>
						</div>
						<div className={styles.formField}>
							<input
								type="text"
								name="phone"
								onChange={onChange}
								placeholder={placeholders.phone}
								className={styles.formInput}
								required
							/>
						</div>

						<button
							type="submit"
							className={styles.formButton}
							disabled
						>
							Quero o meu cupom!
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

LeadsModalForm.schema = {
	title: "editor.leadsModalForm.title",
	description: "editor.leadsModalForm.description",
	type: "object",
	properties: {},
};
export default LeadsModalForm;
