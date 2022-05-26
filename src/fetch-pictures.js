import axios from "axios";

const API_KEY = `27577235-c9daade09bc67e8d645cf910b`;
const BASE_URL = `https://pixabay.com/api/`;

export default class API {
  constructor() {
    this.elSearch = '';
    this.page = 1;
  }

  async fetchPictures() { 
    //console.log(this);
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.elSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return await axios.get(url).then(object => {
      console.log(object.data);
            this.pageIncrement();
            return {
                totalHits: object.data.totalHits,
                hits: object.data.hits,
            };
        })               
  }

  resetPage() {
    this.page = 1;
  }

  pageIncrement() {
        this.page += 1;
    }

  get query() {
  return this.elSearch
  }
  
  set query(newQuery) {
    this.elSearch = newQuery;
  }
}