import { createStore, applyMiddleware, compose } from 'https://unpkg.com/redux@latest?module'
import thunkMiddleware from 'https://unpkg.com/redux-thunk@latest?module'

import { reducer } from './reducer.js'

// The store now has the ability to accept thunk functions in `dispatch`
export const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) 
)