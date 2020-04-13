import React    from 'react';
import styles   from './LinkButton.module.scss';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
	return (
		<div className={styles.btn}>
			<Link  to={props.link}>
				{props.children}
			</Link>
		</div>
	);
};

export default LinkButton;