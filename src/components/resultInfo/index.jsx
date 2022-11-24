import React from "react";

const ResultInfo = (props) => {
	return (
		<div className="d-flex justify-content-between" ref={props.aboutResult}>
			<p className="text-black-50">
				About {props.totalResults} result found
			</p>
			<p className="text-black-50  ">
				{props.currentPage} page of {props.totalPage} page
			</p>
		</div>
	);
};
export default ResultInfo;
