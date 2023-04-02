import styled from 'styled-components'
import Forum from '../ui/forum';

const ForumsList = () => {
    return (
        <Forums>
            <Forum forumName='New Games' forumPath='/forum/newgames' topics={222}/>
            <Forum forumName='Game designers' forumPath='#' topics={5}/>
            <Forum forumName='Technologies' forumPath='#' topics={590}/>
        </Forums>
    )
}

const Forums = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    list-style-type: none;
    width: 100%;
    padding: 0px 30px;
`

export default ForumsList
