import io from 'socket.io-client';


export class Socket {
  static socket = null

  static connect(user_id) {
    this.socket = io(process.env.REACT_APP_BASE_URL);
    this.socket.emit('userJoined', { room: user_id });
  }


  static disconnect() {
    this.socket.close();
  }
}
