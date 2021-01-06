import { observable, action, computed, makeObservable, makeAutoObservable } from "https://unpkg.com/mobx@latest?module"
class Store {
    constructor() {
        this.isLoading = false;
        this.movie = []
        this.movies = []
        this.search = ''
        this.error = ''

        makeAutoObservable(this)

        // alternatively configure each property individually
        // makeObservable(this, {
        //     isLoading: observable,
        //     movie: observable,
        //     movies: observable,
        //     search: observable
        // })
    }
    
    // ================================= public store API actions ===============================

    clear() {
        this.movie = undefined;
        this.movies = [];
        this.search = '';
    }

    getMovies() {
        this._fetchMovies()
    }
    
    getMovie(id) {
        this._fetchMovie(id)
    }

    // ====================================== private methods ===================================
    // implementations that use either separate action methods or call action function in promise
    // https://mobx.js.org/actions.html#examples
   
    _fetchMovies() {
        this.isLoading = true 
        fetch(this._query(), this._getTokenObj())
            .then(response => response.json())
            .then(this._fetchMoviesSuccessAction)
            .catch(this._fetchFailureAction) 
    }

    _fetchMovie(id) {
        this.isLoading = true
        fetch('https://api.themoviedb.org/3/movie/'+id+'?append_to_response=credits,images,videos', this._getTokenObj())
          .then(response => response.json())
          .then(this._fetchMovieSuccessAction)
          .catch(this._fetchFailureAction)
    }

    // -------- action methods -----------
    _fetchMoviesSuccessAction = json => {
        this.isLoading = false
        if (json.results) {                 
            this.movies = json.results   
            this.search = ''
        } 
    }
    _fetchMovieSuccessAction = json => {
        this.isLoading = false
        if (json.title) {
            this.movie = json
        }
    }
    _fetchFailureAction = error => {
        this.isLoading = false
        this.error = error;
        console.log('error', this.error)
    }

    // version using inline promise resolution wrapped in action method
    // _fetchMoviesUsingAction() {
    //     this.isLoading = true 
    //     fetch(this._query(), this._getTokenObj())
    //         .then(response => response.json())
    //         .then(action("fetchMoviesSuccess", json => {
    //                 this.isLoading = false
    //                 if (json.results) {                 
    //                     this.movies = json.results   
    //                     this.search = ''
    //                 }                
    //               }) 
    //         ) 
    // }
  
    // configure query based on search value
    _query() {
        if (this.search === ':popular') {
          return 'https://api.themoviedb.org/3/movie/top_rated'
        } else if (this.search === ':trending') {
          return 'https://api.themoviedb.org/3/trending/movie/week'
        } else {
          return `https://api.themoviedb.org/3/search/movie?query="${this.search}"`
        }
      }

    // bearer token (should really be stored in env )
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
}

export const store = new Store();
