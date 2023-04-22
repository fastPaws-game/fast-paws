import RequireAuth from '../hocs/RequireAuth'
import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Profile from '../modules/profile'

const ProfilePage = () => {
  return (
    <RequireAuth>
      <LayoutWithHeader title="Settings">
        <Profile />
      </LayoutWithHeader>
    </RequireAuth>
  )
}

export default ProfilePage
