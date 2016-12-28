const request = require( 'request-promise-native' ),
  xml2js      = require( 'xml2js' );

const versionUrlMap = {
  2006: [
    'https://www.bmf-steuerrechner.de/interface/2006.jsp'
  ],
  2007: [
    'https://www.bmf-steuerrechner.de/interface/2007.jsp'
  ],
  2008: [
    'https://www.bmf-steuerrechner.de/interface/2008.jsp'
  ],
  2009: [
    'https://www.bmf-steuerrechner.de/interface/2009.jsp'
  ],
  2010: [
    'https://www.bmf-steuerrechner.de/interface/2010.jsp'
  ],
  2011: [
    'https://www.bmf-steuerrechner.de/interface/2011bisNov.jsp',
    'https://www.bmf-steuerrechner.de/interface/2011Dez.jsp'
  ],
  2012: [
    'https://www.bmf-steuerrechner.de/interface/2012.jsp'
  ],
  2013: [
    'https://www.bmf-steuerrechner.de/interface/2013.jsp'
  ],
  2014: [
    'https://www.bmf-steuerrechner.de/interface/2014.jsp'
  ],
  2015: [
    'https://www.bmf-steuerrechner.de/interface/2015bisNov.jsp',
    'https://www.bmf-steuerrechner.de/interface/2015Dez.jsp'
  ],
  2016: [
    'https://www.bmf-steuerrechner.de/interface/2016V1.jsp'
  ],
  2017: [
    'https://www.bmf-steuerrechner.de/interface/LSt2017.jsp'
  ]
};


function getVersionUrl( year = (new Date()).getFullYear(), version = versionUrlMap[ year ].length - 1 ) {
  return versionUrlMap[ year ][ version ];
}


function query( year, version, input ) {

  return request
    .get( {
      url: getVersionUrl( year, version ),
      qs:  input
    } )
    .then( response => {

      return new Promise( ( resolve, reject ) => {
        xml2js.parseString( response, ( err, result ) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( result );
          }
        } );
      } );
    } )
    .then( parseBMFResponse );
}


function parseBMFResponse( response ) {

  let result = {
    jahr:     response.lohnsteuer.$.jahr,
    eingaben: {},
    ausgaben: {}
  };

  for (let eingabe of response.lohnsteuer.eingaben[ 0 ].eingabe) {
    result.eingaben[ eingabe.$.name ] = {
      value:  eingabe.$.value,
      status: eingabe.$.status
    };
  }

  for (let ausgabe of response.lohnsteuer.ausgaben[ 0 ].ausgabe) {
    result.ausgaben[ ausgabe.$.name ] = {
      value: ausgabe.$.value,
      type:  ausgabe.$.type
    };
  }

  return result;
}


module.exports.getVersionUrl    = getVersionUrl;
module.exports.query            = query;
module.exports.parseBMFResponse = parseBMFResponse;
