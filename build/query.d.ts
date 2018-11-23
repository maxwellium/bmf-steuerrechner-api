/// <reference types="node" />
import { RequestOptions } from 'https';
export declare function query(options: RequestOptions, input: {
    [k: string]: number;
}): Promise<string>;
