import { FC, useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import DefaultAvatar from '../assets/icons/DefaultAvatar.svg'
import { updateAvatar } from '../store/auth/AuthActions'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { authSelectors } from '../store/auth/AuthSelectors'

const ProfileAvatar:FC = () => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState<string | null>(null)
  const avatar = useAppSelector(authSelectors.getAvatar) ?? DefaultAvatar
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fileChange = useCallback(async () => {
    const target = fileInputRef.current as HTMLInputElement
    const file = target.files ? target.files[0] : null

    if (file) {
      setImage(URL.createObjectURL(file))
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      dispatch(updateAvatar(formData))
    }
  }, [fileInputRef])

  return (
    <Avatar>
      <label htmlFor={'file'}>
        <span>Change</span>
      </label>
      <input type="file" ref={fileInputRef} onChange={fileChange} name="fileAvatar" accept="image/png, image/jpeg, image/gif" />
      <img src={image ?? avatar ?? DefaultAvatar} />
    </Avatar>
  )
}

const Avatar = styled.div`
    color: transparent;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    margin: 30px 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.secondary};
    cursor: pointer;

    & label {
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      color: rgb(250, 250, 250);
      transition: opacity 0.2s ease-in-out;
      border-radius: 100px;
      margin-bottom: 0;
      opacity: 0;
      cursor: pointer;
    }

    &:hover {
      label {
        opacity: 1;
      }
    }
    input {
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      z-index: 0;
    }
 `

export default ProfileAvatar
