import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

class NotFound extends MovieBase {

  render() {
      return html`
        <p3>Route not found</p3>
      `;
  }
}

window.customElements.define('not-found', NotFound);