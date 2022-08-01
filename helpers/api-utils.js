export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || '';

export async function getAllEvents() {
	const response = await fetch(`${BASE_URL}/api/events`);

	let data = await response.json();

	const events = data.events.map((event) => ({
		id: event.eventId,
		...event
	}));
	return events;
}

export async function getFeaturedEvents() {
	const response = await fetch(`${BASE_URL}/api/events?isFeatured=true`);

	let data = await response.json();

	const events = data.events.map((event) => ({
		id: event.eventId,
		...event
	}));

	return events;
}

export async function getEventDetail(eventId) {
	const response = await fetch(`${BASE_URL}/api/events/${eventId}`);
	let data = await response.json();
	console.log(data);
	if (!data.event) {
		return null;
	}
	return {
		...data.event,
		id: eventId
	};
}

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	const allEvents = await getAllEvents();

	let filteredEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

export const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
