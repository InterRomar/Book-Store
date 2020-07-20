import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Container } from './Header';

const socket = socketIOClient('http://localhost:5000/');


class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      push: [],
    };
  }

  componentDidUpdate() {
    // const { value } = this.state;


  }

  socketClick = (event) => {
    const value = event.target.value;

    socket.emit('click', value);

    this.setState({
      value
    });

    socket.on('response', (res) => {
      console.log(res);
      this.setState({
        push: [...this.state.push, res]
      });
    });
  }


  render() {
    const { push } = this.state;

    return (
      <Container>
        <h1>test component</h1>
        <button
          onClick={this.socketClick}
          value={1}
        >
          1
        </button>
        <button
          onClick={this.socketClick}
          value={2}
        >
          2
        </button>
        <button
          onClick={this.socketClick}
          value={3}
        >
          3
        </button>

        <hr/>
        <br/>

        {push && push.map((obj, i) => <div key={i} >
          <h3>{obj.name}</h3>
          <p> {obj.age} </p>
          <small> user №{obj.id} </small>
        </div>)}


      </Container>
    );
  }
}

export default Test;
