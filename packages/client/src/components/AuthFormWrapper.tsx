import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { media } from '../assets/styles/media';
import { H3 } from '../assets/styles/texts'

//TODO этот компонент должен подойти в качестве обертки для формы авторизации
type Props = {
	title: string;
} & HTMLAttributes<HTMLButtonElement>

const AuthFormWrapper: FC<Props> = (props) => {
	const { title, children } = props
	return (
		<Wrapper>
			<H3 accent weight='700'>{title}</H3>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	border-radius: 15px;
	display:flex;
	flex-direction:column;
	align-items: center;
	justify-content:center;
	background-color: ${({ theme }) => theme.colors.secondary};
	box-shadow: ${({ theme }) => theme.shadows.forFormBackground};
	padding: 25px;

    ${media.middle} {
		padding:15px;
        padding-top: 30px;
		min-width: 90%;
    }

	& h3{
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
`

export default AuthFormWrapper;
