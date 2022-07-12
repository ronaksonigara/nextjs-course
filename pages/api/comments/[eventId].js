import { emailRegex } from '../../../helpers/api-utils';
import {
	connectDatabase,
	insertDocument,
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
	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		if (!email || !emailRegex.test(email) || !name?.trim() || !text?.trim()) {
			res.status(422).json({ message: 'Invalid input' });
			client.close();
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId
		};

		try {
			const result = await insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;
			res.status(201).json({ message: 'Added comment', comment: newComment });
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed!' });
		}
	}
	if (req.method === 'GET') {
		try {
			const result = await getAllDocuments(client, 'comments', { _id: -1 });
			res.status(200).json({ comments: result });
		} catch (error) {
			res.status(500).json({ message: 'Getting comments failed!' });
		}
	}
	client.close();
}

export default handler;
