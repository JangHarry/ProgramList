class ProgramsState extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-state-self`
      };

      this.bind = () => {
        this.target.innerHTML = `<div class="program_state_btn_w">
            <a href="#" class="program_state_btn current">
                <span class="program_state_text">방영</span>
            </a>
            <a href="#" class="program_state_btn">
                <span class="program_state_text">종영</span>
            </a>
        </div>`;
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