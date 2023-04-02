import { FC } from 'react'
import styled from 'styled-components'
import Link from '../link';

export type Props = {
    topicName: string;
    topicPath: string;
    comments: number;
    userName: string;
    userPath: string;
    date: string;
}

const Topic: FC<Props> = (props) => {
    const { topicName, topicPath, comments, userName, userPath, date } = props;

    return (
        <TopicItem>
            <Link to={topicPath}>{topicName}</Link>
            <Topics>Comments: {comments}</Topics>
            <LastMessage>
                <UserName to={userPath}>{userName}</UserName>
                <Date>{date}</Date>
            </LastMessage>
        </TopicItem>
    )
}

const TopicItem = styled.li`
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    padding: 10px;
    width: 100%;
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.focus};
    }
`

const Topics = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
`

const LastMessage = styled.div`
    display: flex;
    gap: 15px;
`

const UserName = styled(Link)`
    color: ${({ theme }) => theme.text.textInvert} !important;
    font-weight: 600;
`

const Date = styled.span`
    color: ${({ theme }) => theme.text.textInvert};
`

export default Topic
