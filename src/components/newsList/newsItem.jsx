import React from "react";

const newsItem = React.forwardRef(({ item }, ref) => {
	return (
		<div ref={(element) => ref.push(element)} className="card">
			{/* image  */}
			{item.image_url && (
				<figure class="figure">
					<img
						className="card-image-top figure-img img-fluid rounded"
						src={item.image_url}
						placeholder="https://via.placeholder.com/1200x900.png?text=Visit+News.com+Buyers+GuideC"
						alt={item.title}
					/>
				</figure>
			)}
			{/* card body  */}
			<div className="card-body">
				<a
					className="my-3 lead text-decoration-none"
					href={item.link}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#424242" }}
				>
					<h5 className="card-title my-3"> {item.title} </h5>
				</a>
				<a
					className="my-3 lead text-decoration-none"
					href={item.link}
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
								{new Date(item.pubDate).toDateString()}
							</span>
						</strong>
					</small>
					<div className="ml-auto p-2 rounded d-inline-block">
						<small> {item.source_id} </small>
					</div>
				</div>
			</div>
		</div>
	);
});

export default newsItem;
