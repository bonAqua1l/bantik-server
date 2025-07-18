import Icon from '@ant-design/icons'

const LogoMini = () => {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20.6L18.3138 15.8V6.19999L10 1.39999L1.68616 6.19999V15.8L10 20.6ZM10 20.6V11.6M10 11.6L2.2 6.79999M10 11.6L17.8 6.79999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const QStorageLogoMini = (props) => <Icon component={LogoMini} {...props} />

export default QStorageLogoMini
