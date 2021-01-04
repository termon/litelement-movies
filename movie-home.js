import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

class MovieHome extends MovieBase {

  render() {
    return html`
          <h3>Movie Home Page</h3>
    `;
  }

}

window.customElements.define('movie-home', MovieHome);