class ProgramsProggram extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-program-self`,
        filter: {
          _: `${GLOBAL.ID}-${this.uuid}-program-filter-_`,
          self: `${GLOBAL.ID}-${this.uuid}-program-filter-self`,
          item: `${GLOBAL.ID}-${this.uuid}-program-filter-item`
        },
        program: {
          self: `${GLOBAL.ID}-${this.uuid}-program-program-self`,
          item: `${GLOBAL.ID}-${this.uuid}-program-program-item`
        }
      };

      this.view = {
        filter: {
          items: [{
            id: 'new',
            title: '최신',
            selected: true,
            click: filter => {
              this.view.filter.items.find(item => item.id === filter.id).selected = true;

              this.renderFilter();
            }
          }, {
            id: 'title',
            title: '체목',
            selected: false,
            click: filter => {
              this.view.filter.items.find(item => item.id === filter.id).selected = true;

              this.renderFilter();
            }
          }]
        },
        program: {
          items: []
        }
      };

      this.state = {
        program: {
          limit: 40,
          is: {
            loading: false
          }
        }
      };

      this.bind = () => {
        const programs = this.view.program.items.filter(program => program.is.visible);

        this.target.innerHTML = `<div id="${this.id.self}">
          <div id="${this.id.filter._}"></div>
          <div id="${this.id.program.self}" class="program_list_w">
            <ul class="program_list_inner">
              ${programs.map(program => {
                return `<li id="${this.id.program.item}-${program.vod_id}" class="program_list_cont">
                  <div class="programlist_module_w">
                    <a href="${program.link}" target="_blank" class="programlist_module_inner">
                      <strong class="programlist_module_title">${program.title}</strong>
                      <div class="programlist_module_image_w">
                        <img src="${program.img_url}" alt="${program.title}" class="programlist_image" width="100%">
                      </div>
                    </a>
                  </div>
                </li>`;
              }).join('')}
            </ul>
          </div>
        </div>`;
      };
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async initialize(command) {
    try {
      this.view.program.items = command.programs.map((program, index) => {
        program.is = {
          visible: index < this.state.program.limit
        };

        return program;
      });

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

      this.renderFilter();

      super.render();

      return this;
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  renderFilter() {
    try {
      const filters = this.view.filter.items;

      this.target.querySelector(`#${this.id.filter._}`).innerHTML = `<div id="${this.id.filter.self}" class="program_align_btn_w">
        <div class="sorting_btn_w">
          ${filters.map(filter => {
            return `<button id="${this.id.filter.item}-${filter.id}" type="button" class="sorting_btn_cont ${filter.selected ? 'current' : ''}">${filter.title}</button>`;
          }).join('')} 
        </div>
      </div>`;

      filters.forEach(filter => {
        this.target.querySelector(`#${this.id.filter.item}-${filter.id}`).addEventListener('click', event => {
          try {
            const selectedFilter = filters.find(filter => filter.id === event.currentTarget.id.split('-')[10]);

            selectedFilter.click(selectedFilter);
          }
          catch(error) {
            LOG_UTIL.log(error);
          }
        });
      });
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }

  async scrolled(event) {
    try {
      if(event.clientWidth - event.scrollY < 40) {
        if(!this.state.program.is.loading) {
          this.state.program.is.loading = true;

          const offset = this.view.program.items.filter(program => program.is.visible).length;

          this.view.program.items = this.view.program.items.map((program, index) => {
            program.is.visible = index < offset + this.state.program.limit;

            return program;
          });

          await this.render();

          this.state.program.is.loading = false;
        }
      }
    }
    catch(error) {
      LOG_UTIL.log(error);
    }
  }
}