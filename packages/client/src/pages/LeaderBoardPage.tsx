import RequireAuth from '../hocs/RequireAuth'
import LayoutWithHeader from '../layouts/LayoutWithHeader'
import { LeaderBoard } from '../modules/leaderBoardModule'

const LeaderBoardPage = () => {
  return (
    <LayoutWithHeader title="Leaderboard">
      <LeaderBoard />
    </LayoutWithHeader>
  )
}

export default LeaderBoardPage
