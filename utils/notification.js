import 'antd-notifications-messages/lib/styles/style.css'
import { notification as antdNotification } from 'antd-notifications-messages'

const notification = ({ type, message, title }) => {
  antdNotification({
    type,
    title,
    message
  })
}

export default notification
