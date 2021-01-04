import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { router }  from './index.js';
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
      location: {type: Object} /* vaadin router location */
    };
  }

  constructor() {
    super();
    this.search = '';
    this.movie = undefined;
    this.movies = [];
    this.isLoading = false; 
    this.location = router.location
  }

  _clear() {
    console.log('clearing', this.movie, this.movies, this.search)
    this.movie = undefined;
    this.movies = [];
    this.search = '';
  } 

  _query() {
    if (this.search === ':popular') {
      return 'https://api.themoviedb.org/3/movie/top_rated'
    } else if (this.search === ':trending') {
      return 'https://api.themoviedb.org/3/trending/movie/week'
    } else {
      return `https://api.themoviedb.org/3/search/movie?query="${this.search}"`
    }
  }

  _getMovies() {
    this.isLoading = true 
    fetch(this._query(), this._getTokenObj())
      .then(response => response.json())
      .then(json => {
        this.isLoading = false
        if (json.results) {
          this.movies = json.results   
          this.search = '' 
          console.log(json.results) 
        }  
      })
  }

  _getMovie(id) {
      this.isLoading = true
      fetch('https://api.themoviedb.org/3/movie/'+id+'?append_to_response=credits,images,videos', this._getTokenObj())
        .then(response => response.json())
        .then(json => { 
          this.isLoading = false
          if (json.title) {
            this.movie = json
          }
        }
      )
  }

  _getTokenObj() { 
    return {
      method: 'GET',
      headers: new Headers(
        {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZlNGVlOTVkMTM0ZGE4ZDllOTUyZDg3ZWQ5OGViNyIsInN1YiI6IjVhYTNmYmY2OTI1MTQxMjc4ZDAwZDU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2bw91VSdbeU-NVOeg2lfOBCUKoRU7mlZGktWK-iZc', 
          'Content-Type': 'application/json'
        })
    } 
  }

  _search(e) {
    if (e.key === 'Enter') {
      this.search = e.target.value;
      this._getMovies();
    }
  }
 
  render() {
    return html`
      <h4 class="mb-4 mt-2">Movie Search</h4>
      
      <movie-details .movie="${this.movie}"></movie-details>

      <div class="row">
        <input class="col-6 " .value="${this.search}" @keydown="${ (e) => this._search(e) }" placeholder="search....">
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

