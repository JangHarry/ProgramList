class ProgramsContainer extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-xxx-self`
      };

      this.bind = () => {
        this.target.innerHTML = ``;
      };
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async initialize() {
    try {
      super.initialize();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async render() {
    try {
      this.bind();

      super.render();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }
}