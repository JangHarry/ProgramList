class ProgramsSection extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-section-self`,
        item: `${GLOBAL.ID}-${this.uuid}-section-item`
      };

      this.view = {
        items: [{
          id: 'all',
          title: '전체',
          selected: true
        }, {
          id: 'dr',
          title: '드라마',
          selected: false
        }, {
          id: 'et',
          title: '예능',
          selected: false
        }, {
          id: 'cu',
          title: '교양',
          selected: false
        }, {
          id: 'ra',
          title: '라디오',
          selected: false
        }, {
          id: 'sp',
          title: '스포츠',
          selected: false
        }]
      };

      this.bind = () => {
        const sections = this.view.items;

        this.target.innerHTML = `<div id="${this.id.self}" class="program_category_w">
          <ul class="program_category_list">
            ${sections.map(section => {
              return `<li id="${this.id.item}-${section.id}" class="program_category_inner ${section.selected ? 'current' : ''}">
                <a href="#" onclick="return false;" class="program_category_cont">${section.title}</a>
              </li>`;
            }).join('')}
          </ul>
        </div>`;

        sections.forEach(section => {
          this.target.querySelector(`#${this.id.item}-${section.id}`).addEventListener('click', event => {
            try {
              const selectedSection = sections.find(section => section.id === event.currentTarget.id.split('-')[9]);

              sections.forEach(section => {
                section.selected = section.id === selectedSection.id;
              });

              this.event.clicked(selectedSection);

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

  getSelected() {
    return this.view.items.find(item => item.selected);
  }
}