exports.convention = {
  language: {
    en: {
      header: {
        title: 'Convention Ticket',
        subtitle: 'February 2021',
        description: 'Discovering Life in the Ten - World Kabbalah Convention 2021 - 25-28 February 2021 - Arvut Hall, Virtual Home'
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
      termsLink: 'https://kli.one/tos'
    },
    ru: {
      header: {
        title: 'билет на конгресс',
        subtitle: '25-28 ФЕВРАЛЯ 2021',
        description: 'Международный каббалистический конгресс 2021 - Раскрываем жизнь в десятке'
      },
      body: {
        title: 'Описание',
        description: 'Участие в конгрессе'
      },
      cancel: {
        text: 'Отмена',
        url: 'https://kli.one/'
      },
      buttonText: 'Плати',
      termsLink: 'https://kli.one/tos'
    },
    es: {
      header: {
        title: 'Boleto del congreso',
        subtitle: '25-28 de Febrero 2021',
        description: 'Congreso Mundial de Cabalá 2021 || Descubriendo la Vida en la Decena'
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
      termsLink: 'https://kli.one/tos'
    },
    he: {
      header: {
        title: 'כרטיס כנס',
        subtitle: 'פברואר 2021',
        description: 'כנס קבלה לעם הווירטואלי העולמי | לגלות את החיים בעשירייה'
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
      termsLink: 'https://kli.one/tos'
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
  product:{
    SKU: '40033',
    reference: 'Convention',
    type: 'regular',
    productType: 'feb2021ticket',
    recurringFreq: '0',
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
      termsLink: 'https://kli.one/tos'
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
      buttonText: 'Плати',
      termsLink: 'https://kli.one/tos'
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
      termsLink: 'https://kli.one/tos'
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
      termsLink: 'https://kli.one/tos'
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
    product:{
      SKU: '40037',
      reference: 'Membership',
      type: 'recurring',
      productType: 'globalmembership',
      recurringFreq: '30',
      organization: 'ben2'
    }
  }
};