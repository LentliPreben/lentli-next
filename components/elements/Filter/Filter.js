import { Button, Typography, theme } from 'antd'
import { StyledFilter, StyledHeader, BlurBox } from './Filter.styled'

import { CloseOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import { Spinner } from 'components'

const Filter = (props) => {
  const {
    filterVisibility,
    setFilterVisibility,
    children,
    title,
    withTitle = false,
    noShadow,
    loading
  } = props

  const { t } = useTranslations()
  /* Getting colorBgContainer from theme */
  const { colorBgContainer } = theme.useToken().token

  /* Closing filter */
  const handleClose = () => setFilterVisibility(false)

  if (!filterVisibility) return null

  return (
    <>
      {withTitle && (
        <StyledHeader>
          <Typography.Title level={3}>{title || t('Filter')}</Typography.Title>
          <Button
            type="text"
            shape="circle"
            onClick={handleClose}
            icon={<CloseOutlined />}
          />
        </StyledHeader>
      )}
      <StyledFilter
        background={colorBgContainer}
        allRounded={!withTitle}
        noShadow={noShadow}>
        {children}

        {loading && (
          <BlurBox>
            <Spinner />
          </BlurBox>
        )}
      </StyledFilter>
    </>
  )
}

Filter.propTypes = {
  filterVisibility: PropTypes.bool,
  setFilterVisibility: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  withTitle: PropTypes.bool,
  noShadow: PropTypes.bool,
  loading: PropTypes.bool
}

export default Filter
