const promisify = require('util').promisify
parseString = require('xml2js').parseString,
  parseXML = promisify(parseString);


function parse(xml) {
  return parseXML(xml).then(parseBMFResponse);
}


function parseBMFResponse(response) {

  let result = {
    jahr: response.lohnsteuer.$.jahr,
    eingaben: {},
    ausgaben: {}
  };

  if (response.lohnsteuer.eingaben[0] && response.lohnsteuer.eingaben[0].eingabe) {
    for (let eingabe of response.lohnsteuer.eingaben[0].eingabe) {
      result.eingaben[eingabe.$.name] = {
        value: eingabe.$.value,
        status: eingabe.$.status
      };
    }
  }

  if (response.lohnsteuer.ausgaben[0] && response.lohnsteuer.ausgaben[0].ausgabe) {
    for (let ausgabe of response.lohnsteuer.ausgaben[0].ausgabe) {
      result.ausgaben[ausgabe.$.name] = {
        value: ausgabe.$.value,
        type: ausgabe.$.type
      };
    }
  }

  return result;
}

module.exports = parse;
