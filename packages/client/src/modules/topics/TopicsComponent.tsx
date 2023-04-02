import { FC } from 'react'
import styled from 'styled-components'
import IconBack from '../../assets/icons/IconBack'
import { H1 } from '../../assets/styles/texts'
import Button from '../../ui/button'
import TopicsList from '../../components/TopicsList'
import topics from '../../utils/testForumData'
// import AddNewTopic from '../../components/AddNewTopic'

type Props = {
    forumName: string;
}

const TopicsComponent: FC<Props> = (props) => {
    const { forumName } = props;
    return (
        <Container>
            <Header>
                <ButtonStyled icon={IconBack}></ButtonStyled>
                <H1>{forumName}</H1>
                <Button>+ Add new topic</Button>
            </Header>
            {/* Данные для демонстрации верстки */}
            <TopicsList topics={topics}></TopicsList>
            {/* <AddNewTopic visible outSideClickEnable handleClose={() => console.log('close')} handleSubmit={() => console.log('submit')}></AddNewTopic> */}
        </Container>
    )
}

const Container = styled.main`
    width: 100vw;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 45px;
    width: 90%;
    padding: 20px 0px;
    
    button:last-of-type {
        margin-left: auto !important;
    }
`

const ButtonStyled = styled(Button)`
    background-color: ${({ theme }) => theme.colors.accent} !important;
`

export default TopicsComponent
