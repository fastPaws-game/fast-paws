import ForumLayout from '../layouts/ForumLayout'
import TopicsComponent from '../modules/topics/TopicsComponent'

const TopicPage = () => {
    return (
        <ForumLayout>
            <TopicsComponent forumName='New Games' />
        </ForumLayout>
    )
}

export default TopicPage
