"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_version_1 = require("./get-version");
const query_1 = require("./query");
const parse_1 = require("./parse");
async function bmf(input, year, month) {
    const xml = await query_1.query(get_version_1.getVersionOptions(year, month), input);
    return await parse_1.parse(xml);
}
exports.bmf = bmf;
//# sourceMappingURL=index.js.map