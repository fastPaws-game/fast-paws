import ForumsList from '../../components/ForumsList'

const forums = [
  {
    name: 'New games',
    id: 1,
    topics: 222,
  },
  {
    name: 'Game designers',
    id: 2,
    topics: 5,
  },
  {
    name: 'Technologies',
    id: 3,
    topics: 590,
  },
]

const Forum = () => {
  return <ForumsList forums={forums} />
}

export default Forum
