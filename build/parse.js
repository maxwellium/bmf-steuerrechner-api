"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
async function parse(xml) {
    const obj = await new Promise((resolve, reject) => xml2js_1.parseString(xml, (err, result) => err ? reject(err) : resolve(result)));
    return await parseBMFResponse(obj);
}
exports.parse = parse;
function parseBMFResponse(response) {
    const result = {
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
exports.parseBMFResponse = parseBMFResponse;
//# sourceMappingURL=parse.js.map