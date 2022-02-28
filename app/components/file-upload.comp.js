export class FileUploadComponent extends HTMLElement {
  constructor() {
    super();
        
    // Add event listeners
    
    
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.querySelector('input').addEventListener('change', this.handleChange);
    this.querySelector('button').addEventListener('click', this.handleRemove);
  }

  handleChange(e) {
      const file = e.target.files[0];
      this.querySelector('section').style.display = "block";
      this.querySelector('span').innerText = file.name;
      this.dispatch('change', file);
  }

  handleRemove() {
    const el = this.querySelector('input');
    const file = el.files[0];
    el.value = "";
    this.querySelector('section').style.display = "none";
    this.dispatch('change', file);
  }

  static get observedAttributes() {
    return ['upload-label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'upload-label' && this.querySelector('label')) {
        if (newValue && newValue !== '' && newValue !== null) {
          this.querySelector('label').innerText = newValue;
        }
    }
  }

  dispatch(event, arg) {
    this.dispatchEvent(new CustomEvent(event, {detail: arg}));
  }

  get select() {
    return this.querySelector.bind(this);
  }

  render() {
    return `
      <style>
          :host {
            font-size: 13px;
            font-family: arial;
          }
          article {
              display: flex;
              align-items: center;
          }
          label {
            background-color: rgb(239, 239, 239);
            border: 1px solid rgb(118, 118, 118);
            padding: 2px 6px 2px 6px;
            border-radius: 2px;
            margin-right: 5px;
          }
          button {
              border:0;
              background: transparent;
              cursor: pointer;
          }
          button::before {
              content: '\\2716';
          }
      </style>
      <article>
        <label part="upload-button" for="fileUpload">Upload</label>
        <section hidden>
          <span></span><button></button>
        </section>
      </article>
      <input class="input-file" hidden id="fileUpload" type="file" />
    `;
  }
}