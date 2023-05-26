import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Forum from '../modules/forums/Forum'
import catImg from '../assets/images/bigCat.png'
import styled from 'styled-components'
import { media } from '../assets/styles/media'

const ForumPage = () => {
  return (
    <LayoutWithHeader title="Forums">
      <Forum />
      <IMG src={catImg} />
    </LayoutWithHeader>
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
