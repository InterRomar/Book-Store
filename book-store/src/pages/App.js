import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { getProfileFetch, userLogOut, addNotification } from '../store/current_user/actions';
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
import Favorite from '../components/Favorite';
import Test from '../components/Test';


const socket = io.connect('http://localhost:5000');


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    const { getProfileFetch, getAllCategories } = this.props;
    await getProfileFetch();
    await getAllCategories();
    this.setState({
      loading: false
    });
    socket.on('bookAdded', data => {
      // здесь нужно делать dispatch нотификации
      console.log(data);

      this.props.addNotification(data);
    });
  }

  render() {
    const { loading } = this.state;
    const { isAuth, user, logOut } = this.props;

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
            <Route path='/test' component={Test} />
            <Route exact path='/' component={Home} />
            <Route path='/books/:id' component={BookPage}/>
            <PrivateRoute path="/reg">
              <Reg/>
            </PrivateRoute>
            <PrivateRoute path="/login">
              <SignIn/>
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile/>
            </PrivateRoute>
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
  storeSt: state
});

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logOut: () => dispatch(userLogOut()),
  getAllCategories: () => dispatch(getAllCategories()),
  addNotification: data => dispatch(addNotification(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


App.propTypes = {
  getProfileFetch: PropTypes.func,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string
  }),
  getBooks: PropTypes.func,
  getAllCategories: PropTypes.func,
  addNotification: PropTypes.func
};
