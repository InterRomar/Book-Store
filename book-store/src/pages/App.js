import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfileFetch, userLogOut } from '../store/current_user/actions';
import Header from '../components/Header';
import Reg from './Reg';
import SignIn from './SignIn';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import Profile from './Profile';
import AddBook from './AddBook';
import AddCategory from './AddCategory';
import { getAllBooks } from '../store/book_store/actions';
import { getAllCategories } from '../store/categories_store/actions';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    const { getProfileFetch, getAllBooks, getAllCategories } = this.props;
    await getProfileFetch();
    await getAllBooks();
    await getAllCategories();
    this.setState({
      loading: false
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
              <Route exact path='/' component={Home}/>
              <PrivateRoute path="/reg">
                <Reg/>
              </PrivateRoute>
              <PrivateRoute path="/login">
                <SignIn/>
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile/>
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
  user: state.current_user.user
});

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logOut: () => dispatch(userLogOut()),
  getAllBooks: () => dispatch(getAllBooks()),
  getAllCategories: () => dispatch(getAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


App.propTypes = {
  getProfileFetch: PropTypes.func,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func,
  // user: PropTypes.func,
  getAllBooks: PropTypes.func,
  getAllCategories: PropTypes.func
};
