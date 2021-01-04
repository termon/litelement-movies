import { html } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import { MovieBase } from './movie-base.js';

class MovieHome extends MovieBase {

  static get properties() {
    return { 
      
    };
  }

  constructor() {
    super();
  
  }

  render() {
    return html`
          <h3>Movie Home Page</h3>
    `;
  }

}

window.customElements.define('movie-home', MovieHome);