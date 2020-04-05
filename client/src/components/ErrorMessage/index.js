import React from 'react';

const ErrorMessage = (props) => {
	return (
		<>
			{ ( props.touched
				&& props.error
				&& <span className={ props.className }>{ props.error }</span> ) }
		</>
	);
};

export default ErrorMessage;