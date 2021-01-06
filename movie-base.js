import { LitElement } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import { MobxReactionUpdate } from  './store.js'

// apply MobxReactionUpdate mixin to LitElement
export class MovieBase extends MobxReactionUpdate(LitElement) {  

  constructor() {
    super();   
  }

  /* 
    render component in LightDOM to allow global styles defined by bootstrap
    to be accessed in the component. Removing this method means component is
    rendered in shadow dom and global styles defined outside component don't apply
  */
  createRenderRoot() {
    return this;
  }

  // size='w92'
  posterUrl(poster, size='original', path = 'https://image.tmdb.org/t/p/') {
    return path + size + poster  
  }
}