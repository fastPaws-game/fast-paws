import ForumsList from '../../components/ForumsList'

const forums = [
  {
    name: 'New games',
    id: 1,
    path: '/forum/newgames',
    topics: 222,
  },
  {
    name: 'Game designers',
    id: 2,
    path: '#',
    topics: 5,
  },
  {
    name: 'Technologies',
    id: 3,
    path: '#',
    topics: 590,
  },
]

const Forum = () => {
  return <ForumsList forums={forums} />
}

export default Forum
