const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())
const JWT_SECRET = "'secret123'"
mongoose.connect('mongodb://localhost:27017/full-mern')

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			uname: req.body.uname,
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				_id: user.id,
				name: user.uname,
				email: user.email,
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})



app.post("/userData", async (req, res) => {
	const { token } = req.body;
	try {
	  const user = jwt.verify(token, JWT_SECRET);
	  console.log(user);
  
	  const email = user.email;
	  User.findOne({ email: email })
		.then((data) => {
		  res.send({ status: "ok", data: data });
		})
		.catch((error) => {
		  res.send({ status: "error", data: error });
		});
	} catch (error) {}
  });



// app.post('/userdata', (req, res)=>{
// 	User.find((err, data)=>{
// 		if(!err){
			
// 			res.json(data);
// 		}
// 	})
// })


// app.get('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		const user = await User.findOne({ email: email })

// 		return res.json({ status: 'ok', quote: user.quote })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

// app.post('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		await User.updateOne(
// 			{ email: email },
// 			{ $set: { quote: req.body.quote } }
// 		)

// 		return res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

app.listen(5000, () => {
	console.log('Server started on 1337')
})
