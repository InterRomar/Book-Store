import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookNotification from './BookNotification';
import { removeNotification } from '../store/current_user/actions';

const NotificationBody = styled.div`
  position: relative;
`;
const NotificationButton = styled.button`
  padding: 0 25px;
  font-size: 25px;
  background: transparent;
  border: none;
  color: #fff;
  transition: 0.03s ease-in;
  position: relative;

  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }
  &:focus {
    outline: none;
  }
  & .notification__counter {
    position: absolute;
    top: -10px;
    left: 50%;
    width: 20px;
    height: 20px;
    background: red;
    font-size: 15px;
    font-family: 'Roboto';
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const NotificationList = styled.ul`
  display: ${props => (props.opened ? 'flex' : 'none')};
  list-style: none;
  margin: 0;
  padding: 10px 20px;
  position: absolute;
  background: #fff;
  min-width: 500%;
  flex-direction: column;
  top: 40px;
  z-index: 30;
  left: -50%;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.9);
  border-radius: 8px;
  
`;
const NotificationItem = styled.li`
  padding-top: 5px;
  border-bottom: 1px solid #ccc;
  color: #333;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationPanel = (props) => {
  const { notifications, removeNotification } = props;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.addEventListener('click', togglePanel, false);

    return function cleanup() {
      document.removeEventListener('click', togglePanel, false);
    };
  });

  const node = useRef(null);
  const togglePanel = (e) => {
    if (node.current.contains(e.target)) {
      if (e.target.id === 'togglePanelButton' || e.target.id === 'bell') {
        setOpened(!opened);
      }
      return;
    }
    setOpened(false);
  };
  if (!notifications) {
    return (
      <NotificationBody ref={node}>
        <NotificationButton onClick={togglePanel} id='togglePanelButton'>
          <i className="fa fa-bell" id="bell" aria-hidden="true"></i>
        </NotificationButton>
        <NotificationList opened={opened}>
          <NotificationItem>
            Список уведомлений пуст!
          </NotificationItem>
        </NotificationList>
      </NotificationBody>
    );
  }
  return (
    <NotificationBody ref={node}>
      <NotificationButton onClick={togglePanel} id='togglePanelButton'>
        <i className="fa fa-bell" id="bell" aria-hidden="true"></i>
        <span className="notification__counter">
          {notifications.length}
        </span>
      </NotificationButton>
      <NotificationList opened={opened}>
        {notifications.map(notification => <NotificationItem key={notification.id}>
          <BookNotification notification={notification} removeNotification={removeNotification}/>
        </NotificationItem>)}
      </NotificationList>
    </NotificationBody>
  );
};

const mapStateToProps = state => ({
  notifications: state.current_user.notifications
});
const mapDispatchToProps = dispatch => ({
  removeNotification: id => dispatch(removeNotification(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanel);

NotificationPanel.propTypes = {
  removeNotification: PropTypes.func,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      isViewed: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        avatar: PropTypes.string
      }),
      book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        category: PropTypes.number,
        price: PropTypes.string
      }),
      category: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
      })
    })
  )
};
