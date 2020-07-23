import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledMentionNotification = styled.div`
  font-size: 15px;
  color: #333;
  font-family: 'Roboto';
  line-height: 22px;
  padding: 10px 0;
  padding-right: 30px;
  position: relative;
  transition: 0.05s ease-in;
  &:hover {
    background-color: rgb(247, 233, 255);

  }
  & .notification__delete {
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
    border: none;
    transition: 0.06s ease-in;

    &:hover {
      transform-origin: center center;
      transform: scale(1.2)
    }
    &:focus {
      outline: none;
    }
  }
  & .creator {
    margin: 0 4px;
    font-weight: 500;
    font-style: italic;
    }
  
}
`;

const MentionNotification = (props) => {
  const { user, id } = props.notification;
  const handleClick = () => {
    props.removeNotification(id);
  };
  return (
    <StyledMentionNotification>
      <div className="notification__head">
        <span className='creator'>
          {user.email}
        </span>
          <br/>
          упомянул вас в комментарии
      </div>

      <button className="notification__delete" onClick={handleClick}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </StyledMentionNotification>
  );
};

export default MentionNotification;

MentionNotification.propTypes = {
  removeNotification: PropTypes.func,
  notification: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
    }),
  })
};
