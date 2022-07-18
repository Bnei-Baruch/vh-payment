class Language {
  id;
  i18nKey;
  dir;
  flag;
  country;

  constructor(id, country, dir = "ltr", flag) {
    this.id = id;
    this.i18nKey = `languages.${id}`;
    this.dir = dir;
    this.flag = flag || `${id}.png`;
    this.country = country || id;
  }
}

export const languages = [
  new Language("en", "gb", "ltr", "us.png"),
  new Language("ru"),
  new Language("es"),
  new Language("he", "il", "rtl", "il.png"),
];
