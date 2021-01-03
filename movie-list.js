import { html, LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';

class MovieList extends LitElement {

  static get properties() {
    return { 
      movies: { type: Array },
      viewFn: { type: Object }
    };
  }

  constructor() {
    super();
    this.movies = [];
  }

  /* 
    render component in LightDOM to allow global styles defined by bootstrap
    to be accessed in the component. Removing this method means component is
    rendered in shadow dom and global styles defined outside component don't apply
  */
  createRenderRoot() {
    return this;
  }

  viewEvent(id) {
    this.dispatchEvent(new CustomEvent('view', {
      bubbles: true,
      composed: true,
      detail: {
        id
      }
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
              <td><a href="#" @click="${(e) => this.viewEvent(m.id)}">${ m.id }</a></td>
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
