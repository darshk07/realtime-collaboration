import React from 'react'

type Props = {
	user: any
}

const UserCard = (props: Props) => {
	return (
		<div>{props.user?.name} : {props.user?.x} {props.user?.y}</div>
	)
}

export default UserCard;
