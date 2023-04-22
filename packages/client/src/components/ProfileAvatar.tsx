import React, { createRef, ChangeEvent, FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import DefaultAvatar from '../assets/icons/DefaultAvatar.svg'
import { useAppSelector } from '../hooks/store'
import { updateAvatar } from '../store/auth/AuthActions'
import { authSelectors } from '../store/auth/AuthSelectors'
import { getBase64 } from '../utils/getBase64'

const ProfileAvatar: FC<any> =({ name,  register }) => {
  const { onChange, ref } = register(name);
  const [image, setImage] = useState<any>(null);

  const fileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const file = target.files ? target.files[0] : null

    if (file) {
      const base64 = await getBase64(file);
      setImage(base64);
      onChange(event);
    }
  }, []);


  const avatar = useAppSelector(authSelectors.getAvatar)

  function fileChoose() {
    console.log('555')
    const node = ref.current
    if (node) {
      node.click()
    }
  }

  return (
    <Avatar >
      <label htmlFor={'file'}>
        <span>Change</span>
      </label>
      <input
        type="file"
        ref={ref}
        onChange={fileChange}
        name={name}
        accept="image/png, image/jpeg, image/gif"
      />
      <img src={image??avatar??DefaultAvatar}  />
    </Avatar>
  )
}

const Avatar = styled.div`
  /*color: transparent;
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
  &:hover {
    label {
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      color: rgb(250, 250, 250);
      transition: background-color 0.2s ease-in-out;
      border-radius: 100px;
      margin-bottom: 0;
      cursor: pointer;
    }
  }*/
  img {

    width: 120px;
    height: 120px;
    border-radius: 50%;
    z-index: 0;
  }
`
export default ProfileAvatar
