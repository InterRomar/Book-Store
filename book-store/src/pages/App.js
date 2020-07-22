import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { ThemeConsumer } from 'styled-components';
import { getProfileFetch, userLogOut, addNotification, userPostLogin } from '../store/current_user/actions';
import Header from '../components/Header';
import Reg from './Reg';
import SignIn from './SignIn';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import Profile from './Profile';
import AddBook from './AddBook';
import AddCategory from './AddCategory';
import { getAllCategories } from '../store/categories_store/actions';
import BookPage from './BookPage';
import PasswordReset from './PasswordReset';
import Favorite from '../components/Favorite';
import PasswordResetLinkRequest from './PasswordResetLinkRequest';

const socket = io.connect('http://localhost:5000');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    const { getProfileFetch, getAllCategories, user } = this.props;
    await getProfileFetch();
    await getAllCategories();
    this.setState({
      loading: false
    });

    // С сервера приходит уведомление, что книга была создана
    socket.on('bookAdded', data => {
      // проверяется, есть ли категория новой книги в списке подписок данного сокета
      if (user.subscriptions) {
        if (this.props.user.subscriptions.includes(data.category.id)) {
          this.props.addNotification(data);
        }
      }
    });

    // Если да, то диспатчим
    // Если нет, то ничего не делаем
  }

  render() {
    const { loading } = this.state;
    const { isAuth, user, logOut, userPostLogin } = this.props;

    if (loading) {
      return (
        <div>
          <Header isAuth={isAuth} user={user} logOut={logOut}/>
            <h1>loading...</h1>
        </div>
      );
    }

    return (
      <div className="App">
        <Header isAuth={isAuth} user={user} logOut={logOut}/>
        <main className="page">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/books/:id' component={BookPage}/>

            <PrivateRoute path="/password-reset-link-request" component={PasswordResetLinkRequest}/>
            <PrivateRoute path="/password-reset" component={PasswordReset} userPostLogin={userPostLogin}/>
            <PrivateRoute path="/reg" component={Reg}/>
            <PrivateRoute path="/login" component={SignIn}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/favorite">
              <Favorite />
            </PrivateRoute>
            <PrivateRoute path="/addBook">
              <AddBook/>
            </PrivateRoute>
            <PrivateRoute path="/addCategory">
              <AddCategory/>
            </PrivateRoute>
          </Switch>
        </main>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuth: !!Object.keys(state.current_user.user).length,
  user: state.current_user.user,
  user_store: state.current_user,
  storeSt: state
});

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  userPostLogin: user => dispatch(userPostLogin(user)),
  logOut: () => dispatch(userLogOut()),
  getAllCategories: () => dispatch(getAllCategories()),
  addNotification: data => dispatch(addNotification(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


App.propTypes = {
  getProfileFetch: PropTypes.func,
  userPostLogin: PropTypes.func,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    subscriptions: PropTypes.arrayOf(PropTypes.number)
  }),
  getBooks: PropTypes.func,
  getAllCategories: PropTypes.func,
  addNotification: PropTypes.func
};
