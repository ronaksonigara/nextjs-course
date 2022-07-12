import { MongoClient } from 'mongodb';

// Connection URL
const url =
	'mongodb+srv://ronak_nodejs_course:i4oeOmpzgRbJ0Ajq@cluster0.si9wk.mongodb.net/events?retryWrites=true&w=majority';

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

export async function getAllDocuments(client, collectionName, sort) {
	const db = client.db();
	const collection = db.collection(collectionName);
	const result = await collection.find().sort(sort).toArray();
	return result;
}
