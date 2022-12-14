import React from "react";
import News from "../news";
import Header from "../components/header";
import ResultInfo from "../components/resultInfo";
import NewsList from "../components/newsList";
import Pagination from "../components/pagination";
import Loading from "../components/loading";
import data from "../data.json";
const news = new News(data.newsCategories.top); // newsCategory.technology
class App extends React.Component {
	state = {
		data: {},
		isLoading: true,
	};

	aboutResult = React.createRef();
	jombutronref = React.createRef();
	searchRef = React.createRef();
	cbRef = null;
	itemRefList = [];

	changeCategory = (category) => {
		this.setState({ isLoading: true });
		news
			.changeCategory(category)
			.then((data) => {
				this.setState({ data, isLoading: false });
			})
			.catch((error) => {
				console.log(error);
				this.setState({ isLoading: false });
			});
	};
	search = (searchTerm) => {
		this.setState({ isLoading: true });
		news
			.search(searchTerm)
			.then((data) => {
				this.setState({ data, isLoading: false });
			})
			.catch((error) => {
				console.log(error);

				this.setState({ isLoading: false });
			});
	};

	componentDidMount() {
		news
			.getNews()
			.then((data) => {
				this.setState({ data: data, isLoading: false });
			})
			.catch((error) => {
				console.log(
					error,
					news._getURL(),
					" error from getNews line 56 file name app.jsx"
				);

				this.setState({ isLoading: false });
			});
	}
	componentDidUpdate() {}
	next = () => {
		if (this.state.data.isNext) {
			this.setState({
				isLoading: true,
			});
			news
				.next()
				.then((data) => {
					this.setState({ data, isLoading: false });
				})
				.catch((error) => {
					console.log(error);

					this.setState({ isLoading: false });
				});
		}
	};
	prev = () => {
		if (this.state.data.isPrev) {
			this.setState({
				isLoading: true,
			});
			news
				.prev()
				.then((data) => {
					this.setState({ data: data, isLoading: false });
				})
				.catch((error) => {
					console.log(error);

					this.setState({ isLoading: false });
				});
		}
	};

	handlePageChange = (value) => {
		this.setState({
			data: {
				...this.state.data,
				currentPage: Number.parseInt(value),
			},
		});
	};
	gotoPage = () => {
		this.setState({
			isLoading: true,
		});
		news
			.setCurrentPage(this.state.data.currentPage)
			.then((data) => {
				this.setState({ data, isLoading: false });
			})
			.catch((error) => {
				this.setState({ isLoading: false });
			});
	};
	gotoTop = () => {
		window.scroll(0, this.aboutResult.current.scrollTop);
	};
	// refCallback = (element) => {
	// 	this.cbRef = element;
	// };

	render() {
		const {
			articles,
			isNext,
			isPrev,
			category,
			totalResults,
			currentPage,
			totalPage,
		} = this.state.data;
		console.log(this.state.data, "state data from app.jsx file ");
		return (
			<div className="container">
				<h2 className=" display-3 text-center"> News App </h2>
				<Header
					category={category}
					changeCategory={this.changeCategory}
					search={this.search}
					ref={this.searchRef}
				/>
				<div ref={this.aboutResult}>
					<ResultInfo
						// ref={this.aboutResult}
						currentPage={currentPage}
						totalPage={totalPage}
						totalResults={totalResults}
					/>
				</div>
				{this.state.isLoading ? (
					<Loading />
				) : (
					<div>
						<NewsList news={articles} ref={this.itemRefList} />
						<Pagination
							next={this.next}
							prev={this.prev}
							isNext={isNext}
							isPrev={isPrev}
							totalPage={totalPage}
							currentPage={currentPage}
							handlePageChange={this.handlePageChange}
							gotoPage={this.gotoPage}
						/>
					</div>
				)}
				<button className="btn btn-primary my-5" onClick={this.gotoTop}>
					Go to top
				</button>
			</div>
		);
	}
}
export default App;
