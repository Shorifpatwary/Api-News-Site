import React from "react";
import NewsItem from "./newsItem";
const NewsList = React.forwardRef(({ news }, ref) => {
	return (
		<div className="">
			{news && news.length === 0 && <h4> There is no News </h4>}
			<div className="d-flex flex-column gap-10 newsItem__wrapper">
				{news &&
					news.map((item) => (
						<NewsItem ref={ref} key={item.title} item={item} />
					))}
			</div>
		</div>
	);
});

export default NewsList;
