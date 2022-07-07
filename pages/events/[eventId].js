import Head from 'next/head';
import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import ErrorAlert from '../../components/ui/error-alert';

import { getEventDetail, getFeaturedEvents } from '../../helpers/api-utils';

function EventDetailPage(props) {
	const { event } = props;

	if (!event) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
			// <ErrorAlert>
			// 	<p>No event found!</p>
			// </ErrorAlert>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name='description' content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
}

export default EventDetailPage;

export async function getStaticPaths() {
	const featuredEvents = await getFeaturedEvents();
	const ids = featuredEvents.map((event) => event.id);

	const pathParams = ids.map((id) => ({ params: { eventId: id } }));

	return {
		paths: pathParams,
		fallback: 'blocking'
		// fallback: true
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const eventId = params.eventId;

	const eventData = await getEventDetail(eventId);

	if (!eventData) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			event: eventData
		},
		revalidate: 30
	};
}
