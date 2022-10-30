import React, { Component } from "react";
import Cards from "./Cards";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: "",
		};
	}
	componentDidMount() {
		fetch("http://localhost:5000/userData", {
			method: "POST",
			//   crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				token: window.localStorage.getItem("token"),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data, "userData");
				this.setState({ userData: data.data });
			});
	}


	

	render() {
		return (
			<div>
				Name<h3>{this.state.userData.fname}</h3>
				Email <h3>{this.state.userData.email}</h3>

				<br></br>

				<h1>some random api</h1>
				<Cards/>

				
			</div>
		);
	}
}

