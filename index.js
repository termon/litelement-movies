import { Router } from 'https://unpkg.com/@vaadin/router@latest?module';
import { store } from './store.js'
import { MovieBase } from './movie-base.js'
import { MovieHome} from './movie-home.js'
import { MovieContainer } from './movie-container.js'
import { MovieDetails } from './movie-details.js'
import { NotFound } from './not-found.js'
import { MovieList } from './movie-list.js'
import { MovieCarousel } from './movie-carousel.js'
import { MovieVideo } from './movie-video.js'
import { ASpinner } from './a-spinner.js'
import { MovieSearch } from './movie-search.js'

const outlet = document.getElementById('app');
const router = new Router(outlet);
router.setRoutes([
  {path: '/', component: 'movie-home'},
  {path: '/search', component: 'movie-container'},
  {path: '(.*)', component: 'not-found'},
]);

export  { 
  router, 
  store, 
  MovieBase, 
  MovieContainer, 
  MovieList, 
  MovieDetails,
  MovieCarousel,
  MovieVideo,
  ASpinner,
  MovieSearch
 };