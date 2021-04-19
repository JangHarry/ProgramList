const fetch = require('node-fetch');

(async () => {
  const getPrograms = async () => {
    const response = await fetch('https://static.apis.sbs.co.kr/curation-api/gnb/mobile/all?on=air&sort=new&year=all&_=1618811885283');
    return await response.json();
  };

  const programs = await getPrograms();

  console.log(programs);
})();



