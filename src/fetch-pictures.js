const API_KEY = `27577235-c9daade09bc67e8d645cf910b`;
const BASE_URL = `https://pixabay.com/api/`;

export default class API {
  constructor() {
    this.elSearch = '';
    this.page = 1;
  }

  fetchPictures() { 
    console.log(this);
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.elSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`;

    return fetch(url).then(response => response.json()).then(({hits}) => {
      this.page += 1;
      return hits;
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
  return this.elSearch
  }
  
  set query(newQuery) {
    this.elSearch = newQuery;
  }
}