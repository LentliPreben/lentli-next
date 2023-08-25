/* eslint-disable react/prop-types */
import { Col, Typography, theme } from 'antd'
import Image from 'next/image'

export const StyledIcon = (props) => {
  const { titleSize, alt, ...rest } = props

  const {
    token: {
      fontSizeHeading2,
      fontSizeHeading3,
      fontSizeHeading4,
      fontSizeHeading5
    }
  } = theme.useToken()

  const iconsSize = [
    fontSizeHeading2,
    fontSizeHeading3,
    fontSizeHeading4,
    fontSizeHeading5
  ]
  const computeIconSize = iconsSize[Number(titleSize) - 1]

  return (
    <Image
      src={infoCircle}
      width={computeIconSize}
      height={computeIconSize}
      alt={alt}
      {...rest}
    />
  )
}

export const ActionsColStyled = (props) => {
  const { children, ...rest } = props

  return (
    <Col className="flex align-center justify-end flex-auto ml-16" {...rest}>
      {children}
    </Col>
  )
}

export const StyledSubtitle = (props) => {
  const {
    token: { colorTextSecondary }
  } = theme.useToken()

  return <Typography.Text style={{ color: colorTextSecondary }} {...props} />
}

export const PageHeaderWrapper = (props) => {
  const { children } = props
  const { colorFillSecondary } = theme.useToken().token
  const wrapperStyles = {
    background: 'white',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    borderBottom: `1px solid ${colorFillSecondary}`
  }
  return <div style={wrapperStyles}>{children}</div>
}
