import { BMFResponse } from './parse';
export declare function bmf(input: {
    [k: string]: number;
}, year: number, month?: number): Promise<BMFResponse>;
export { BMFResponse };
