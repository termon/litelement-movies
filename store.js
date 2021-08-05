import { observable, action, computed, makeObservable, makeAutoObservable, Reaction } from "https://unpkg.com/mobx@latest?module"

// =============== MobX Store =====================
class Store {
    constructor() {
        this.isLoading = false;
        this.movie = {}
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

    // computed property - makeAutoObservable enables all getters as computed
    // https://mobx.js.org/computeds.html
    get clearDisabled() {
      return this.movies.length == 0
    }

    // ====================================== private methods ===================================
    // implementations that use either separate action methods or call action function in promise
    // https://mobx.js.org/actions.html#examples
   
    _fetchMovies() {
        this.isLoading = true 
        console.log(this._query())
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
            this.movie = undefined   
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
        if (this.search === ':trending') {
          return 'https://api.themoviedb.org/3/trending/movie/week'
        } else if (this.search === ':popular') {
          return 'https://api.themoviedb.org/3/movie/popular'
        } else if (this.search === ':playing') {
          return 'https://api.themoviedb.org/3/movie/now_playing'
        } else if (this.search === ':upcoming') {
          return 'https://api.themoviedb.org/3/movie/upcoming'
        } else if (this.search === ':top') {
          return 'https://api.themoviedb.org/3/movie/top_rated'
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


/**
 * lit-mobx@1.0.0 mixin
 * 
 * A class mixin which can be applied to lit-element's
 * [UpdatingElement](https://lit-element.polymer-project.org/api/classes/_lib_updating_element_.updatingelement.html)
 * derived classes. This mixin adds a mobx reaction which tracks the update method of UpdatingElement.
 *
 * Any observables used in the render template of the element will be tracked by a reaction
 * and cause an update of the element upon change.
 *
 * @param constructor the constructor to extend from to add the mobx reaction, must be derived from UpdatingElement.
 */
const reaction = Symbol('LitMobxRenderReaction');
const cachedRequestUpdate = Symbol('LitMobxRequestUpdate');

export function MobxReactionUpdate(constructor) {
  var _a, _b;
  return _b = class MobxReactingElement extends constructor {
    constructor() {
      super(...arguments);
      this[_a] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const name = this.constructor.name /* c8 ignore next */ || this.nodeName;
      this[reaction] = new Reaction(`${name}.update()`, this[cachedRequestUpdate]);
      if (this.hasUpdated)
      this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this[reaction]) {
        this[reaction].dispose();
        this[reaction] = undefined;
      }
    }
    update(changedProperties) {
      if (this[reaction]) {
        this[reaction].track(super.update.bind(this, changedProperties));
      } else
      {
        super.update(changedProperties);
      }
    }},

  _a = cachedRequestUpdate,
  _b;
}
