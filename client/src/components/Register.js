import { useState } from 'react'
import { useHistory } from 'react-router-dom'


function App() {
	const history = useHistory()

	const [uname, setUname] = useState('')
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uname,
				fname,
				lname,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login')
		}
	}

	return (
		<div className='container pt-5'>
			<h1>Register</h1>
			{/* <form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Register" />
			</form> */}

			<form onSubmit={registerUser}>
				<div className="form-group">
					<label for="uname">username</label>
					<input type="text" value={uname}
					onChange={(e) => setUname(e.target.value)} className="form-control" id="fname" aria-describedby="emailHelp" placeholder="Enter first name" />
				</div>
				<div className="form-group">
					<label for="fname">First name</label>
					<input type="text" value={fname}
					onChange={(e) => setFname(e.target.value)} className="form-control" id="fname" aria-describedby="emailHelp" placeholder="Enter first name" />
				</div>
				<div className="form-group">
					<label for="lname">last name</label>
					<input type="text" value={lname}
					onChange={(e) => setLname(e.target.value)} className="form-control" id="lname" aria-describedby="emailHelp" placeholder="Enter last name" />
				</div>

				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" value={email}
					onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" value={password}
					onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
				</div>

				<input type="submit" value="Register" className="btn btn-primary"/>
			</form>
		</div>
	)
}

export default App
