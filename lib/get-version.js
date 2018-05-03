function getVersion(year, month) {
  switch (year) {
    case 2006:
    case 2007:
    case 2008:
    case 2009:
    case 2010:
      return String(year);
    case 2011:
      return 12 === month ? '2011Dez' : '2011bisNov';
    case 2012:
    case 2013:
    case 2014:
      return String(year);
    case 2015:
      return 12 === month ? '2015Dez' : '2015bisNov';
    case 2016:
      return '2016V1';
    case 2017:
      return 'LSt2017';
    case 2018:
      return 'LSt2018';
    default:
      throw 'version not implemented';
  }
}

module.exports = getVersion;
