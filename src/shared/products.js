
exports.tickets = {
  name: "maytickets",
  content: {
    en: {
      title: "On the Path to Wholeness",
      subtitle: "29.4 – 1.5 2022",
      action: "Select the type of ticket"
    },
  },
  plans: [
    {
      content: {
        en: {
          name: "Regular Ticket",
          description: ["First bullet", "Second bullet", "3rd one"],
          button_label: "Select",
        }
      },
      flow: {
        type: "checkout"
      },
      payment_options: [
        {
          name: "pelecard",
          content: {
            en: {
              label: "Credit/Debit Card"
            }
          }
        },
        {
          name: "others",
          content: {
            en: {
              label: "Other payment type"
            }
          }
        }
      ],
      name: "regular",
      membership: false,
      order: 1,
      price: {
        usd: {
          amount: 30
        },
        nis: {
          amount: 100
        },
        eur: {
          amount: 25
        },
      },
      product: {
        SKU: '40033',
        reference: 'Convention',
        type: 'regular',
        productType: 't-0522-01',
        recurringFreq: 0,
        organization: 'ben2'
      }
    },
    {
      content: {
        en: {
          name: "Help Haver",
          description: ["First bullet", "Second bullet", "3rd one"],
          button_label: "Select",
          intersticial: {
            title: "Title",
            body: "Message",
            button: "Next"
          },
          redirect_url: "/dash/membership"
        }
      },
      flow: {
        type: "helphaver",
        intersticial: true
      },
      name: "membership",
      membership: false,
      order: 2,
      price: {
        usd: {
          amount: 30
        },
        nis: {
          amount: 100
        },
        eur: {
          amount: 25
        },
      },
      product: {
        SKU: '40033',
        reference: 'Convention',
        type: 'regular',
        productType: 't-0522-02-hp',
        recurringFreq: 0,
        organization: 'ben2'
      }
    },
    {
      content: {
        en: {
          name: "Help Haver",
          description: ["First bullet", "Second bullet", "3rd one"],
          button_label: "Select",
          intersticial: {
            title: "Title",
            body: "Message",
            button: "Next"
          },
          redirect_url: "/dash/membership"
        }
      },
      flow: {
        type: "redirect",
        intersticial: true
      },
      name: "membership",
      membership: false,
      order: 2,
      price: {
        usd: {
          amount: 30
        },
        nis: {
          amount: 100
        },
        eur: {
          amount: 25
        },
      },
    }
  ]
};

