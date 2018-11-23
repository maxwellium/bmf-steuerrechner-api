# bmf-steuerrechner-api
Provides a javascript api to access the Lohn- und Einkommensteuerrechner by the  Bundesministerium der Finanzen.
Reference: https://www.bmf-steuerrechner.de/interface/einganginterface.xhtml

It exposes the endpoint:
```typescript
export async function bmf(
  input: {
    [ k: string ]: number
  },
  year: number,
  month?: number
): Promise<BMFResponse>
```

#### signature
takes input, year and month. For some years, the BMF has published more than one calculation period; otherwise month is optional. Months range is 1..12.
input being a {} containing legal values for PAP input.
e.g.:
- Lohnzahlungszeitraum (LZZ) = 1 (Jahr)
- Einkommen (RE4) = 2500000 (Cent)
- Steuerklasse (STKL) = 1
```javascript
const result = await bmf( { LZZ:1, STKL:1, RE4:2500000 }, 2016 );
console.log( result );
```
yields
```javascript
{ jahr: '2016',
  eingaben:
   { LZZ: { value: '1', status: 'ok' },
     STKL: { value: '1', status: 'ok' },
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

## License
This project is licensed under the terms of the MIT license.
