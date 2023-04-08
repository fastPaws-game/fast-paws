import { createRef, ChangeEvent } from 'react'
import styled from 'styled-components'
import DefaultAvatar from '../assets/icons/DefaultAvatar.svg'

export default function ProfileAvatar() {
  const fileUpload = createRef<HTMLInputElement>()
  const image = createRef<HTMLImageElement>()

  function fileChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (file) {
      image.current!.src = URL.createObjectURL(file)
      const data = new FormData()
      data.append('avatar', file)
      /* Change profile avatar API
      console.log(file)
			alert(JSON.stringify(data));
			*/
    }
  }

  function fileChoose() {
    const node = fileUpload.current
    if (node) {
      node.click()
    }
  }

  return (
    <Avatar onClick={fileChoose}>
      <label htmlFor={'file'}>
        <span>Change</span>
      </label>
      <input
        type="file"
        ref={fileUpload}
        onChange={fileChange}
        name="file"
        hidden
        accept="image/png, image/jpeg, image/gif"
      />
      <img src={DefaultAvatar} ref={image} />
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
  }
  img {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    z-index: 0;
  }
`
