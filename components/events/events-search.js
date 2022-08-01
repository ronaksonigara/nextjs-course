import { useRef } from 'react';

import Button from '../ui/button';
import classes from './events-search.module.css';

function EventsSearch(props) {
	const yearMonthInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();
		const yearMonth = yearMonthInputRef.current.value?.split('-');
		const selectedYear = yearMonth[0];
		const selectedMonth = yearMonth[1];

		props.onSearch(selectedYear, selectedMonth);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor='year'>Year-Month</label>
					{/* <select id='year' ref={yearMonthInputRef}>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
					</select> */}

					<input
						type='month'
						name='year'
						id='year'
						ref={yearMonthInputRef}
						required='required'
						title=''
					/>
				</div>
				{/* <div className={classes.control}>
					<label htmlFor='month'>Month</label>
					<select id='month' ref={monthInputRef}>
						<option value='1'>January</option>
						<option value='2'>February</option>
						<option value='3'>March</option>
						<option value='4'>April</option>
						<option value='5'>May</option>
						<option value='6'>June</option>
						<option value='7'>July</option>
						<option value='8'>August</option>
						<option value='9'>Septemer</option>
						<option value='10'>October</option>
						<option value='11'>November</option>
						<option value='12'>December</option>
					</select>
				</div> */}
			</div>
			<Button>Find Events</Button>
		</form>
	);
}

export default EventsSearch;
