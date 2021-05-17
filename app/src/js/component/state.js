class ProgramsState extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-state-self`,
        item: `${GLOBAL.ID}-${this.uuid}-state-item`
      };

      this.view = {
        items: [{
          id: 'air',
          title: '방영',
          selected: true
        }, {
          id: 'end',
          title: '종영',
          selected: false
        }]
      };

      this.bind = () => {
        const states = this.view.items;

        this.target.innerHTML = `<div class="program_state_btn_w">
          ${states.map(state => {
            return `<a id="${this.id.item}-${state.id}" href="#" onclick="return false;" class="program_state_btn ${state.selected ? 'current' : ''}">
              <span class="program_state_text">${state.title}</span>
            </a>`;
          }).join('')}
        </div>`;

        states.forEach(state => {
          this.target.querySelector(`#${this.id.item}-${state.id}`).addEventListener('click', event => {
            try {
              const selectedState = states.find(state => state.id === event.currentTarget.id.split('-')[9]);

              states.forEach(state => {
                state.selected = state.id === selectedState.id;
              });

              this.event.clicked(selectedState);

              this.render();
            }
            catch(error) {
              LOG_UTIL.log(error);
            }
          });
        });
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