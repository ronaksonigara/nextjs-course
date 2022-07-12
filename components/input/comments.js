import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
	const { eventId } = props;
	const notificationCtx = useContext(NotificationContext);

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isFetchingComments, setISFetchingComments] = useState(false);

	useEffect(() => {
		setISFetchingComments(true);
		fetch(`/api/comments/${eventId}`)
			.then((response) => response.json())
			.then((data) => {
				setComments(data.comments);
				setISFetchingComments(false);
			});
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		notificationCtx.showNotification({
			title: 'Sending comment',
			message: 'Your comment is currently being stoed into database',
			status: 'pending'
		});
		// send data to API
		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData.data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				return response.json().then((data) => {
					throw new Error(data?.message || 'Something went wrong.');
				});
			})
			.then((data) => {
				setComments((prevComment) => [data.comment, ...prevComment]);
				commentData.onSuccess();
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Successfully comment was Saved.',
					status: 'success'
				});
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message: error?.message || 'Something went wrong.',
					status: 'error'
				});
			});
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isFetchingComments && <CommentList items={comments} />}
			{showComments && isFetchingComments && <div>Loading...</div>}
		</section>
	);
}

export default Comments;
