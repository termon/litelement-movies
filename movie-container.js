import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { router, store }  from './index.js';
import { clear, getMovies, getMovie } from './state/actions.js';

import { MovieBase } from './movie-base.js';
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

  constructor() {
    super();
    // don't need to initialise properties synced with store as this is done by stateChanged
    this.location = router.location
    this.search = ''
  }

  // Redux callback method to synchronise state changes with class properties
  stateChanged(state) {
    console.log('stateChanged', state)
    this.movie = state.movie 
    this.movies = state.movies
    this.isLoading = state.isLoading
  }

  _clear() {
    store.dispatch(clear())
    this.search = ''
  } 

  _getMovies(search) {
    store.dispatch(getMovies(search))
  }

  _getMovie(id) {
    store.dispatch(getMovie(id))
  }

  _search(e) {
    if (e.key === 'Enter') {
      this.search = e.target.value;
      this._getMovies(e.target.value);
    }
  }
 
  render() {
    return html`
      <h4 class="mb-4 mt-2">Movie Search</h4>
      
      <movie-details .movie="${this.movie}"></movie-details>

      <div class="row">
        <input class="col-6 " .value="${this.search}" @keydown="${(e) => this._search(e)}" placeholder="search....">
        <button class="btn btn-warning btn-rounded col-1 mx-3" @click="${(e)=> this._clear()}">Clear</button>
       </div>

      <div class="mt-4 mb-4 w-50 mx-auto">
        <a-spinner class="mt-4 mb-4" .loading="${this.isLoading}"></a-spinner>
      </div>

      <!-- attribute .viewFn is a callback function to be called when user clicks a movie in movie list to view -->
      <!-- <movie-list .movies="${this.movies}" .viewFn="${(id) => this._getMovie(id)}"></movie-list> -->
 
      <!-- attribute @view is an event handler for custom event 'view' emitted by movie-list -->
      <!-- and provides a more decoupled relationship between movie-app and movie-list -->
       <movie-list .movies="${this.movies}" @view="${(e) => this._getMovie(e.detail.id)}"></movie-list> 
      
    `;
  }
}

window.customElements.define('movie-container', MovieContainer);

