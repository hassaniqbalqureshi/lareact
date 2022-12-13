import React from "react";
import { Component } from "react";
import axios from "axios";
import { Loading } from "./loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUsers() {
    this.setState({
      loading: true,
    })
    axios("https://jsonplaceholder.typicode.com/users")
      .then(response => this.setState({
        records: [...this.state.records, ...response.data],
        loading: false,
      }))
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log("users loaded")
  }
  componentWillMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="load" />
        </form >
        {!this.state.loading ?
          this.state.records.map(records =>
            <div key={records.id}>
              <h3>
                {records.name}
              </h3>
              <p>
                {records.address.city}
                <br></br>
                {records.email}
              </p>

              <hr />

            </div>)
          : (
            <Loading msg="Looking for Data. Please Wait" />
          )
        }
      </div>
    );
  };
}
export default App;
