import React, { Component } from "react";
 
class Signup extends Component {
  render() {
    return (
      
      <body>
      <div className="loginbox">
      <link rel="stylesheet" type="text.css" href="index.css"></link>
        <h2>SignUp</h2>
        <p>Completati formularul pentru a continua.</p>
       
        <form>
        	<label htmlFor="name">Name</label>
        	<input type="text" name="name" id="name" onChange={this.handleChange}/>
        	
        	<label htmlFor="password">Password</label>
        	<input type="text" name="password" id="password" onChange={this.handleChange}/>
        	
        	<label htmlFor="email">Email</label>
        	<input type="text" name="email" id="email" onChange={this.handleChange}/>
        	
        	<label htmlFor="username">Username</label>
        	<input type="text" name="username" id="username" onChange={this.handleChange}/>
        	
        	<input type="button" value="SignUp" onClick={() => this.props.onAdd({
        		name : this.state.name,
        		password : this.state.password,
        		email: this.state.email,
        		username:this.state.username
        	})}/>
        </form>
       
      </div>
      </body>
    );
  }
}
 
export default Signup;