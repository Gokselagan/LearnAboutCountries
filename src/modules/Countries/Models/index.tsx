export interface Countries {
    name: {
        [key: string]: string;
    };
    independent: boolean;
    unMember: boolean;
    currencies: {
       [currency:string]:{
        name:string;
        symbol:string;
       }
    };
    capital: string;
    region: string;
    borders?: string[];
    flags: {
        [key: string]: string;
    }
    maps: {
        googleMaps: string;
    }
    population: number;
    car: {
        signs: string;
        side: string;
    }
    timezones: string[];
    continents?: string[];
    cca2: string;
    languages?: {
        [key:string]: string[];
    };
}