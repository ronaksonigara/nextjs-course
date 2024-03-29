import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/database-utils';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
	const { featuredEvents } = props;

	if (!featuredEvents) {
		<div>Loading...</div>;
	}

	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve...'
				/>
			</Head>
			<NewsletterRegistration />
			<EventList items={featuredEvents} />
		</div>
	);
}

export default HomePage;

export async function getStaticProps() {
	const events = await getFeaturedEvents();
	return {
		props: {
			featuredEvents: events
		},
		revalidate: 30
	};
}
