import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { router, store }  from './index.js';
import { clear, getMovies, getMovie } from './state/actions.js';

import { MovieBase } from './movie-base.js';
import { store } from './store.js'
import {  autorun } from "https://unpkg.com/mobx@latest?module"
import './movie-list.js';
import './movie-details.js';
import './a-spinner.js';
class MovieContainer extends MovieBase {
  
  static get properties() {
    return { 
      search: { attribute: false, type: String },
      movie: { attribute: false, type: Object },
      movies: { attribute: false, type: Array },
      isLoading: { attribute: false, type: Boolean },
      location: { type: Object } /* vaadin router location */
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // mobx: sync local properties to store values
    this.disposer = autorun( () => {
      this.search = store.search;
      this.movie = store.movie;
      this.movies = store.movies;
      this.isLoading = store.isLoading; 
      this.location = router.location
    })
  }
  
  disconnectedCallback() {
    this.disposer();
  }

  _search(e) {
    if (e.key === 'Enter') {
      store.search = e.target.value;
      store.getMovies();
    }
  }
 
  render() {
    return html`
      <h4 class="mb-4 mt-2">Movie Search</h4>
      
      <movie-details .movie="${this.movie}"></movie-details>

      <div class="row">
        <input class="col-6 " .value="${this.search}" @keydown="${ (e) => this._search(e) }" placeholder="search....">
        <button class="btn btn-warning btn-rounded col-1 mx-3" @click="${(e)=> store.clear()}">Clear</button>
       </div>

      <div class="mt-4 mb-4 w-50 mx-auto">
        <a-spinner class="mt-4 mb-4" .loading="${this.isLoading}"></a-spinner>
      </div>

      <!-- attribute @view is an event handler for custom event 'view' emitted by movie-list -->
      <!-- and provides a more decoupled relationship between movie-app and movie-list -->
       <movie-list .movies="${this.movies}" @view="${(e) => store.getMovie(e.detail.id)}"></movie-list> 
      
    `;
  }
}

window.customElements.define('movie-container', MovieContainer);

