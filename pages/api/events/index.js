import {
	connectDatabase,
	insertDocument,
	getAllDocuments
} from '../../../helpers/database-utils';

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed!' });
		return;
	}

	if (req.method === 'POST') {
		const { title, description, image, isFeatured, location, date } = req.body;

		const newEvent = {
			title,
			description,
			image,
			isFeatured,
			location,
			date,
			eventId: title.toLowerCase().trim().replaceAll(' ', '-')
		};

		try {
			const result = await insertDocument(client, 'events', newEvent);
			newEvent._id = result.insertedId;
			res.status(201).json({ message: 'Added Event', comment: newEvent });
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed!' });
		}
	}

	if (req.method === 'GET') {
		const queryParams = req.query;

		if (Object.keys(queryParams)) {
			if (queryParams.hasOwnProperty('isFeatured')) {
				queryParams.isFeatured =
					queryParams.isFeatured === 'true' ? true : false;
			}
		}
		try {
			const result = await getAllDocuments(
				client,
				'events',
				{ _id: -1 },
				{ ...queryParams }
			);
			res.status(200).json({ events: result });
		} catch (error) {
			res.status(500).json({ message: 'Getting events failed!' });
		}
	}

	client.close();
}
export default handler;
