import { parseString } from 'xml2js';

export interface XMLResponse {
  lohnsteuer: {
    $: { jahr: string },
    eingaben: {
      eingabe: {
        $: {
          name: string,
          value: string,
          status: string
        }
      }[]
    }[],
    ausgaben: {
      ausgabe: {
        $: {
          name: string,
          value: string,
          type: string
        }
      }[]
    }[]
  }
}

export interface BMFResponse {
  jahr: string,
  eingaben: {
    [ e: string ]: {
      value: string,
      status: string
    }
  },
  ausgaben: {
    [ e: string ]: {
      value: string,
      type: string
    }
  }
}

export async function parse( xml: string ) {
  const obj = <XMLResponse> await new Promise(
    ( resolve, reject ) => parseString(
      xml, ( err, result ) => err ? reject( err ) : resolve( result )
    )
  );
  return await parseBMFResponse( obj );
}


export function parseBMFResponse( response: XMLResponse ) {

  const result: BMFResponse = {
    jahr: response.lohnsteuer.$.jahr,
    eingaben: {},
    ausgaben: {}
  };

  if ( response.lohnsteuer.eingaben[ 0 ] && response.lohnsteuer.eingaben[ 0 ].eingabe ) {
    for ( let eingabe of response.lohnsteuer.eingaben[ 0 ].eingabe ) {
      result.eingaben[ eingabe.$.name ] = {
        value: eingabe.$.value,
        status: eingabe.$.status
      };
    }
  }

  if ( response.lohnsteuer.ausgaben[ 0 ] && response.lohnsteuer.ausgaben[ 0 ].ausgabe ) {
    for ( let ausgabe of response.lohnsteuer.ausgaben[ 0 ].ausgabe ) {
      result.ausgaben[ ausgabe.$.name ] = {
        value: ausgabe.$.value,
        type: ausgabe.$.type
      };
    }
  }

  return result;
}

