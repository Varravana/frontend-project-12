import * as yup from 'yup'

const makeSchema = (t) => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .min(3, `${t('signupPage.yup.min3')}`)
      .max(20, `${t('signupPage.yup.max20')}`),
    password: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .min(6, `${t('signupPage.yup.min6')}`),
    confirmpassword: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .test('password-match', `${t('signupPage.yup.passwordMatch')}`, function (value) {
        const password = this.parent.password
        return value === password
      }),
  })
  return schema
}

export { makeSchema }
