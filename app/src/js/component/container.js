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
        programs: []
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
      })(await fetch('//static.apis.sbs.co.kr/curation-api/gnb/mobile/all?on=air&sort=new&year=all&_=1620367765223'));

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
      await this.model.section.initialize();
      await this.model.section.render();

      this.model.state = new ProgramsState(this.id.state);
      await this.model.state.initialize();
      await this.model.state.render();

      this.model.program = new ProgramsProggram(this.id.program);
      await this.model.program.initialize({
        programs: this.state.programs
      });
      await this.model.program.render();

      super.render();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }
}