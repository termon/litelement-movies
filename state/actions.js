
export const REQUEST = 'REQUEST' // start request so turn spinner on
export const FAILURE = 'FAILURE' // turn spinner off and handle error
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS'
export const CLEAR = 'CLEAR'

export const clear = () => {
    return {
        type: CLEAR,
    }
}
export const request = () => {
    return {
        type: REQUEST
    }
}
export const failure = (e) => {
    return {
        type: FAILURE,
        e
    }
}

export const getMoviesSuccess = (movies) => {
    return {
        type: GET_MOVIES_SUCCESS,
        movies
    }
}
export const getMovieSuccess = (movie) => {
    return {
        type: GET_MOVIE_SUCCESS,
        movie
    }
}

export const getMovies = (search) => {
    return function(dispatch) {
        dispatch(request())
        fetch(_query(search), _getTokenObj())
            .then(response => response.json())
            .then(json => {            
            if (json.results) {
                dispatch(getMoviesSuccess(json.results))                  
                console.log(json.results) 
            } else {
                dispatch(failure('Error carrying out request'))   
            } 
        })  
    }
}

export const getMovie = (id) => {
    return function(dispatch) {
        dispatch(request())
        fetch('https://api.themoviedb.org/3/movie/'+id+'?append_to_response=credits,images,videos', _getTokenObj())
          .then(response => response.json())
          .then(json => { 
            if (json.title) {
                console.log('getMovie', json)
                dispatch(getMovieSuccess(json))       
            } else {
                dispatch(failure('Error carrying out request')) 
            }
          }
        )
    }
}

// ================ Local Functions =================
function _getTokenObj() { 
    return {
      method: 'GET',
      headers: new Headers(
        {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZlNGVlOTVkMTM0ZGE4ZDllOTUyZDg3ZWQ5OGViNyIsInN1YiI6IjVhYTNmYmY2OTI1MTQxMjc4ZDAwZDU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx2bw91VSdbeU-NVOeg2lfOBCUKoRU7mlZGktWK-iZc', 
          'Content-Type': 'application/json'
        })
    }     
  }

function  _query(search) {
    if (search === ':popular') {
      return 'https://api.themoviedb.org/3/movie/top_rated'
    } else if (search === ':trending') {
      return 'https://api.themoviedb.org/3/trending/movie/week'
    } else {
      return `https://api.themoviedb.org/3/search/movie?query="${search}"`
    }
  }


