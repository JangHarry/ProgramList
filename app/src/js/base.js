class Base {
  constructor(parentId) {
    this._id = {};
    this._uuid = (() => {
      let d = new Date().getTime();

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return ( c === 'x' ? r : (r&0x3|0x8)).toString(16);
      });
    })();
    this._target = document.getElementById(parentId);
    this._view = {};
    this._state = {};
    this._model = {};
    this._event = {
      initialized: () => {
        LOG_UTIL.log(`'${this.id.self}' has been initialized.`);
      },
      rendered: () => {
        LOG_UTIL.log(`'${this.id.self}' has been rendered.`);
      }
    };

    this._bind = () => {};

    window.addEventListener("scroll", event => {
      this.scrolled(event);
    });

    window.addEventListener('resize', event => {
      this.resized(event);
    });

    document.addEventListener('fullscreenchange', event => {
      this.fullscreenChanged(event);
    });
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get uuid() {
    return this._uuid;
  }

  set uuid(uuid) {
    this._uuid = uuid;
  }

  get target() {
    return this._target;
  }

  set target(target) {
    this._target = target;
  }

  get view() {
    return this._view;
  }

  set view(view) {
    this._view = view;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  get model() {
    return this._model;
  }

  set model(model) {
    this._model = model;
  }

  get event() {
    return this._event;
  }

  set event(event) {
    this._event = event;
  }

  get bind() {
    return this._bind;
  }

  set bind(handler) {
    this._bind = handler;
  }

  async initialize(event) {
    this._event.initialized(event);
  }

  async render(event) {
    this._event.rendered(event);
  }

  resized(event) {

  }

  scrolled(event) {

  }

  fullscreenChanged(event) {

  }
}