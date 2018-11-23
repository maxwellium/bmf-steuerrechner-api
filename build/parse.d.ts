export interface XMLResponse {
    lohnsteuer: {
        $: {
            jahr: string;
        };
        eingaben: {
            eingabe: {
                $: {
                    name: string;
                    value: string;
                    status: string;
                };
            }[];
        }[];
        ausgaben: {
            ausgabe: {
                $: {
                    name: string;
                    value: string;
                    type: string;
                };
            }[];
        }[];
    };
}
export interface BMFResponse {
    jahr: string;
    eingaben: {
        [e: string]: {
            value: string;
            status: string;
        };
    };
    ausgaben: {
        [e: string]: {
            value: string;
            type: string;
        };
    };
}
export declare function parse(xml: string): Promise<BMFResponse>;
export declare function parseBMFResponse(response: XMLResponse): BMFResponse;
