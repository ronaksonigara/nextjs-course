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
