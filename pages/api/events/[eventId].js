import {
	connectDatabase,
	getAllDocuments
} from '../../../helpers/database-utils';

async function handler(req, res) {
	const eventId = req.query.eventId;
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed!' });
		return;
	}

	if (req.method === 'GET') {
		try {
			const result = await getAllDocuments(
				client,
				'events',
				{ _id: -1 },
				{ eventId: eventId }
			);
			res.status(200).json({ event: result?.[0] || null });
		} catch (error) {
			res.status(500).json({ message: 'Getting events failed!' });
		}
	}

	client.close();
}
export default handler;
