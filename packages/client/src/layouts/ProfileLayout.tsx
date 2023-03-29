import styled from 'styled-components'

const ProfileLayout=styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-image: linear-gradient(${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
`;

export default ProfileLayout
