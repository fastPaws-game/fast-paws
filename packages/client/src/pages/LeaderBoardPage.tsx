import RequireAuth from '../hocs/RequireAuth'
import LayoutWithHeader from '../layouts/LayoutWithHeader'
import { LeaderBoard } from '../modules/leaderBoardModule'

const LeaderBoardPage = () => {
  return (
    <RequireAuth>
    <LayoutWithHeader title="Leaderboard">
      <LeaderBoard />
    </LayoutWithHeader>
    </RequireAuth>
  )
}

export default LeaderBoardPage
