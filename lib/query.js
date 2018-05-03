const get = require('https').get,
  stringify = require('querystring').stringify;

const CODE = 'Lohn2018';


function query(version, input) {

  let parameters = { code: CODE, ...input },
    options = {
      hostname: 'www.bmf-steuerrechner.de',
      path: `/interface/${version}.xhtml?${stringify(parameters)}`
    };

  return new Promise((resolve, reject) => {

    get(options, response => {

      if (200 !== response.statusCode) {
        reject(response.statusCode);
        response.resume();
        return;
      }

      let data = '';
      response.setEncoding('utf8');
      response.on('error', reject);
      response.on('data', chunk => data += chunk);

      response.on('end', () => resolve(data));
    })
      .on('error', err => reject(err))
  })
};

module.exports = query;

