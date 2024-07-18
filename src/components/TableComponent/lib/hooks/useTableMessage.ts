import { useTranslation } from 'react-i18next'

type GetMessageFn = (conditionOfZeroData: boolean, queryParameters: null | string) => string

export const useTableMessage = () => {
  const { t } = useTranslation()

  const getMessage: GetMessageFn = (conditionOfZeroData, queryParameters) => {
    if (conditionOfZeroData) {
      return queryParameters
        ? `${t('tableComponentWithTypes.noContent')}...`
        : `${t('tableComponentWithTypes.pleaseAddAnyData')}`
    }

    return `${t('tableComponentWithTypes.unknownCondition')}`
  }

  return {
    getMessage,
  }
}
