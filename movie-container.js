import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';

import { router, store, MovieBase, MovieList, MovieDetails, ASpinner }  from './index.js';

// Movie Parent Component
export class MovieContainer extends MovieBase {
  
  render() {
    return html`
      <h4 class="mt-2">Search</h4>
      
      <movie-details .movie="${store.movie}"></movie-details>

      <!-- search -->
      <div class="row">
        <input class="col-6 " .value="${store.search}" @keydown="${ (e) => this._search(e) }" placeholder="search....">
        <button ?disabled="${store.clearDisabled}" class="btn btn-warning btn-rounded col-1 mx-3" @click="${(e)=> store.clear()}">Clear</button>
       </div>

      <!-- loading spinner -->
      <div class="mt-4 mb-4 w-50 mx-auto">
        <a-spinner class="mt-4 mb-4" .loading="${store.isLoading}"></a-spinner>
      </div>

      <!-- attribute @view is an event handler for custom event 'view' emitted by movie-list -->
      <!-- and provides a more decoupled relationship between movie-app and movie-list -->
      <movie-list .movies="${store.movies}" @view="${(e) => store.getMovie(e.detail.id)}"></movie-list> 
    `;
  }

  // ---------------- local method to react to search input ----------
  _search(e) {
    if (e.key === 'Enter') {
      store.search = e.target.value;
      store.getMovies();
    }
  }
 
}

window.customElements.define('movie-container', MovieContainer);

