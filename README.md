# bmf-steuerrechner-api
Provides a javascript api to access the Lohn- und Einkommensteuerrechner by the  Bundesministerium der Finanzen.
Reference: https://www.bmf-steuerrechner.de/index.jsp

It exposes three endpoints:
```javascript
function query( year, version, input )  {...}
function getVersionUrl( year, version ) {...}
function parseBMFResponse( response )   {...}
```

#### query
takes year, version (for some years, the BMF has published more than one calculation period), and input.
input being a {} containing legal values for PAP input.
e.g.:
- Lohnzahlungszeitraum (LZZ) = Jahr
- Einkommen (RE4) = 2500000 Cent
- Steuerklasse (STKL) = 1
```javascript
query( 2016, 0, { LZZ:1, STKL:1, RE4:2500000 } )
.then( result => console.log( result ) );
```
yields
```javascript
{ jahr: '2016',
  eingaben:
   { STKL: { value: '1', status: 'ok' },
     LZZ: { value: '1', status: 'ok' },
     RE4: { value: '2500000', status: 'ok' } },
  ausgaben:
   { BK: { value: '0', type: 'STANDARD' },
     BKS: { value: '0', type: 'STANDARD' },
     BKV: { value: '0', type: 'STANDARD' },
     LSTLZZ: { value: '267400', type: 'STANDARD' },
     SOLZLZZ: { value: '14707', type: 'STANDARD' },
     SOLZS: { value: '0', type: 'STANDARD' },
     SOLZV: { value: '0', type: 'STANDARD' },
     STS: { value: '0', type: 'STANDARD' },
     STV: { value: '0', type: 'STANDARD' },
     VKVLZZ: { value: '0', type: 'STANDARD' },
     VKVSONST: { value: '0', type: 'STANDARD' },
     VFRB: { value: '100000', type: 'DBA' },
     VFRBS1: { value: '0', type: 'DBA' },
     VFRBS2: { value: '0', type: 'DBA' },
     WVFRB: { value: '1177200', type: 'DBA' },
     WVFRBO: { value: '0', type: 'DBA' },
     WVFRBM: { value: '0', type: 'DBA' } } }
```

#### getVersionUrl
maps year and possible version to https://www.bmf-steuerrechner.de/interface/schnittstelle.jsp

#### parseBMFResponse
is a helper function to translate the json we get after converting the xml response.


## License
This project is licensed under the terms of the MIT license.
