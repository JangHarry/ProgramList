class ProgramsSection extends Base {
  constructor(parentId) {
    super(parentId);

    try {
      this.id = {
        self: `${GLOBAL.ID}-${this.uuid}-section-self`
      };

      this.bind = () => {
        this.target.innerHTML = `<div id="${this.id.self}" class="program_category_w">
            <ul class="program_category_list">
              <li class="program_category_inner current">
                  <a href="#none" class="program_category_cont">전체</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">드라마</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">예능</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">교양</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">라디오</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">스포츠</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">sports</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">가나다라마바사아자차</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">텍스트는유동적으로늘어납니다요</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">스크롤생깁니다.</a>
              </li>
              <li class="program_category_inner">
                  <a href="#none" class="program_category_cont">하하하호호</a>
              </li>
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