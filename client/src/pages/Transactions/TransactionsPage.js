import React, { useEffect }                                                     from 'react';
import {connect}                                                                from "react-redux";
import Header                                                                   from "../../components/Header/Header";
import styles                                                                   from './TransactionsPage.module.scss'
import { createLoadTotalTransactionAction, createLoadTransactionHistoryAction } from "../../actions/actionCreator";
import TransactionsTable
																				from "../../components/TransactrionsTable/TransactionsTable";



function TransactionsPage (props) {
	useEffect(()=>{
		props.getTotal();
		props.getTransactions();
	},[]);
		return (
			<>
				<Header/>
				<div className={styles.container}>
					<h2>Your Transactions</h2>
				<TransactionsTable  transactions={props.transactions} total={props.total}/>
				</div>

			</>
		);
}
const mapStateToProps = ( state ) => {
	return{ ...state.transactionHistory}
};
const mapDispatchToProps = ( dispatch ) => {
	return{
		getTotal:()=>dispatch(createLoadTotalTransactionAction()),
		getTransactions:()=>dispatch(createLoadTransactionHistoryAction()),
	}
};
export default connect(mapStateToProps,mapDispatchToProps,)(TransactionsPage);