import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Forum from '../modules/forums/Forum'
import catImg from '../assets/images/bigCat.png'
import styled from 'styled-components'
import { media } from '../assets/styles/media'
import ForumApi from '../api/ForumApi'

const ForumPage = () => {
  const handleClick = () => {
    ForumApi.getForums()
  }
  return (
    <LayoutWithHeader title="Forums">
      <Forum />
      <button onClick={handleClick}>Forums</button>
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
