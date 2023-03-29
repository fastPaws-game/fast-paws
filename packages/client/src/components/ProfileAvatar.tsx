import React, {Component, ChangeEvent} from 'react'
import styled from 'styled-components';
// import DefaultAvatar from '../assets/icons/DefaultAvatar';

export default class ProfileAvatar extends Component{
	private fileUpload = React.createRef<HTMLInputElement>();

	fileChange(event:ChangeEvent<HTMLInputElement>){
		const target=event.target as HTMLInputElement;
		const file=target.files? target.files[0] : null;
		if(file){
			const data=new FormData();
			data.append('avatar', file);
			console.log(file);
			/* Change profile avatar API
				alert(JSON.stringify(data));
			*/
		}
	}

	fileChoose=()=>{
		const node=this.fileUpload.current;
		if(node) node.click();
	}

	render(){
		return (
		<Avatar onClick={this.fileChoose}>
			<input type="file" ref={this.fileUpload} onChange={this.fileChange} name="file" hidden accept="image/png, image/jpeg, image/gif"/>
		</Avatar>
		);
	}
}

const Avatar=styled.div`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background-color: ${props=>props.theme.colors.accent};
	background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'/%3E%3Cline x1='128' y1='192' x2='128' y2='224' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3Ccircle cx='84' cy='140' r='8'/%3E%3Ccircle cx='172' cy='140' r='8'/%3E%3Cline x1='128' y1='48' x2='128' y2='88' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3Cpolyline points='144 176 128 192 112 176' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3Cline x1='96' y1='53' x2='96' y2='88' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3Cline x1='160' y1='53' x2='160' y2='88' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3Cpath d='M32,136V51.3a8,8,0,0,1,13.7-5.6L67.6,67.6h0A100.8,100.8,0,0,1,128,48a100.8,100.8,0,0,1,60.4,19.6h0l21.9-21.9A8,8,0,0,1,224,51.3V136c0,48.6-43,88-96,88S32,184.6,32,136Z' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='8'/%3E%3C/svg%3E");
	background-size: 120px;
	cursor: pointer;
`;
