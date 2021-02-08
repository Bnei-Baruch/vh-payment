class Language {
  id;
  i18nKey;
  dir;
  flag;

  constructor(id, dir = 'ltr', flag) {
    this.id = id;
    this.i18nKey = `languages.${id}`;
    this.dir = dir;
    this.flag = flag || `${id}.png`
  }
}

export const languages = [
  new Language('en', 'ltr', 'us.png'),
  new Language('ru'),
  new Language('es'),
  new Language('he', 'rtl', 'il.png')
];
