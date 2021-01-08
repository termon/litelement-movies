import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';

import { router, store, MovieBase, MovieList, MovieDetails, MovieSearch, LitLoader }  from './index.js';

// Movie Parent Component
export class MovieContainer extends MovieBase {
  
  render() {
    return html`
      <h4 class="mt-2">Search</h4>
      
      <!-- display selected movie details -->
      <movie-details .movie="${store.movie}"></movie-details>

      <!-- search bar / clear -->
      <movie-search .disabled="${store.clearDisabled}" .search="${store.search}" @clear="${() => store.clear()}" @search="${(e) => this._search(e) }"></movie-search>

      <!-- loading spinner -->
      <lit-loader class="mt-4 mb-4" .loading="${store.isLoading}"></lit-loader>

      <!-- display list of movies -->
      <!-- attribute @view is an event handler for custom event 'view' emitted by movie-list -->
      <!-- and provides a more decoupled relationship between movie-app and movie-list -->
      <movie-list .movies="${store.movies}" @view="${(e) => store.getMovie(e.detail.id)}"></movie-list> 
    `;
  }

  // ---------------- local method to react to search input ----------
  _search(e) {
    store.search = e.detail;
    store.getMovies();
  }
 
}

window.customElements.define('movie-container', MovieContainer);

