import LayoutWithHeader from '../layouts/LayoutWithHeader'
import Topics from '../modules/topics/Topics'
import ButtonAdd from '../components/ButtonAdd'
import AddNewTopic from '../components/AddNewTopic'
import { useCallback, useState } from 'react'

const TopicPage = () => {
    const [modal, setModal] = useState(false)

    const handleClose = useCallback(() => {
        setModal(false)
    }, [setModal])

    return (
        <LayoutWithHeader title='New Games' buttonAdd={<ButtonAdd clickHandler={() => setModal(true)}/>}>
            <Topics/>
            <AddNewTopic visible={modal} outSideClickEnable handleClose={handleClose} handleSubmit={() => console.log('submit')}></AddNewTopic>
        </LayoutWithHeader>
    )
}

export default TopicPage
