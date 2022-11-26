import React from "react";
import data from "../../data.json";
const newsCategories = data.newsCategories;
console.log(newsCategories, "newsCategories  ");

class Header extends React.Component {
	state = {
		searchTerm: "",
	};

	handleChange = (e) => {
		this.setState({
			searchTerm: e.target.value,
		});
	};
	handleKeyPress = (event) => {
		if (event.key === "Enter") {
			this.props.search(this.state.searchTerm);
		}
	};

	render() {
		let { category } = this.props;
		category = category ? category : ["top"];
		console.log(category, "this . props ");
		return (
			<div className="my-4">
				<p className="lead">
					<span className="badge bg-info text-dark"> Api: </span>{" "}
					{process.env.REACT_APP_NEWS_URL}
				</p>
				<h2 className="mb-3 fw-light text-center">News App Headline</h2>
				<input
					// ref={this.inputFocus}
					ref={this.props.ref}
					type="search"
					className="form-control"
					placeholder="Search Your favorite news "
					value={this.state.searchTerm}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
				/>
				<div className="my-4">
					{newsCategories &&
						Object.keys(newsCategories).map((item) => {
							if (category.includes(newsCategories[item])) {
								return (
									<button
										key={item}
										className="btn btn-sm btn-warning mr-2 mb-2 "
										onClick={() =>
											this.props.changeCategory(newsCategories[item])
										}
									>
										{newsCategories[item]}
									</button>
								);
							} else {
								return (
									<button
										key={item}
										className="btn btn-sm btn-light mr-2 mb-2 "
										onClick={() =>
											this.props.changeCategory(newsCategories[item])
										}
									>
										{newsCategories[item]}
									</button>
								);
							}
						})}
				</div>
			</div>
		);
	}
}

export default React.forwardRef((props, ref) => (
	<Header {...props} ref={ref} />
));
