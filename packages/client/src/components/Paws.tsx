import styled, { keyframes, css } from 'styled-components'
import { FC } from 'react'
import paw from '../assets/icons/paw.svg'
import { media } from '../assets/styles/media'

const Paws: FC = () => {
  return (
    <>
      <Paw1>
        <Icon />
      </Paw1>
      <Paw2>
        <Icon />
      </Paw2>
      <Paw3>
        <Icon />
      </Paw3>
      <Paw4>
        <Icon />
      </Paw4>
      <Paw5>
        <Icon />
      </Paw5>
      <Paw6>
        <Icon />
      </Paw6>
      <Paw7>
        <Icon />
      </Paw7>
      <Paw8>
        <Icon />
      </Paw8>
    </>
  )
}

const walk = keyframes`
  25%  {opacity: 1;}
  100% {opacity: 0;}
`

const basePaw = css`
  opacity: 0;
  position: absolute;
`

const Icon = styled.div`
  mask-image: url(${paw});
  height: 135px;
  width: 130px;
  background-color: ${props => props.theme.colors.secondary};
`

const Paw1 = styled.div`
  ${basePaw};
  left: 75px;
  top: 250px;
  animation: ${walk} 3s linear infinite;

  ${media.small} {
    display: none;
  }

  ${media.middle} {
    left: 50px;
    top: 200px;
  }
`

const Paw2 = styled.div`
  ${basePaw};
  left: 275px;
  top: 280px;
  transform: rotate(-5deg);
  animation: ${walk} 3s linear infinite 0.25s;

  ${media.small} {
    display: none;
  }

  ${media.middle} {
    left: 150px;
    top: 40px;
  }
`

const Paw3 = styled.div`
  ${basePaw};
  left: 375px;
  top: 130px;
  transform: rotate(-10deg);
  animation: ${walk} 3s linear infinite 0.5s;

  ${media.small} {
    display: none;
  }

  ${media.middle} {
    left: 270px;
    top: 170px;
  }
`

const Paw4 = styled.div`
  ${basePaw};
  left: 575px;
  top: 280px;
  transform: rotate(-20deg);
  animation: ${walk} 3s linear infinite 0.75s;

  ${media.middle} {
    left: 330px;
    top: 10px;
  }
`

const Paw5 = styled.div`
  ${basePaw};
  left: 650px;
  top: 50px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1s;

  ${media.middle} {
    display: none;
  }
`

const Paw6 = styled.div`
  ${basePaw};
  left: 875px;
  top: 200px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1.25s;

  ${media.large} {
    display: none;
  }
`

const Paw7 = styled.div`
  ${basePaw};
  left: 1075px;
  top: 50px;
  transform: rotate(20deg);
  animation: ${walk} 3s linear infinite 1.5s;

  ${media.xl} {
    display: none;
  }
`

const Paw8 = styled.div`
  ${basePaw};
  left: 1150px;
  top: 250px;
  transform: rotate(10deg);
  animation: ${walk} 3s linear infinite 1.75s;

  ${media.xl} {
    display: none;
  }
`

export default Paws
