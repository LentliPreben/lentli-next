import { COMMON_QUESTIONS } from '__constants__'
import { CommonQuestionListItem } from 'domains/Question/components'

const CommonQuestionsList = () => (
  <div className="common-questions-wrapper">
    {COMMON_QUESTIONS?.map(({ question, answer }, index) => (
      <CommonQuestionListItem
        key={question}
        question={question}
        answer={answer}
        number={index + 1}
      />
    ))}
  </div>
)

export default CommonQuestionsList
