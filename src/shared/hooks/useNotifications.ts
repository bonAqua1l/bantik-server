import { message } from 'antd'

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showError = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    })
  }

  const showInfo = (message: string) => {
    messageApi.open({
      type: 'info',
      content: message,
    })
  }

  const showLoading = (message: string) => {
    messageApi.open({
      type: 'loading',
      content: message,
    })
  }

  const showSuccess = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    })
  }

  const showWarning = (message: string) => {
    messageApi.open({
      type: 'warning',
      content: message,
    })
  }

  return {
    showError,
    showInfo,
    showLoading,
    showSuccess,
    showWarning,
    contextHolder,
  }
}

export default useNotification
