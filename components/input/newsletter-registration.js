import classes from './newsletter-registration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {
	const emailInputRef = useRef();

	function registrationHandler(event) {
		event.preventDefault();
		const emailValue = emailInputRef.current.value;
		console.log(emailValue);
		// fetch user input (state or refs)
		// optional: validate input
		// send valid data to API
		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: emailValue }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						ref={emailInputRef}
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
