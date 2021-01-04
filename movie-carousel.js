import {html} from 'https://unpkg.com/lit-html@latest/lit-html.js?module';
import { MovieBase } from './movie-base.js';

class MovieCarousel extends MovieBase {
    static get properties() {
        return {
            posters: { type: String },  
            count: { type: Number }       
        }
    }

    constructor() {
        super();
        this.posters = [];
        this.count = 3;
    }

    render() {
        return this._carousel();
    }

    _carousel() {
        return html`
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    ${this.posters.slice(0,this.count).map((p,i) => html`
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ></li>                
                    `)}          
                </ol>
                <div class="carousel-inner">
                    ${this.posters.slice(0,this.count).map((p,i) => html`
                        <div class="carousel-item ${i==0?'active':''}">
                            <img src="${this.posterUrl(p.file_path)}" class="d-block w-100" alt="...">
                        </div>`
                    )}                       
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </a>
            </div>
        `;
    }

}

customElements.define('movie-carousel', MovieCarousel);