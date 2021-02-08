class Currency {
  id;
  name;
  sign;

  constructor(id, sign) {
    this.id = id;
    this.i18nKey = `currencies.${id}`;
    this.sign = sign;
  }
}

export const currencies = [
  new Currency('usd', '$'),
  new Currency('eur', '€'),
  new Currency('nis', '₪'),
];
