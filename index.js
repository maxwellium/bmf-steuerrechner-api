const getVersion = require('./lib/get-version'),
  query = require('./lib/query'),
  parse = require('./lib/parse');


function api(input, year, month = null) {
  return query(getVersion(year, month), input)
    .then(parse);
}

module.exports = api;
