class ProgramsContainer extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-container-self`
      };

      this.view = {
        programs: []
      };

      this.bind = () => {
        const programs = this.view.programs;

        this.target.innerHTML = `<div id="${this.id.self}">
          <ul>
            ${programs.map(program => {
              return `<li>${program.title}</li>`;
            }).join('')}
          </ul>
        </div>`;
      };
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async initialize() {
    try {
      this.view.programs = await (async response => {
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

      super.render();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }
}