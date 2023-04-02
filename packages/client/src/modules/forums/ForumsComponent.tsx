import styled from 'styled-components'
import IconBack from '../../assets/icons/IconBack'
import { H1 } from '../../assets/styles/texts'
import Button from '../../ui/button'
import ForumsList from '../../components/ForumsList'

const ForumsComponent = () => {
    return (
        <Container>
            <Header>
                <ButtonStyled icon={IconBack}></ButtonStyled>
                <H1>Forums</H1>
            </Header>
            <ForumsList />
        </Container>
    )
}

const Container = styled.main`
    width: 100vw;   
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    z-index: 10;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 45px;
    width: 100%;
    padding: 30px;
`

const ButtonStyled = styled(Button)`
    background-color: ${({ theme }) => theme.colors.accent} !important;
`

export default ForumsComponent
