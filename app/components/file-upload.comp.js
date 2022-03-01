export class FileUploadComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowDom = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowDom.innerHTML = this.render();
    this.$section = this.shadowDom.querySelector('section');
    this.$span = this.shadowDom.querySelector('span');

    // A changer
    this.shadowDom.querySelector('input').addEventListener('change', (ev) => this.handleChange(ev, this.$section));
    this.shadowDom.querySelector('button').addEventListener('click', this.handleRemove);

    // connectedCallback is called after attributeChangedCallback
    if (this.label) {
      this.shadowDom.querySelector('label').innerHTML = this.label;
    }
  }

  static get observedAttributes() {
    return ['upload-label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'upload-label') {
        if (newValue && newValue !== '' && newValue !== null) {
          this.label = newValue;
        }
    }
  }

  handleChange(e, section) {
      const file = e.target.files[0];
      this.$section.style.display = "block";
      this.$span.innerText = file.name;
      this.dispatch('change', file);
      e.stopImmediatePropagation();
  }

  handleRemove() {
    const el = this.shadowDom.querySelector('input');
    const file = el.files[0];
    el.value = "";
    this.shadowDom.querySelector('section').style.display = "none";
    this.shadowDom.dispatch('change', file);
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