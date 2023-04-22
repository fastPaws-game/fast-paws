import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Forum from '../modules/forums/Forum'
import catImg from '../assets/images/bigCat.png'
import styled from 'styled-components'
import { media } from '../assets/styles/media'
import RequireAuth from '../hocs/RequireAuth'

const ForumPage = () => {
  return (
    <RequireAuth>
      <LayoutWithHeader title="Forums">
        <Forum />
        <IMG src={catImg} />
      </LayoutWithHeader>
    </RequireAuth>
  )
}

const IMG = styled.img`
  position: absolute;
  bottom: 0%;
  left: 40%;

  ${media.middle} {
    display: none;
  }
`

export default ForumPage
