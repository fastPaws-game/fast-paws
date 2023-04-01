import { Authorization } from '../modules/authModule'
import BaseLayout from '../layouts/BaseLayout'

const AuthPage = () => {
  return (
    <BaseLayout>
      <Authorization />
    </BaseLayout>
  )
}

export default AuthPage
