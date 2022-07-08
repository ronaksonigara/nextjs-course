import classes from './comment-list.module.css';

function CommentList({ items }) {
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			{items.map((comment) => (
				<li key={comment.id}>
					<p>{comment.text}</p>
					<div>
						By <address>{comment.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
