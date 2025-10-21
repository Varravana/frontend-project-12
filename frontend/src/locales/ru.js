export default {
    translation: {
        channelsButtons: {
            delete: 'Удалить',
            rename: 'Переименовать',
        },
        exitButton: {
            exit: 'Выйти'
        },
        inputMessageForm: {
            placeholder: 'Введите сообщение...'
        },
        loginPage: {
            h1: 'Войти',
            labelName: 'Ваш ник',
            labelPassword: 'Пароль',
            error: 'Неверные пароль или логин',
            submitButton: 'Войти',
            noAkk: 'Нет аккаунта? ',
            registration: 'Регистрация'
        },
        mainPage: {
            channelsHead: 'Каналы',
            messageCount: {
                'key_one': "{{count}} сообщение",
                'key_few': "{{count}} сообщения",
                'key_many': "{{count}} сообщений",
                'key_other': "{{count}} сообщений"
            }
        },
        notFoundPage: {
            h3: 'Страница не найдена',
            span: 'Но вы можете перейти ',
            href: 'на главную страницу'
        },
        signupPage: {
            yup: {
                required: 'Обязательное поле',
                min3: 'Минимум 3 символа',
                max20: 'Максимум 20 символов',
                min6: 'Минимум 6 символов',
                passwordMatch: 'Пароли должны совпадать'
            },
            serverError: {
                userExists: 'Такой пользователь уже существует',
                errorRegistration: 'Произошла ошибка при регистрации'
            },
            form: {
                h1: 'Регистрация',
                labelName: 'Имя пользователя',
                labelPassword: 'Пароль',
                labelPasswordConfirm: 'Подтвердите пароль',
                submitButton: 'Зарегистрироваться'
            }
        }
    },
}