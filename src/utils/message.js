import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const errorMessage = (title, message) => {
    MySwal.fire(
    {
      title:title,
      html: message,
      icon: 'error',
    }
    // `${title}`,
    // `${messageTitle}`,
    // 'error'
  )
}

export const successMessage = (success, messageSuccess) => {
  return MySwal.fire(
    `${success}`,
    `${messageSuccess}`,
    'success'
  )
}
