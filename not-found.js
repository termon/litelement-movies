import { html } from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

export class NotFound extends MovieBase {

  render() {
      return html`
        <h3 class="mt-4">404 - Route not found</h3>
      `;
  }
}

window.customElements.define('not-found', NotFound);