import React     from 'react';
import PropTypes from 'prop-types';
import styles    from "../../pages/RegistrationPage/RegistrationPage.module.sass";

const Article = props => {
	const {header,headerStyles,articleBody,articleStyle}=props;
	return (
		<>
			<div className={headerStyles}>{header}
			</div>
			<div className={articleStyle}>
				{articleBody}
			</div>
		</>
	);
};

Article.propTypes = {
	headerStyles:PropTypes.string,
	articleStyle:PropTypes.string,
	header:PropTypes.string.isRequired,
	articleBody:PropTypes.string.isRequired
};

export default Article;