class ProgramsContainer extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-container-self`,
        section: `${GLOBAL.ID}-${this.uuid}-container-section`,
        state: `${GLOBAL.ID}-${this.uuid}-container-state`,
        program: `${GLOBAL.ID}-${this.uuid}-container-program`
      };

      this.state = {
        programs: [],
        section: 'all',
        on: 'air',
        sort:'new'
      };

      this.model = {
        section: null,
        state: null,
        program: null
      };

      this.bind = () => {
        this.target.innerHTML = `<div id="${this.id.self}">
          <div id="${this.id.section}"></div>
          <div id="${this.id.state}"></div>
          <div id="${this.id.program}"></div>
        </div>`;
      };
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async initialize() {
    try {
      this.state.programs = await (async response => {
        return await response.json();
      })(await fetch(`//static.apis.sbs.co.kr/curation-api/gnb/mobile/${this.state.section}?on=${this.state.on}&sort=${this.state.sort}&year=all`));

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

      this.model.section = new ProgramsSection(this.id.section);
      this.model.section.event.clicked = async event => {
        try {
          this.state.section = event.id;

          await this.initialize();
          await this.renderProgram();
        }
        catch(error) {
          LOG_UTIL.log(error);
        }
      };
      await this.model.section.initialize();
      await this.model.section.render();

      await this.renderState();
      await this.renderProgram();

      super.render();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async renderState() {
    try {
      this.model.state = new ProgramsState(this.id.state);
      this.model.state.event.clicked = async event => {
        try {
          this.state.on = event.id;

          await this.initialize();
          await this.renderProgram();
        }
        catch(error) {
          LOG_UTIL.log(error);
        }
      };
      await this.model.state.initialize();
      await this.model.state.render();
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async renderProgram() {
    try {
      this.model.program = new ProgramsProggram(this.id.program);
      this.model.program.event.clicked = async event => {
        try {
          this.state.sort = event.id;

          await this.initialize({
            programs: this.state.programs,
            sort : this.state.sort
          });
          await this.renderProgram();
        }
        catch(error) {
          LOG_UTIL.log(error);
        }
      };
      await this.model.program.initialize({
        programs: this.state.programs,
        sort : this.state.sort
      });
      await this.model.program.render();
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }
}