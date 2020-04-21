const db = require('../models');
const ServerError=require( '../errors/ServerError');
module.exports.getAllHistory=async (req,res,next)=>{
try {
	const history=await db.TransactionHistory.findAll(
		{
			where:{
				userId:req.tokenData.userId
			}
		});
	res.send(history)

}catch (e) {
	console.error(e);
next(new ServerError())
}
};
module.exports.getHistoryTotal=async (req,res,next)=>{
	try {
		const consumption=await db.TransactionHistory.findAll(
			{
				where:{
					userId:req.tokenData.userId,
					typeOperation:'CONSUMPTION'
				},
				group : ['TransactionHistory.userId'],
				attributes:[
					[db.Sequelize.fn('sum', db.Sequelize.col('sum')), 'CONSUMPTION']
				]
			});
		const income=await db.TransactionHistory.findAll(
			{
				where:{
					userId:req.tokenData.userId,
					typeOperation:'INCOME'
				},
				group : ['TransactionHistory.userId'],
				attributes:[
					[db.Sequelize.fn('sum', db.Sequelize.col('sum')), 'INCOME']
				]
			});
		return res.send({...income[0].get(),...consumption[0].get()})
	}catch (e) {
		console.error(e);
		next(new ServerError())
	}


};