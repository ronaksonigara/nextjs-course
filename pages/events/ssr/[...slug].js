import { Fragment, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
import Head from 'next/head';
import { getFilteredEvents } from '../../../helpers/database-utils';
import EventList from '../../../components/events/event-list';
import ResultsTitle from '../../../components/events/results-title';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components/ui/error-alert';

function FilteredEventsPage(props) {
	const { filteredEvents, hasError, date } = props;

	// const [loadedEvents, setLoadedEvents] = useState();

	// const router = useRouter();

	// const filterData = router.query.slug;
	// const fetcher = (url) => fetch(url).then((res) => res.json());
	// const { data, error, isValidating } = useSWR('/api/events', fetcher);

	// useEffect(() => {
	// 	if (data) {
	// 		const events = data.events.map((event) => ({
	// 			...event,
	// 			id: event.eventId
	// 		}));
	// 		// for (const key in data) {
	// 		// 	events.push({
	// 		// 		id: key,
	// 		// 		...data[key]
	// 		// 	});
	// 		// }
	// 		setLoadedEvents(events);
	// 	}
	// }, [data]);

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name='description' content={`A list of filtered events.`} />
		</Head>
	);

	// if (!loadedEvents) {
	// 	return (
	// 		<Fragment>
	// 			{pageHeadData}
	// 			<p className='center'>Loading...</p>
	// 		</Fragment>
	// 	);
	// }

	// const filteredYear = filterData[0];
	// const filteredMonth = filterData[1];

	// const numYear = +filteredYear;
	// const numMonth = +filteredMonth;

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				name='description'
				content={`All events for ${date?.month}/${date?.year}.`}
			/>
		</Head>
	);

	if (
		isNaN(date?.year) ||
		isNaN(date?.month) ||
		// date?.numYear > 2030 ||
		// date?.numYear < 2021 ||
		// numMonth < 1 ||
		// numMonth > 12 ||
		hasError
	) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	// const filteredEvents = loadedEvents.filter((event) => {
	// 	const eventDate = new Date(event.date);
	// 	return (
	// 		eventDate.getFullYear() === numYear &&
	// 		eventDate.getMonth() === numMonth - 1
	// 	);
	// });

	if (!filteredEvents || filteredEvents?.length === 0) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const dateValue = new Date(date?.year, date?.month - 1);

	return (
		<Fragment>
			{pageHeadData}
			<ResultsTitle date={dateValue} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth)
		// ||
		// numYear > 2030 ||
		// numYear < 2021 ||
		// numMonth < 1 ||
		// numMonth > 12
	) {
		return {
			props: {
				hasError: true
			}
			// notFound: true
			// redirect: {
			// 	destination: '/error'
			// }
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	return {
		props: {
			filteredEvents: filteredEvents,
			date: {
				year: numYear,
				month: numMonth
			}
		}
	};
}
