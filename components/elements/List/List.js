import { Col, Typography } from 'antd'

import PropTypes from 'prop-types'
import { StyledRow } from './List.styled'
import { useTranslations } from 'contexts'

const List = (props) => {
  const {
    dataSource,
    renderItem,
    emptyProps,
    span = { xs: 24, sm: 12, md: 8, lg: 6 },
    gutter = [
      { xs: 16, sm: 16, md: 24 },
      { xs: 16, sm: 16, md: 24 }
    ],
    wrapperStyles,
    pagination
  } = props

  const { t } = useTranslations()

  const isEmpty = !dataSource?.length

  return (
    <StyledRow gutter={gutter} style={wrapperStyles}>
      {!isEmpty && renderItem && (
        <>
          {dataSource.map((item, index) => (
            <Col {...span} key={index}>
              {renderItem?.(item, index)}
            </Col>
          ))}
          {!isEmpty && renderItem && pagination && (
            <Col className="justify-center my-12" span={24}>
              {pagination}
            </Col>
          )}
        </>
      )}
      {isEmpty && !emptyProps?.hidden && (
        <Col span={24}>
          <Typography.Text variant="overline" type="secondary">
            {emptyProps?.message === undefined
              ? t('No items have been created yet')
              : emptyProps?.message}
          </Typography.Text>
        </Col>
      )}
    </StyledRow>
  )
}

List.propTypes = {
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  emptyProps: PropTypes.object,
  span: PropTypes.object,
  gutter: PropTypes.array,
  wrapperStyles: PropTypes.object,
  pagination: PropTypes.object
}

export default List
