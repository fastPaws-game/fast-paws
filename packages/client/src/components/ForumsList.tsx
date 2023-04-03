import styled from 'styled-components'
import { FC } from 'react';
import ForumItem from '../ui/forum';

type ForumData = {
    name: string;
    id: number;
    path: string;
    topics: number;
}

type Props = {
    forums: Array<ForumData>
}

const ForumsList: FC<Props> = (props) => {
    const {forums} = props;

    return (
        <ListWrapper>
            {forums.map(forum => <ForumItem forumName={forum.name} key={forum.id} forumPath={forum.path} topics={forum.topics} />)}
        </ListWrapper>
    )
}

const ListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    list-style-type: none;
    width: 100%;
    padding: 0px 30px;
`

export default ForumsList
