import { getTotalTransaction, getTransactionHistory } from "../api/rest/restController";
import {
	getTotalTransactionError,
	getTotalTransactionSucces,
	getTransactionHistoryErorr,
	getTransactionHistorySuccess
}                                                     from "../actions/actionCreator";
import { put }                                        from "@redux-saga/core/effects";

export function* getTransactionsSaga(data) {
	try {
		const {data}= yield getTransactionHistory();
		yield put(getTransactionHistorySuccess(data))
	}catch (e) {
		yield put(getTransactionHistoryErorr(e))
	}

}
export function* getTotalTransactionsSaga(data) {
	try {
		const {data}= yield getTotalTransaction();
		yield put(getTotalTransactionSucces(data))
	}catch (e) {
		yield put(getTotalTransactionError(e))
	}

}