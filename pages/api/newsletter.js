import { emailRegex } from '../../helpers/api-utils';
import { connectDatabase, insertDocument } from '../../helpers/database-utils';

async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;
		if (!userEmail || !emailRegex.test(userEmail)) {
			res.status(422).json({ message: 'Invalid email address.' });
			return;
		}

		let client;
		try {
			client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Connecting to the database failed!' });
			return;
		}
		try {
			await insertDocument(client, 'newsletter', { email: userEmail });
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed!' });
			return;
		} finally {
			client.close();
		}

		res.status(201).json({ message: 'Signed up!' });
	}
}

export default handler;
