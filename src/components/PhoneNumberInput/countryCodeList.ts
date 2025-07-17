type Code = `+${number | string}`;

export type CountryCodeConfig = {
  /**
   * Unicode flag emoji representation (e.g., "🇫🇷" for France)
   */
  flag: string;
  /**
   * Country dialing code (e.g., "+33" for France).
   * A template literal type that ensures all country codes start
   * with a + symbol, followed by numbers or other characters.
   */
  code: Code;
  /**
   * Full country name
   */
  name: string;
  /**
   * Optional formatting pattern for phone numbers
   * @example
   * mask: '__-___-____'
   */
  mask?: string;
};

export const countryCodeList: CountryCodeConfig[] = [
  {
    flag: '🇺🇸',
    code: '+1',
    name: 'United States',
    mask: '(___) ___-____'
  },
  {
    flag: '🇳🇿',
    code: '+64',
    name: 'New Zealand',
    mask: '(___) ___-___',
  },
  {
    flag: '🇵🇹',
    code: '+351',
    name: 'Portugal',
    mask: '__-___-____',
  },
  {
    flag: '🇺🇬',
    code: '+256',
    name: 'Uganda',
  },
  {
    flag: '🇸🇪',
    code: '+46',
    name: 'Sweden',
    mask: '__-___-___-__',
  },
  {
    flag: '🇹🇭',
    code: '+66',
    name: 'Thailand',
  },
  {
    flag: '🇺🇿',
    code: '+998',
    name: 'Uzbekistan',
  },
  {
    flag: '🇫🇷',
    code: '+33',
    name: 'France',
    mask: '__ __ __ __ __',
  },
  {
    flag: '🇦🇲',
    code: '+374',
    name: 'Armenia',
    mask: '__-___-___',
  },
  {
    flag: '🇬🇪',
    code: '+995',
    name: 'Georgia',
    mask: '(___) ___-___',
  },
  {
    flag: '🇲🇦',
    code: '+212',
    name: 'Morocco',
    mask: '___ __ __ __',
  },
  // Increase ListboxButton width to support long country c
  // {
  //   flag: '🇻🇨',
  //   code: '+1-784',
  //   name: 'Saint Vincent and the Grenadines',
  // },
];
