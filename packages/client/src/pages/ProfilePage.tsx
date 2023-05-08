import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Profile from '../modules/profile'

const ProfilePage = () => {
  return (
    <LayoutWithHeader title="Settings">
      <Profile />
    </LayoutWithHeader>
  )
}

export default ProfilePage
