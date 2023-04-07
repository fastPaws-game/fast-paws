import ProfileAvatar from '../components/ProfileAvatar'
import ProfileForm from '../components/ProfileForm'
import LayoutWithHeader from '../layouts/LayoutWithHeader'

const ProfilePage = () => {
  return (
    <LayoutWithHeader title="Profile">
      {/* <div><input type={'checkbox'} onClick={themeToggler}/><label> Dark theme</label></div> ToDo: Theme check state */}
      <ProfileAvatar />
      <ProfileForm />
    </LayoutWithHeader>
  )
}

export default ProfilePage
