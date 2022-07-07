export async function getAllEvents() {
	const response = await fetch(
		'https://nextjs-course-9904f-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
	);
	let data = await response.json();
	const events = [];
	for (const key in data) {
		events.push({
			id: key,
			...data[key]
		});
	}
	return events;
}

export async function getFeaturedEvents() {
	const response = await fetch(
		'https://nextjs-course-9904f-default-rtdb.asia-southeast1.firebasedatabase.app/events.json?orderBy="isFeatured"&equalTo=true'
	);
	let data = await response.json();
	const events = [];
	for (const key in data) {
		events.push({
			id: key,
			...data[key]
		});
	}
	return events;
}

export async function getEventDetail(eventId) {
	const response = await fetch(
		`https://nextjs-course-9904f-default-rtdb.asia-southeast1.firebasedatabase.app/events/${eventId}.json`
	);
	let data = await response.json();
	if (!data) {
		return null;
	}
	return {
		...data,
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
