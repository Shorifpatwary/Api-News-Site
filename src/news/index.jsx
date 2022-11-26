const MAX_ITEM_PER_PAGE = 10; // if your want to increase this amount you will have to increase page number also .

export default class News {
	constructor(category = "top") {
		this._category = [category];
		this._searchTerm = "";
		this._pageSize = MAX_ITEM_PER_PAGE;
		this._currentPage = 1;
		this._totalPage = 1;
	}

	// get new articles from API
	async getNews() {
		try {
			const response = fetch(this._getURL());

			const data = await (await response).json();

			console.log(data, "data from get news class ");
			this._totalPage = Math.ceil(data.totalResults / this._pageSize);
			return {
				articles: data.results,
				isNext: this._isNext(),
				isPrev: this._isPrev(),
				totalPage: this._totalPage,
				currentPage: this._currentPage,
				category: this._category,
				totalResults: data.totalResults,
			};
		} catch (error) {
			throw new Error(error);
		}
	}
	// go to next page when click the next button in pagination
	next() {
		if (this._isNext()) {
			this._currentPage++;
			return this.getNews();
		}
		return false;
	}
	// go to previous page when click the prev button in pagination
	prev() {
		if (this._isPrev()) {
			this._currentPage--;
			return this.getNews();
		}
		return false;
	}
	// set Current page in the parent state
	setCurrentPage(pageNumber) {
		if (pageNumber < 1 && pageNumber > this.totalPage) {
			throw new Error("Invalid page number ");
		} else {
			this._currentPage = pageNumber;
			return this.getNews();
		}
	}
	//  change category in the parent state
	changeCategory(category) {
		if (this._category.includes(category)) {
			// if (this._category.length > 1) {
			// 	const categoryIndex = this._category.indexOf(category);
			// 	console.log(categoryIndex, "category index ");
			// 	this._category.slice(categoryIndex, 1);
			// } else {
			// 	alert("minimum 1 category required ");
			// }
		} else {
			if (this._category.length <= 5) {
				this._category = [...this._category, category];
			} else {
				alert("This api doesn't allow to filter upto 5 categories ");
			}
		}
		this._currentPage = 1;
		return this.getNews();
	}
	// search something and set parent state -> search value
	search(searchTerm) {
		this._searchTerm = searchTerm;
		return this.getNews();
	}
	// make url method
	_getURL() {
		let url = `${process.env.REACT_APP_NEWS_URL}?apikey=${process.env.REACT_APP_NEWS_API_KEY}`;
		if (this._category) {
			url += `&category=${this._category}`;
		}
		if (this._searchTerm) {
			url += `&q=${this._searchTerm}`;
		}
		// if (this._pageSize) {
		// 	url += `&pageSize=${this._pageSize}`;
		// }
		if (this._currentPage) {
			url += `&page=${this._currentPage}`;
		}
		return url;
	}
	_isNext() {
		return this._currentPage < this._totalPage;
	}
	_isPrev() {
		return this._currentPage > 1;
	}
}
