export class HomeComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return `
    <div class="container page">
      <h1>My awesome tooltip</h1>

      <p>Lorem ipsum 
        <c-tooltip background="#3b403c" color="#fff">
          <span slot="message">Test de tooltip message !</span>
        </c-tooltip> 
        and I type some tips here !
      </p>

      <p>Another big text here just for 
        <c-tooltip>
          <span slot="message">Second test de tooltip message !</span>
        </c-tooltip> 
        testing because it's sooo coool !
      </p>

      <h1>My file-upload</h1>
      <c-file-upload upload-label="Upload Files"></c-file-upload>
    </div>
    `;
  }
}