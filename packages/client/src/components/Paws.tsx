import styled, { keyframes } from 'styled-components'
import { FC } from 'react'

const Paws: FC = () => {
  return (
    <>
      <Paw1>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw1>
      <Paw2>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw2>
      <Paw3>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw3>
      <Paw4>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw4>
      <Paw5>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw5>
      <Paw6>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw6>
      <Paw7>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw7>
      <Paw8>
        <PadLarge />
        <PadSmall1 />
        <PadSmall2 />
        <PadSmall3 />
        <PadSmall4 />
      </Paw8>
    </>
  )
}

const walk = keyframes`
  25%  {opacity: 1;}
  100% {opacity: 0;}
`

const PadLarge = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: block;
  position: absolute;
  width: 70px;
  height: 80px;
  transform: rotate(80deg);
  left: 100px;
  top: 50px;
`

const PadSmall1 = styled.div`
  width: 25px;
  height: 27px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: block;
  position: absolute;
  transform: rotate(50deg);
  left: 145px;
  top: 28px;
`

const PadSmall2 = styled.div`
  width: 25px;
  height: 27px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: block;
  position: absolute;
  transform: rotate(65deg);
  left: 174px;
  top: 50px;
`

const PadSmall3 = styled.div`
  width: 25px;
  height: 27px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: block;
  position: absolute;
  transform: rotate(98deg);
  position: absolute;
  left: 178px;
  top: 87px;
`

const PadSmall4 = styled.div`
  width: 25px;
  height: 27px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: block;
  position: absolute;
  transform: rotate(140deg);
  position: absolute;
  left: 158px;
  top: 117px;
`

const Paw1 = styled.div`
  opacity: 0;
  position: absolute;
  left: 75px;
  top: 300px;
  transform: rotate(-40deg);
  animation: ${walk} 3s linear infinite;
`

const Paw2 = styled.div`
  opacity: 0;
  position: absolute;
  left: 275px;
  top: 280px;
  transform: rotate(-5deg);
  animation: ${walk} 3s linear infinite 0.25s;
`

const Paw3 = styled.div`
  opacity: 0;
  position: absolute;
  left: 375px;
  top: 130px;
  transform: rotate(-10deg);
  animation: ${walk} 3s linear infinite 0.5s;
`

const Paw4 = styled.div`
  opacity: 0;
  position: absolute;
  left: 575px;
  top: 280px;
  transform: rotate(-20deg);
  animation: ${walk} 3s linear infinite 0.75s;
`

const Paw5 = styled.div`
  opacity: 0;
  position: absolute;
  left: 725px;
  top: 50px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1s;
`

const Paw6 = styled.div`
  opacity: 0;
  position: absolute;
  left: 875px;
  top: 200px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1.25s;
`

const Paw7 = styled.div`
  opacity: 0;
  position: absolute;
  left: 1075px;
  top: 50px;
  transform: rotate(20deg);
  animation: ${walk} 3s linear infinite 1.5s;
`

const Paw8 = styled.div`
  opacity: 0;
  position: absolute;
  left: 1150px;
  top: 250px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1.75s;
`

export default Paws
