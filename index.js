import {Router} from 'https://unpkg.com/@vaadin/router@latest?module';
import { store } from './state/store.js'
import './movie-home.js'
import './movie-container.js'
import './movie-details.js'
import './not-found.js'

const outlet = document.getElementById('app');
const router = new Router(outlet);
router.setRoutes([
  {path: '/', component: 'movie-home'},
  {path: '/search', component: 'movie-container'},
  {path: '(.*)', component: 'not-found'},
]);

export  { router, store };