import PropTypes from 'prop-types'
import { StyledRow } from './List.styled'
import { useTranslations } from 'contexts'
import { Text } from 'components'

const List = (props) => {
  const {
    dataSource,
    renderItem,
    emptyProps,
    columnClass = 'col-12 col-sm-6 col-md-4 col-xl-3',
    wrapperStyles,
    pagination
  } = props

  const { t } = useTranslations()

  const isEmpty = !dataSource?.length

  return (
    <StyledRow className="row gap-y-24" style={wrapperStyles}>
      {!isEmpty && renderItem && (
        <>
          {dataSource.map((item, index) => (
            <div className={columnClass} key={index}>
              {renderItem?.(item, index)}
            </div>
          ))}
          {!isEmpty && renderItem && pagination && (
            <div className="col-12 justify-center my-12">{pagination}</div>
          )}
        </>
      )}
      {isEmpty && !emptyProps?.hidden && (
        <div className="col-12">
          <Text variant="overline" secondary>
            {emptyProps?.message === undefined
              ? t('No items have been created yet')
              : emptyProps?.message}
          </Text>
        </div>
      )}
    </StyledRow>
  )
}

List.propTypes = {
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  emptyProps: PropTypes.object,
  gutter: PropTypes.array,
  wrapperStyles: PropTypes.object,
  pagination: PropTypes.object
}

export default List
