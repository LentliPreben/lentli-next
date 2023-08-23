import { Avatar as AntdAvatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Avatar = (props) => {
  return <AntdAvatar icon={<UserOutlined />} size={156} {...props} />
}

export default Avatar
