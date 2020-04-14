import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Header from "../../components/Header/Header";
import styles from './TransactionsPage.module.scss'

class TransactionsPage extends Component {
	constructor( props ) {
		super(props);

	}



	componentDidMount() {

	}



	componentWillUnmount() {

	}

	render() {
		return (
			<>
				<Header/>
				<div className={styles.container}>
					<h2>Your Transactions</h2>
					<div className={styles.tableWrapper}>
						<table className={styles.table}>
							<thead>
								<th>Id</th>
								<th>Sum</th>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>+350</td>
								</tr>
								<tr>
									<td>2</td>
									<td>-350</td>
								</tr>
							</tbody>
						</table>

					</div>

				</div>

			</>
		);
	}
}

TransactionsPage.propTypes = {};

export default TransactionsPage;