import { Authorization } from '../modules/authModule/Authorization'
import BaseLayout from '../layouts/BaseLayout'

const AuthPage = () => {
  return (
    <BaseLayout>
      <Authorization />
    </BaseLayout>
  )
}

export default AuthPage
