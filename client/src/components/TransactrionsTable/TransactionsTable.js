import React  from 'react';
import className from 'classnames'
import styles from './TransactionTable.module.scss'
const RowTransaction=(props)=>{
	const {transaction}=props;
	return(
		<tr>
			<td>{transaction.id}</td>
			<td>{transaction.typeOperation==='INCOME'?'Income: ':'Consumption: -'}{transaction.sum}</td>
		</tr>
	)
};

const TransactionsTable = (props) => {
	const {transactions}=props;
	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
				<th>ID</th>
				<th>SUM</th>
				</thead>
				<tbody>
				{transactions.map((value)=><RowTransaction transaction={value}/>)}
				</tbody>
			</table >
			<table className={className(styles.table,styles.total)}>
				<tr>
					<th>Total Income</th>
					<td>{props.total.INCOME||''}</td>
				</tr>
				<tr>
					<th>Total Consumption</th>
					<td>{props.total.CONSUMPTION||''}</td>
				</tr>
			</table>
		</div>
	);
};

export default TransactionsTable;