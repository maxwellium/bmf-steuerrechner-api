/// <reference types="node" />
import { RequestOptions } from "https";
export declare const HOSTNAME = "www.bmf-steuerrechner.de";
export declare const CODE = "Lohn2018";
export declare function getVersionOptions(year: number, month?: number): RequestOptions;
