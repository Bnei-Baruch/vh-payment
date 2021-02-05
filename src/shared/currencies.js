class Currency {
  id;
  name;
  sign;

  constructor(id, sign) {
    this.id = id;
    this.i18nKey = `currencies.${id.toLowerCase()}`;
    this.sign = sign;
  }
}

export const currencies = [
  new Currency('USD', '$'),
  new Currency('EUR', '€'),
  new Currency('NIS', '₪'),
];
