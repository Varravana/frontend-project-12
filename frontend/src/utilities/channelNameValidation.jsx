import * as yup from 'yup'
import _ from 'lodash'



const makeSchema = (t, allChannels) => {
  const duplicateCheck = (value, allChannels) => {
  let channelsNames = []
  for (let key in allChannels) {
    channelsNames.push(allChannels[key].name)
  }
  const result = _.includes(channelsNames, value)
  if (result === false) {
    return true
  }
  else {
    return false
  }
}

  const schema = yup.object().shape({
      channelName: yup
        .string()
        .required(`${t('modals.yup.required')}`)
        .min(3, `${t('modals.yup.min3')}`)
        .max(20, `${t('modals.yup.max20')}`)
        .test('unique', `${t('modals.yup.unique')}`, (value) => {
          return duplicateCheck(value, allChannels)
        }),
    })
  return schema
}

export { makeSchema }
