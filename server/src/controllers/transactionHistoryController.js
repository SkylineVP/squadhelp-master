const db = require('../models');
const ServerError=require( '../errors/ServerError');

module.exports.createTransaction=async (options)=>{
	try {
		const transaction=await db.TransactionHistory.create(options);
		if (transaction){
			return transaction
		}
	}
		catch (e) {
		next(new ServerError())
	}
}

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
		const total=await db.TransactionHistory.findAll(
			{
				where:{
					userId:req.tokenData.userId,
				},
				group : ['TransactionHistory.typeOperation'],
				attributes:[
					'typeOperation',
					[db.Sequelize.fn('sum', db.Sequelize.col('sum')), 'total'],
				]
			});
		let result={};
		total.forEach(value => {
			result[value.get("typeOperation")]=value.get('total')
		});
		return res.send(result);
	}catch (e) {
		console.error(e);
		next(new ServerError())
	}


};