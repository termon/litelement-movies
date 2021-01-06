import { CLEAR, REQUEST, FAILURE, GET_MOVIES_SUCCESS, GET_MOVIE_SUCCESS } from "./actions.js"

const INITIAL_STATE = {
    movie: {},
    movies: [],
    isLoading: false
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR: 
            return { movie: {}, movies: [], isLoading: false }         
        case REQUEST:
            return { ...state, isLoading: true }
        case FAILURE:
            return { ...state, isLoading: false } // could use action error 
        case GET_MOVIES_SUCCESS:
            return { ...state, movies: action.movies, isLoading: false }
        case GET_MOVIE_SUCCESS:
            return { ...state, movie: action.movie, isLoading: false }
        default: return state
    }
}

