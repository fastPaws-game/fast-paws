import { FC } from 'react'
import styled from 'styled-components'
import Topic, { Props as TopicProps } from '../ui/topic';

type Props = {
    topics?: Array<TopicProps>;
}

const TopicsList: FC<Props> = (props) => {
    const { topics } = props;

    return topics ?
        (
            <TopicsContainer>
                <Topics>
                    {topics.map((topic) => {
                        return (<Topic
                            topicName={topic.topicName}
                            topicPath={topic.topicPath}
                            comments={topic.comments}
                            userName={topic.userName}
                            userPath={topic.userPath}
                            date={topic.date} />)
                    })}
                </Topics>
            </TopicsContainer>
        ) : (<TopicsContainer />)
}

const TopicsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    height: 80vh;   
`

const Topics = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    list-style-type: none;
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    width: 90%;
    max-height: 90%;
    overflow-y: scroll;
    padding: 10px 20px;
`

export default TopicsList
