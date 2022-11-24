import React from "react";

const newsItem = React.forwardRef(({ item }, ref) => {
	return (
		<div ref={(element) => ref.push(element)} className="card">
			{/* image  */}
			{item.urlToImage && (
				<figure class="figure">
					<img
						className="card-image-top figure-img img-fluid rounded"
						src={item.urlToImage}
						alt={item.title}
					/>
				</figure>
			)}
			{/* card body  */}
			<div className="card-body">
				<a
					className="my-3 lead text-decoration-none"
					href={item.url}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#424242" }}
				>
					<h5 className="card-title my-3"> {item.title} </h5>
				</a>
				<a
					className="my-3 lead text-decoration-none"
					href={item.url}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#424242" }}
				>
					{item.content}
				</a>
				<div className="d-flex align-items-center mt-2">
					<small>
						<strong>
							Publishe at{" "}
							<span className="text-info">
								{new Date(item.publishedAt).toDateString()}
							</span>
						</strong>
					</small>
					<div className="ml-auto p-2 rounded d-inline-block">
						<small> {item.source.name} </small>
					</div>
				</div>
			</div>
		</div>
	);
});

export default newsItem;
