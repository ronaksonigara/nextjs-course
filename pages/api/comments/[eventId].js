import { emailRegex } from '../../../helpers/api-utils';

function handler(req, res) {
	const eventId = req.query.eventId;

	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		if (!email || !emailRegex.test(email) || !name?.trim() || !text?.trim()) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}

		const newComment = {
			id: new Date().toISOString(),
			email,
			name,
			text
		};
		res.status(201).json({ message: 'Added comment', comment: newComment });
	}
	if (req.method === 'GET') {
		const dummyList = [
			{ id: 'c1', name: 'foo', text: 'comment 1' },
			{ id: 'c2', name: 'bar', text: 'comment 2' }
		];
		res.status(200).json({ comments: dummyList });
	}
}

export default handler;
