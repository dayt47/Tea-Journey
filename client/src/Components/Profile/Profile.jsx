import '../../Styles/Profile.css'
import Modal from 'react-modal';
import auth from '../../Utils/auth';
import Close from '../../Assets/close.png';
import { useState } from 'react';

const ProfileStyle = {
  content: {
    position: 'fixed',
    background: 'linear-gradient(-90deg, #969f77, #968f54)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '10px',
    color: '#fff',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 'calc(100vh - 40%)',
    width: 'calc(100vw - 65%)'
  }
};

const Profile = ({ setIsProfileModalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  function updateUser(e) {
    e.preventDefault();
  }

  function close() {
    setIsModalOpen(false)
    setIsProfileModalOpen(false);
  }

  function logout() {
    auth.logout()
  }

  return (
    <Modal style={ProfileStyle} isOpen={isModalOpen} >
      <div className="Profile">
        <div className="Top">
          <h1>Account settings</h1>
          <img src={Close} alt="Close" onClick={close} />
        </div>
        <div className="Main">
          <form className="Profile-Form" onSubmit={updateUser}>
            <div className="Name">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" placeholder={'New name'} />
            </div>
            <br />
            <div className="Username">
              <label htmlFor="password">Username:</label>
              <input type="text" name="username" placeholder={'New username'} />
            </div>
            <br />
            <div className="Password">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder='New password' />
            </div>
            <br />
            <div className="Save">
              <button type='Submit'>Save changes</button>
            </div>
          </form>
        </div>
        <div className="End">
          <div className="Journey">
            <button onClick={logout}>Reset Journey</button>
          </div>
          <div className="Logout">
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Profile