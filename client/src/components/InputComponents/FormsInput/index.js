import React from 'react';

const FormsInput = (props) => {
	return (
		<input{...props} placeholder={props.label}/>

	);
};


export default FormsInput;