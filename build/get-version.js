"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOSTNAME = 'www.bmf-steuerrechner.de';
exports.CODE = 'Lohn2018';
function getVersionOptions(year, month) {
    let hostname = exports.HOSTNAME, version;
    switch (year) {
        case 2011:
        case 2015:
            version = 12 === month ? `${year}DezVersion1` : `${year}bisNovVersion1`;
            break;
        case 2006:
        case 2007:
        case 2008:
        case 2009:
        case 2010:
        case 2012:
        case 2013:
        case 2014:
        case 2016:
        case 2017:
        case 2018:
            version = `${year}Version1`;
            break;
        default:
            throw 'version not implemented';
    }
    return {
        hostname,
        path: `/interface/${version}.xhtml?`
    };
}
exports.getVersionOptions = getVersionOptions;
//# sourceMappingURL=get-version.js.map