exports.convention = {
  language: {
    en: {
      header: {
        title: 'Convention Ticket',
        subtitle: 'January 2022',
        description: 'World Kabbalah Convention 2022'
      },
      body: {
        title: 'Description',
        description: 'Participation in the convention'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://convention.kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    ru: {
      header: {
        title: 'билет на конгресс',
        subtitle: 'Январь 2022 г.',
        description: 'Международный каббалистический конгресс 2022  '
      },
      body: {
        title: 'Описание',
        description: 'Участие в конгрессе'
      },
      cancel: {
        text: 'Отмена',
        url: 'https://kli.one/'
      },
      buttonText: 'Оплатить',
      termsLink: 'https://kli.one/terms'
    },
    es: {
      header: {
        title: 'Boleto del congreso',
        subtitle: 'Enero 2022',
        description: 'Congreso Mundial de Cabalá 2022'
      },
      body: {
        title: 'Descripción',
        description: 'Participación en el congreso'
      },
      cancel: {
        text: 'Cancelar',
        url: 'https://kli.one/'
      },
      buttonText: 'Pagar',
      termsLink: 'https://kli.one/terms'
    },
    he: {
      header: {
        title: 'כרטיס כנס',
        subtitle: 'ינואר 2022',
        description: 'כנס קבלה לעם הווירטואלי העולמי'
      },
      body: {
        title: 'תיאור',
        description: 'השתתפות בכנס'
      },
      cancel: {
        text: 'ביטול',
        url: 'https://kli.one/'
      },
      buttonText: 'תשלום ',
      termsLink: 'https://kli.one/terms'
    },
  },
  currency: {
    usd: {
      fixed: true,
      amount: 30,
      min: 10,
      max: 30,
      step: 1
    },
    eur: {
      fixed: true,
      amount: 25,
      min: 10,
      max: 100,
      step: 1
    },
    nis: {
      fixed: true,
      amount: 100,
      min: 10,
      max: 20,
      step: 1
    },
  },
  product: {
    SKU: '40033',
    reference: 'Convention',
    type: 'regular',
    productType: 'jan2022ticket',
    recurringFreq: 0,
    organization: 'ben2'
  }
};


exports.convention10 = {
  language: {
    en: {
      header: {
        title: 'Convention Ticket',
        subtitle: 'January 2022',
        description: 'World Kabbalah Convention 2022'
      },
      body: {
        title: 'Description',
        description: 'Participation in the convention'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://convention.kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    ru: {
      header: {
        title: 'билет на конгресс',
        subtitle: 'Январь 2022 г.',
        description: 'Международный каббалистический конгресс 2022  '
      },
      body: {
        title: 'Описание',
        description: 'Участие в конгрессе'
      },
      cancel: {
        text: 'Отмена',
        url: 'https://kli.one/'
      },
      buttonText: 'Оплатить',
      termsLink: 'https://kli.one/terms'
    },
    es: {
      header: {
        title: 'Boleto del congreso',
        subtitle: 'Enero 2022',
        description: 'Congreso Mundial de Cabalá 2022'
      },
      body: {
        title: 'Descripción',
        description: 'Participación en el congreso'
      },
      cancel: {
        text: 'Cancelar',
        url: 'https://kli.one/'
      },
      buttonText: 'Pagar',
      termsLink: 'https://kli.one/terms'
    },
    he: {
      header: {
        title: 'כרטיס כנס',
        subtitle: 'ינואר 2022',
        description: 'כנס קבלה לעם הווירטואלי העולמי'
      },
      body: {
        title: 'תיאור',
        description: 'השתתפות בכנס'
      },
      cancel: {
        text: 'ביטול',
        url: 'https://kli.one/'
      },
      buttonText: 'תשלום ',
      termsLink: 'https://kli.one/terms'
    },
  },
  currency: {
    usd: {
      fixed: true,
      amount: 10,
      min: 10,
      max: 30,
      step: 1
    },
    eur: {
      fixed: true,
      amount: 9,
      min: 10,
      max: 100,
      step: 1
    },
    nis: {
      fixed: true,
      amount: 35,
      min: 10,
      max: 20,
      step: 1
    },
  },
  product: {
    SKU: '40033',
    reference: 'Convention',
    type: 'regular',
    productType: 'jan2022ticket',
    recurringFreq: 0,
    organization: 'ben2'
  }
};


/** ***** */

exports.conventiontest = {
  language: {
    en: {
      header: {
        title: 'TEST PAYMENT',
        subtitle: 'recurring',
        description: 'From 10 to 1 - World Kabbalah Convention 2021 - 4-6 June 2021 - Arvut Hall, Virtual Home'
      },
      body: {
        title: 'Description',
        description: 'Participation in the convention'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://convention.kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    ru: {
      header: {
        title: 'билет на конгресс',
        subtitle: '4-6 ФЕВРАЛЯ 2021',
        description: 'Международный каббалистический конгресс 2021  '
      },
      body: {
        title: 'Описание',
        description: 'Участие в конгрессе'
      },
      cancel: {
        text: 'Отмена',
        url: 'https://kli.one/'
      },
      buttonText: 'Оплатить',
      termsLink: 'https://kli.one/terms'
    },
    es: {
      header: {
        title: 'Boleto del congreso',
        subtitle: '4-6 de junio 2021',
        description: 'Congreso Mundial de Cabalá JUNIO 2021'
      },
      body: {
        title: 'Descripción',
        description: 'Participación en el congreso'
      },
      cancel: {
        text: 'Cancelar',
        url: 'https://kli.one/'
      },
      buttonText: 'Pagar',
      termsLink: 'https://kli.one/terms'
    },
    he: {
      header: {
        title: 'כרטיס כנס',
        subtitle: '4-6-6 2021',
        description: 'כנס קבלה לעם הווירטואלי העולמי'
      },
      body: {
        title: 'תיאור',
        description: 'השתתפות בכנס'
      },
      cancel: {
        text: 'ביטול',
        url: 'https://kli.one/'
      },
      buttonText: 'תשלום ',
      termsLink: 'https://kli.one/terms'
    },
  },
  currency: {
    usd: {
      fixed: true,
      amount: 1,
      min: 10,
      max: 30,
      step: 1
    },
    eur: {
      fixed: true,
      amount: 1,
      min: 10,
      max: 100,
      step: 1
    },
    nis: {
      fixed: true,
      amount: 1,
      min: 10,
      max: 20,
      step: 1
    },
  },
  product: {
    SKU: '40037',
    reference: 'conventiontest',
    type: 'regular',
    productType: 'jan2022ticket',
    recurringFreq: 0,
    organization: 'ben2'
  }
};



/**********************************************************************/

exports.userfee = {
  language: {
    en: {
      header: {
        title: 'Maintenance Fee',
        subtitle: 'Virtual Home',
        description: 'A minimum user fee per month is necessary to sustain our Virtual Home. '
      },
      body: {
        title: 'Description',
        description: 'Payment is through auto debit - renewed automatically every month after the 20th of the month. An invoice will be emailed within two days of making the payment. If you would like to increase your monthly payment to expand our Virtual Home’s operations and to express extra appreciation for our efforts toward our common goal, you may use our Pay What You Wish system. We welcome extra contributions from those who are able to afford more. '
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    ru: {
      header: {
        title: 'Абонентская плата',
        subtitle: 'Виртуальный дом',
        description: 'Абонентская плата, необходимая для поддержания системы'
      },
      body: {
        title: 'Описание',
        description: 'Этот платеж производится методом прямого списания со счета и автоматически взимается ежемесячно с 20-го числа, до конца месяца. Квитанция будет отправлена по электронной почте в течение двух дней с момента оплаты. У вас есть возможность увеличить эту сумму, если вы хотите помочь нам в дальнейшем развитии системы и выразить признательность за наши усилия. Мы используем функцию «Платите, сколько пожелаете» для тех, кто может позволить себе больше.'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Оплатить',
      termsLink: 'https://kli.one/terms'
    },
    es: {
      header: {
        title: 'Tarifa de usuario',
        subtitle: 'Hogar Virtual',
        description: 'Una tarifa de usuario es necesaria para mantener nuestro Hogar Virtual.'
      },
      body: {
        title: 'Descripción',
        description: 'El pago se realiza mediante débito directo: se renueva automáticamente cada mes después del día 20 del mes. Recibirá una factura por correo electrónico dentro de los dos días posteriores a la realización del pago. Si desea aumentar la tarifa mensual de usuario para expandir las operaciones y plataformas de nuestro Hogar Virtual como un agradecimiento adicional por nuestros esfuerzos hacia la meta común, puede utilizar el sistema "Paga lo que desees", de manera que quienes puedan pagar más lo hagan.'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    he: {
      header: {
        title: 'דמי מנוי',
        subtitle: 'הבית הוויטואלי',
        description: 'תשלום של דמי משתמש חודשי לצורך קיום המערכת'
      },
      body: {
        title: 'תיאור',
        description: 'התשלום הינו תשלום בהוראת קבע - מתחדש באופן אוטומטי כל חודש לאחר ה-20 לחודש. חשבונית תתקבל במייל תוך יומיים מביצוע התשלום. אם תרצה להגדיל את התשלום החודשי בכדי לעזור לנו להרחיב את פעולת המערכת שלנו ולהראות הערכה נוספת למאמצינו, אתה יכול להשתמש ב"שלם לפי רצונך", כך שמי שיכול להרשות לעצמו לשלם יותר יכול לעשות זאת.'
      },
      cancel: {
        text: 'ביטול',
        url: 'https://kli.one/'
      },
      buttonText: 'תשלום',
      termsLink: 'https://kli.one/terms'
    },
  },
  currency: {
    usd: {
      fixed: false,
      amount: 10,
      min: 10,
      max: 200,
      step: 1
    },
    eur: {
      fixed: false,
      amount: 9,
      min: 9,
      max: 200,
      step: 10
    },
    nis: {
      fixed: false,
      amount: 35,
      min: 35,
      max: 500,
      step: 5
    },
  },
  product:{
    SKU: '40037',
    reference: 'Membership',
    type: 'recurring',
    productType: 'globalmembership',
    recurringFreq: 30,
    organization: 'ben2'
  }
};

/**********************************************************************/

exports.userfeeonetime = {
  language: {
    en: {
      header: {
        title: 'Maintenance Fee',
        subtitle: 'Virtual Home',
        description: 'A minimum user fee per month is necessary to sustain our Virtual Home. '
      },
      body: {
        title: 'Description',
        description: 'An invoice will be emailed within two days of making the payment. If you would like to increase your monthly payment to expand our Virtual Home’s operations and to express extra appreciation for our efforts toward our common goal, you may use our Pay What You Wish system. We welcome extra contributions from those who are able to afford more. '
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    ru: {
      header: {
        title: 'Абонентская плата',
        subtitle: 'Виртуальный дом',
        description: 'Абонентская плата, необходимая для поддержания системы'
      },
      body: {
        title: 'Описание',
        description: 'Квитанция будет отправлена по электронной почте в течение двух дней с момента оплаты. У вас есть возможность увеличить эту сумму, если вы хотите помочь нам в дальнейшем развитии системы и выразить признательность за наши усилия. Мы используем функцию «Платите, сколько пожелаете» для тех, кто может позволить себе больше.'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Оплатить',
      termsLink: 'https://kli.one/terms'
    },
    es: {
      header: {
        title: 'Tarifa de usuario',
        subtitle: 'Hogar Virtual',
        description: 'Una tarifa de usuario es necesaria para mantener nuestro Hogar Virtual.'
      },
      body: {
        title: 'Descripción',
        description: 'Recibirá una factura por correo electrónico dentro de los dos días posteriores a la realización del pago. Si desea aumentar la tarifa mensual de usuario para expandir las operaciones y plataformas de nuestro Hogar Virtual como un agradecimiento adicional por nuestros esfuerzos hacia la meta común, puede utilizar el sistema "Paga lo que desees", de manera que quienes puedan pagar más lo hagan.'
      },
      cancel: {
        text: 'Cancel',
        url: 'https://kli.one/'
      },
      buttonText: 'Pay',
      termsLink: 'https://kli.one/terms'
    },
    he: {
      header: {
        title: 'דמי מנוי',
        subtitle: 'הבית הוויטואלי',
        description: 'תשלום של דמי משתמש חודשי לצורך קיום המערכת'
      },
      body: {
        title: 'תיאור',
        description: ' חשבונית תתקבל במייל תוך יומיים מביצוע התשלום. אם תרצה להגדיל את התשלום החודשי בכדי לעזור לנו להרחיב את פעולת המערכת שלנו ולהראות הערכה נוספת למאמצינו, אתה יכול להשתמש ב"שלם לפי רצונך", כך שמי שיכול להרשות לעצמו לשלם יותר יכול לעשות זאת.'
      },
      cancel: {
        text: 'ביטול',
        url: 'https://kli.one/'
      },
      buttonText: 'תשלום',
      termsLink: 'https://kli.one/terms'
    },
  },
  currency: {
    usd: {
      fixed: false,
      amount: 10,
      min: 10,
      max: 200,
      step: 1
    },
    eur: {
      fixed: false,
      amount: 9,
      min: 9,
      max: 200,
      step: 10
    },
    nis: {
      fixed: false,
      amount: 35,
      min: 35,
      max: 500,
      step: 5
    },
  },
  product:{
    SKU: '40037',
    reference: 'Membership',
    type: 'regular',
    productType: 'globalmembership',
    recurringFreq: 0,
    organization: 'ben2'
  }
};
