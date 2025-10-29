export default {
  translation: {
    channelsButtons: {
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    exitButton: {
      exit: 'Выйти',
    },
    inputMessageForm: {
      placeholder: 'Введите сообщение...',
    },
    loginPage: {
      h1: 'Войти',
      labelName: 'Ваш ник',
      labelPassword: 'Пароль',
      error: 'Неверные имя пользователя или пароль',
      submitButton: 'Войти',
      noAkk: 'Нет аккаунта? ',
      registration: 'Регистрация',
    },
    mainPage: {
      channelsHead: 'Каналы',
      messageCount: {
        'key_one': '{{count}} сообщение',
        'key_few': '{{count}} сообщения',
        'key_many': '{{count}} сообщений',
        'key_other': '{{count}} сообщений',
      },
    },
    notFoundPage: {
      h3: 'Страница не найдена',
      span: 'Но вы можете перейти ',
      href: 'на главную страницу',
    },
    signupPage: {
      yup: {
        required: 'Обязательное поле',
        min3: 'От 3 до 20 символов',
        max20: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
      },
      serverError: {
        userExists: 'Такой пользователь уже существует',
        errorRegistration: 'Произошла ошибка при регистрации',
      },
      form: {
        h1: 'Регистрация',
        labelName: 'Имя пользователя',
        labelPassword: 'Пароль',
        labelPasswordConfirm: 'Подтвердите пароль',
        submitButton: 'Зарегистрироваться',
      },
    },
    toast: {
      channels: {
        makeChannel: 'Канал создан',
        deleteChannel: 'Канал удалён',
        renameChannel: 'Канал переименован',
      },
      errors: {
        loadChannelsError: 'Ошибка загрузки каналов',
        loadMessagesError: 'Ошибка загрузки сообщений',
        netError: 'Ошибка соединения',
      },
    },
    modals: {
      yup: {
        required: 'Обязательное поле',
        min3: 'От 3 до 20 символов',
        max20: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
      modalAdd: {
        title: 'Добавить канал',
        submitButton: 'Отправить',
        canselButton: 'Отменить',
      },
      modalDelete: {
        title: 'Удалить канал',
        body: 'Уверены?',
        submitButton: 'Удалить',
        canselButton: 'Отменить',
      },
      modalRename: {
        title: 'Переименовать канал',
        submitButton: 'Отправить',
        canselButton: 'Отменить',
      },
    },
  },
}
