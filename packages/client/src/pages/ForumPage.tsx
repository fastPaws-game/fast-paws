import IconCat from '../assets/icons/IconCat'
import ForumsComponent from '../modules/forums/ForumsComponent'
import ForumLayout from '../layouts/ForumLayout'

const ForumPage = () => {
    return (
        <ForumLayout>
            <ForumsComponent />
            <IconCat />
        </ForumLayout>
    )
}

export default ForumPage
