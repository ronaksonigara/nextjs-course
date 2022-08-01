import { useRef, useContext } from 'react';
import classes from './form-event.module.css';
import NotificationContext from '../../store/notification-context';
import { useRouter } from 'next/router';

function FormEvent() {
	const router = useRouter();

	const notificationCtx = useContext(NotificationContext);

	const title = useRef();
	const description = useRef();
	const location = useRef();
	const image = useRef();
	const date = useRef();
	const featured = useRef();

	const onSubmitForm = (event) => {
		event.preventDefault();
		notificationCtx.showNotification({
			title: 'Sending Event',
			message: 'Your event is currently being stored into database',
			status: 'pending'
		});
		const payload = {
			title: title.current.value,
			description: description.current.value,
			image: image.current.value,
			isFeatured: featured.current.checked,
			location: location.current.value,
			date: date.current.value
		};

		fetch(`/api/events`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				return response.json().then((data) => {
					throw new Error(data?.message || 'Something went wrong.');
				});
			})
			.then((data) => {
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Successfully event was Saved.',
					status: 'success'
				});
				router.replace('/events');
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message: error?.message || 'Something went wrong.',
					status: 'error'
				});
			});
	};

	return (
		<>
			<form className={classes.form} onSubmit={onSubmitForm}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='title'>Title</label>
						<input
							ref={title}
							type='text'
							name='title'
							id='title'
							required='required'
							placeholder='Title'
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='description'>Description</label>
						<textarea
							ref={description}
							placeholder='Description'
							name='description'
							id='description'
							rows='5'
							cols='50'
							required='required'></textarea>
					</div>
					<div className={classes.control}>
						<label htmlFor='location'>Address</label>
						<textarea
							ref={location}
							placeholder='Address'
							name='location'
							id='location'
							rows='5'
							cols='50'
							required='required'></textarea>
					</div>
					<div className={classes.control}>
						<label htmlFor='image'>Image Url</label>
						<input
							ref={image}
							placeholder='Image Url'
							type='url'
							name='image'
							id='image'
							required='required'
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='date'>Date</label>
						<input
							ref={date}
							type='date'
							name='date'
							id='date'
							required='required'
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='checkbox'>Featured</label>
						<input
							ref={featured}
							type='checkbox'
							name='checkbox'
							id='checkbox'
						/>
					</div>
				</div>

				<button>Submit</button>
			</form>
		</>
	);
}

export default FormEvent;
