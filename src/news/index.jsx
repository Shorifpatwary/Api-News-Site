import axios from "../utils/axios";

export const newsCategory = {
	technology: "technology",
	science: "science",
	business: "business",
	entertainment: "entertainment",
	general: "general",
	health: "health",
	sports: "sports",
};
const MAX_ITEM_PER_PAGE = 20;

export default class News {
	constructor(category) {
		this._category = category;
		this._searchTerm = "";
		this._pageSize = MAX_ITEM_PER_PAGE;
		this._currentPage = 1;
		this._totalPage = 1;
	}

	// get new articles from API
	async getNews() {
		try {
			const { data } = await axios.get(this._getURL());
			console.log(data);
			this._totalPage = Math.ceil(data.totalResults / this._pageSize);
			return {
				articles: data.articles,
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
	// go to previus page when click the prev button in pagination
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
		this._category = category;
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
		let url = "/?";
		if (this._category) {
			url += `category=${this._category}`;
		}
		if (this._searchTerm) {
			url += `&q=${this._searchTerm}`;
		}
		if (this._pageSize) {
			url += `&pageSize=${this._pageSize}`;
		}
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
