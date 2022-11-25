import React, { Component } from "react";

class Pagination extends Component {
	state = {
		isEditable: false,
	};
	render() {
		const {
			next,
			prev,
			isNext,
			isPrev,
			totalPage,
			currentPage,
			handlePageChange,
			gotoPage,
		} = this.props;
		return (
			<div className="d-flex my-5 align-items-center">
				<button
					className="btn btn-warning"
					disabled={!isPrev}
					onClick={() => {
						prev();
					}}
				>
					Previous
				</button>
				<div className="flex-grow-1 text-center">
					{this.state.isEditable ? (
						<input
							type="number"
							value={currentPage}
							onChange={(e) => handlePageChange(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									gotoPage();
									this.setState({
										isEditable: false,
									});
								}
							}}
						/>
					) : (
						<p
							className="user-select-none"
							title="Double tap to Edit "
							onDoubleClick={() => {
								this.setState({
									isEditable: !this.state.isEditable,
								});
							}}
						>
							{currentPage} of {totalPage} pages
							<br />
							<small className="badge bg-info text-darks">
								{" "}
								Double Tap to Edit{" "}
							</small>
						</p>
					)}
				</div>

				<button
					className="btn btn-warning ms-auto"
					disabled={!isNext}
					onClick={() => {
						next();
					}}
				>
					Next
				</button>
			</div>
		);
	}
}
export default Pagination;
