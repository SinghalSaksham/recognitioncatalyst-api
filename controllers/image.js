const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '14fb8b2c358b4b83b5b1534c40d05965'
});

const handleApiCall = (req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
			  .then(data=>{
			  	res.json(data)
			  })
			  .catch(err=>res.status(400).json('Unable to work with API'))
}

const handleImage = (req,res , db)=>{
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entry' , 1)
	  .returning('entry')
	  .then(entry=>{
	  	res.json(entry[0]);
	  })
	  .catch(err=> res.status(400).json("unable to get entries"))
}

module.exports ={
	handleImage,
	handleApiCall
}