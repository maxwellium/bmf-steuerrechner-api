import { getVersionOptions } from './get-version';
import { query } from './query';
import { parse, BMFResponse } from './parse';

export async function bmf(
  input: {
    [ k: string ]: number
  },
  year: number,
  month?: number
): Promise<BMFResponse> {
  const xml = await query( getVersionOptions( year, month ), input );
  return await parse( xml );
}
