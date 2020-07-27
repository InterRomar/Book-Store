import io from 'socket.io-client';
import { store } from './store/index';
import { addNotification } from './store/current_user/actions';


export class Socket {
  static socket = null

  static connect(user_id) {
    this.socket = io(process.env.REACT_APP_BASE_URL);
    this.socket.emit('userJoined', { room: user_id });
    this.initSubscriptions();
  }

  static initSubscriptions() {
    Socket.socket.on('mentionAdded', data => {
      store.dispatch(addNotification(data));
    });

    // С сервера приходит уведомление, что книга была создана
    Socket.socket.on('bookAdded', data => {
      const user = store.getState().current_user.user;
      // проверяется, есть ли категория новой книги в списке подписок данного сокета
      if (user.subscriptions) {
        if (user.subscriptions.includes(data.category.id)) {
          store.dispatch(addNotification(data));
        }
      }
    });
    // Если да, то диспатчим
    // Если нет, то ничего не делаем
  }

  static disconnect() {
    this.socket.close();
  }
}
