import React from "react";

const ResultInfo = (props) => {
	return (
		<div className="d-flex justify-content-between" ref={props.aboutResult}>
			<p className="text-black-50">
				About{" "}
				<span className="badge bg-info text-dark">{props.totalResults}</span>{" "}
				result found
			</p>
			<p className="badge bg-info text-dark">
				{props.currentPage} page of {props.totalPage} page
			</p>
		</div>
	);
};
export default ResultInfo;
