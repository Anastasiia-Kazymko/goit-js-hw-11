import './sass/main.scss';
import Notiflix from 'notiflix';
//import axios from 'axios';
//import SimpleLightbox from "simplelightbox";
//import "simplelightbox/dist/simple-lightbox.min.css";
import API from './fetch-pictures';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

const api = new API();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

hideLoadMoreBtn();

function onSearch(e) {
    e.preventDefault();    
    
    api.query = e.currentTarget.elements.searchQuery.value.trim();
    
    api.resetPage();
    api.fetchPictures().then(hits => {
        clearHitsContainer();
        appendHitsMarkup(hits)
        showLoadMoreBtn();
    });
};

function onLoadMore() {   
    hideLoadMoreBtn();
    api.fetchPictures().then(hits => {
        appendHitsMarkup(hits)
        showLoadMoreBtn();
    });
}

function appendHitsMarkup(hits) {
    const pictures = hits.map((picture) => `<div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width="300" height="200"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${picture.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${picture.downloads}</b>
    </p>
  </div>
</div>`).join("");
        refs.gallery.insertAdjacentHTML('beforeend', pictures); 
}

function hideLoadMoreBtn() {
    refs.loadMoreBtn.classList.add("is-hidden");
}

function showLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove("is-hidden");
}

function clearHitsContainer() {
    refs.gallery.innerHTML = '';
}