import { MongoClient } from 'mongodb';

// Connection URL
const url = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@${process.env.NEXT_PUBLIC_MONGO_CLUSTER}.${process.env.NEXT_PUBLIC_MONGO_CLUSTER_ID}.mongodb.net/events?retryWrites=true&w=majority`;

export async function connectDatabase() {
	const client = new MongoClient(url);
	return await client.connect();
}

export async function insertDocument(client, collectionName, document) {
	const db = client.db();
	const collection = db.collection(collectionName);
	const result = await collection.insertOne(document);
	return result;
}

export async function getAllDocuments(client, collectionName, sort, query) {
	const db = client.db();
	const collection = db.collection(collectionName);
	const result = await collection.find(query).sort(sort).toArray();
	return result;
}

export async function getAllEvents(queryParams = {}) {
	const client = await connectDatabase();

	const result = await getAllDocuments(
		client,
		'events',
		{ _id: -1 },
		{ ...queryParams }
	);

	const events = result.map((event) => ({
		id: event.eventId,
		...event
	}));
	client.close();

	return JSON.parse(JSON.stringify(events));
}

export async function getFeaturedEvents() {
	const events = await getAllEvents({ isFeatured: true });
	console.log(events);
	return JSON.parse(JSON.stringify(events));
}

export async function getEventDetail(eventId) {
	const client = await connectDatabase();
	let result = await getAllDocuments(
		client,
		'events',
		{ _id: -1 },
		{ eventId: eventId }
	);

	result = JSON.parse(JSON.stringify(result));

	const data = result?.[0] || null;

	client.close();
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
