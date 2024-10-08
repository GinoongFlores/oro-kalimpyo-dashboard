import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ResetPassword = () => {
	const { Formik } = formik;

	const schema = yup.object().shape({
		email: yup.string().email("Invalid email").required("No Email Provided"),
	});

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values) => {
					sendPasswordResetEmail(auth, values.email)
						.then(() => {
							toast.success("Email sent successfully");
						})
						.catch((error) => {
							setError(error);
							toast.error(error.code, error.message);
						});
				}}
				initialValues={{
					email: "",
				}}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter the email to reset password"
								name="email"
								values={values.email}
								autoComplete="email"
								onChange={handleChange}
								isValid={touched.email && !errors.email}
								isInvalid={!!errors.email}
								aria-describedby="emailHelpBlock"
							/>
							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
							<Form.Text id="emailHelpBlock" muted>
								After you enter your email address, you will receive an email
								with a link to reset your password.
							</Form.Text>
						</Form.Group>
						<div className="flex justify-center">
							<Button variant="success" type="submit">
								Reset
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ResetPassword;
