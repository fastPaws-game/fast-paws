import Button from '../ui/button'
import styled from 'styled-components'
import ProfileAvatar from '../components/ProfileAvatar'
import BaseLayout from '../layouts/BaseLayout'
import { media } from '../assets/styles/media'
import { useNavigate } from 'react-router'
import ProfileForm from '../components/ProfileForm'

const ProfilePage = () => {
  const navigate = useNavigate()

  const handleClick = (path?: string) => () => {
    if (path) navigate(path)
  }

  return (
    <BaseLayout>
      <ButtonBack
        icon={<h1>&lt;</h1>}
        size={'small'}
        onClick={handleClick('/')}
      />
      <Profile>
        <Settings>
          <ProfileAvatar />
          {/* <div><input type={'checkbox'} onClick={themeToggler}/><label> Dark theme</label></div> ToDo: Theme check state */}
        </Settings>
        <ProfileForm />
      </Profile>
    </BaseLayout>
  )
}

const ButtonBack = styled(Button)`
  position: absolute;
  left: 2em;
  top: 2em;
`

const Settings = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 2em;
`

const Profile = styled.div`
  display: flex;
  justify-content: center;
  ${media.small} {
    flex-direction: column;
    align-items: center;
  }
`

export default ProfilePage
