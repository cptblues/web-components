import "@webcomponents/webcomponentsjs/webcomponents-lite";
import { Core } from './core/core';

/**
 * Order is important !
 */
class App {
    constructor() {
      new Core();
    }
}

if ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    console.log('platform is good!');
    new App();
} else {
    setTimeout(() => {
      console.log('platform is good!');
      new App();
    });
}