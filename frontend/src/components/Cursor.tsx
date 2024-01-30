import React from 'react'
import "./Cursor.css"

type Props = {
	user: any
}

const Cursor = (props: Props) => {
	const position = [props.user.x, props.user.y]
	return (
		<div className="cursor" style={{ left: position[0], top: position[1] }}>
			<div className="name">{props.user.name}</div>
		</div>
	)
}

export default Cursor