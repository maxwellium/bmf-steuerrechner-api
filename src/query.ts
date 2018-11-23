import { get, RequestOptions } from 'https';
import { stringify } from 'querystring';
import { CODE } from './get-version';


export function query(
  options: RequestOptions,
  input: {
    [ k: string ]: number
  }
): Promise<string> {

  const parameters = { code: CODE, ...input };
  options.path = options.path + stringify( parameters );

  return new Promise( ( resolve, reject ) => {

    get( options, response => {

      if ( 200 !== response.statusCode ) {
        reject( response.statusCode );
        response.resume();
        return;
      }

      let data = '';
      response.setEncoding( 'utf8' );
      response.on( 'error', reject );
      response.on( 'data', chunk => data += chunk );

      response.on( 'end', () => resolve( data ) );
    } )
      .on( 'error', err => reject( err ) )
  } )
};
