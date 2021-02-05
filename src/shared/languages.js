class Language {
  id;
  i18nKey;
  dir;

  constructor(id, dir = 'ltr') {
    this.id = id;
    this.i18nKey = `languages.${id}`;
    this.dir = dir;
  }
}

export const languages = [
  new Language('en'),
  new Language('ru'),
  new Language('es'),
  new Language('he', 'rtl')
];
