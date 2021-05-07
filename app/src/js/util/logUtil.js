class LOG_UTIL {
  static log(message) {
    if(true) {
      const runtime = (() => {
        const timestamp = new Date().getTime();
        const runtime = timestamp - GLOBAL.LOCAL.TIMESTAMP;

        GLOBAL.LOCAL.TIMESTAMP = timestamp;

        return runtime;
      })();

      if(typeof message === 'string') {
        console.log(`[${runtime}ms] ${GLOBAL.ID}: ${JSON.stringify(message)}`);
      }
      else {
        console.log(`[${runtime}ms] ${GLOBAL.ID}: see details below ↓`);
        console.log(message);
      }
    }
  }

  static alert(message) {
    if(true) {
      if(typeof message === 'string') {
          alert(message);
      }
      else {
          alert(JSON.stringify(message));
      }
    }
  }
}