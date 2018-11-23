"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const querystring_1 = require("querystring");
const get_version_1 = require("./get-version");
function query(options, input) {
    const parameters = Object.assign({ code: get_version_1.CODE }, input);
    options.path = options.path + querystring_1.stringify(parameters);
    return new Promise((resolve, reject) => {
        https_1.get(options, response => {
            if (200 !== response.statusCode) {
                reject(response.statusCode);
                response.resume();
                return;
            }
            let data = '';
            response.setEncoding('utf8');
            response.on('error', reject);
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(data));
        })
            .on('error', err => reject(err));
    });
}
exports.query = query;
;
//# sourceMappingURL=query.js.map