import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Forum from '../modules/forums/Forum'
import catImg from '../assets/images/bigCat.png'
import styled from 'styled-components'

const ForumPage = () => {
    return (
        <LayoutWithHeader title='Forums'>
            <Forum />
            <IMG src={catImg} />
        </LayoutWithHeader>
    )
}

const IMG = styled.img`
    position: absolute;
    z-index: -1;
    bottom: 0%;
    left: 50%;
`

export default ForumPage
