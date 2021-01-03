import { html, LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import './movie-carousel.js';

class MovieDetails extends LitElement {

  static get properties() {
    return {      
      movie: { type: Object },     
    };
  }

  /* 
    render component in LightDOM to allow global styles defined by bootstrap
    to be accessed in the component. Removing this method means component is
    rendered in shadow dom and global styles defined outside component don't apply
  */
  createRenderRoot() {
    return this;
  }

  _posterUrl(poster, size='original') {
    const imgPath = 'https://image.tmdb.org/t/p/';
    const p =  imgPath + size + poster
    console.log('poster', p)
    return p
  }
  
  render() {    
    if (!this.movie || !this.movie.id) return html``;
   
    return html`
      <div class="card shadow-lg p-3 mb-5">
        <!-- carousel -->
        <div class="row g-0">
           <movie-carousel .posters=${this.movie.images.backdrops.sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1)}></movie-carousel> 
        </div>
        <!-- card body -->
        <div class="row g-0">
          <div class="col-md-4">
          <img src="${this._posterUrl(this.movie.poster_path)}" class="card-img-top img-fluid" alt="..."></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">${ this.movie.title} <span class="badge bg-info fs-6">${this.movie.vote_average}</span></h4>
              <h5 class="fs-5">Released <span class="fs-6 text-muted">${ this.movie.release_date }</span></h5> 
              <h5 class="card-subtitle mb-2 text-muted">${ this.movie.credits.crew.slice(0,2).map(a => html`<span>${a.name} </span>`)   }</h5>
              <h6 class="card-subtitle mb-2 text-muted">${ this.movie.credits.cast.slice(0,4).map(a => html`<span>${a.name} </span>`) }</h6>              
              <p class="card-text">${ this.movie.overview }</p>
              <p> Runtime <span class="badge rounded-pill bg-primary">${this.movie.runtime}</span></p>      
            </div>
          </div>
        </div>
      </div> <!-- card -->
    `
  }

}

window.customElements.define('movie-details', MovieDetails);

