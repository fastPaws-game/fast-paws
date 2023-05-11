import React, { FC, useCallback } from 'react'
import Modal from './modal'
import Button from '../ui/button'
import styled from 'styled-components'
import IconSettings from '../assets/icons/IconSettings'
import IconStar from '../assets/icons/IconStar'
import { useNavigate } from 'react-router-dom'
import IconForum from '../assets/icons/IconForum'
import { Routes } from '../constants/routes'

import getLeaderboardBody from '../utils/getLeaderboardBody'
import { addUserToLeaderboard } from '../store/leaderboard/LiaderboardActions'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'
import { gameSelectors } from '../store/game/GameSelectors'

type Props = {
  visible: boolean
  handleClose: () => void
  outSideClickEnable?: boolean
}

const GamePause: FC<Props> = props => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(authSelectors.getIsAuth)
  const user = useAppSelector(authSelectors.getUser)
  const score = useAppSelector(gameSelectors.getScore)

  console.log(score)

  const saveScoreOfUser = useCallback(() => {
    if (!isAuth || !user) {
      return
    }

    const leaderBoardUpdate = getLeaderboardBody(user, score)
    dispatch(addUserToLeaderboard(leaderBoardUpdate))
  }, [score])

  const handleClick = (path?: string) => () => {
    saveScoreOfUser()
    if (path) navigate(path)
    props.handleClose()
  }

  return (
    <Modal {...props}>
      <Content>
        <Button size="middle" onClick={handleClick()} darkblue>
          Continue
        </Button>
        <Button size="middle" onClick={handleClick(Routes.HOME)} darkblue>
          Exit
        </Button>
        <Footer>
          <Button icon={<IconForum />} size="small" onClick={handleClick(Routes.FORUM)} darkblue />
          <Button icon={<IconSettings />} size="small" onClick={handleClick(Routes.SETTINGS)} darkblue />
          <Button icon={<IconStar />} size="small" onClick={handleClick(Routes.LEADERBOARD)} darkblue />
        </Footer>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default GamePause
