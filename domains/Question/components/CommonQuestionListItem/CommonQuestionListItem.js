import { Title, Text } from 'components'
import { useTranslations } from 'contexts'

const CommonQuestionListItem = (props) => {
  const { question, answer, number } = props

  const { t } = useTranslations()

  return (
    <div className="row">
      <div className="col-auto">
        <div className="question-number">
          <Text variant="body2">{number}</Text>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="col-12 mb-1">
            <Title as="h5">{t(question)}</Title>
          </div>
          <div className="col-12">
            <Text variant="body2" secondary>
              {t(answer)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonQuestionListItem
