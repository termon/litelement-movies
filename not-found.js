import { html } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import { MovieBase } from './movie-base.js';

class NotFound extends MovieBase {

  static get properties() {
    return { 
      
    };
  }

  render() {
      return html`
        <p3>Route not found</p3>
      `;
  }
}

window.customElements.define('not-found', NotFound);