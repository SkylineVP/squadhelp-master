module.exports=async (req,res,next)=>{

	if (req.body.date){
		req.filterDate=new Date(req.body.date);
	}
	else {
		req.filterDate=new Date('01-01-1971');
	}
	if (req.filterDate.getFullYear()<2000){
		req.filterDate='0'+req.filterDate.getTime().toString();
	}
	next();
};