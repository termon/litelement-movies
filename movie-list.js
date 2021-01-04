import { html } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import { MovieBase } from './movie-base.js';
class MovieList extends MovieBase {

  static get properties() {
    return { 
      movies: { type: Array },
      viewFn: { type: Object } /* optional callback function - use event instead */
    };
  }

  constructor() {
    super();
    this.movies = [];
  }

  _generateViewEvent(id) {
    this.dispatchEvent(new CustomEvent('view', {
      bubbles: true,
      composed: true,
      detail: { id }
    }));
  }

  render() {
    console.log('movie-list render', this.movies)
    return html`
      <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>          
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        ${this.movies.map((m) => html`
            <tr>
              <td><a href="#" @click="${(e) => this._generateViewEvent(m.id)}">${ m.id }</a></td>
              <td>${ m.title }</td>
              <td>${ m.release_date }</td>    
            </tr>
          `
        )}     
      </tbody>
    </table>
    `
  }
  
}

window.customElements.define('movie-list', MovieList);
