import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import { Button, Header, Icon } from 'semantic-ui-react'
import { Input, Menu, Segment } from 'semantic-ui-react'
// import { Tab } from 'semantic-ui-react'
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Menu pointing style={{ background: '#385E72' }}>
        <Menu.Item position='left' style={{ color: 'white', fontSize: '2rem' }}
          as={Link} to='/'
          ><strong>JobVerse</strong> <i className="fa-solid fa-briefcase"></i>
          </Menu.Item>
        
        <Menu.Item position='right' style={{ color: 'white', fontSize: '1.2rem' }}
          name='Explore Jobs'
          as={Link} to='/'
        />

        {Auth.loggedIn() ? (
          <>
            <Menu.Item style={{ color: 'white', fontSize: '1.2rem' }}
              name='Dashboard'
              as={Link} to='/dashboard'
            />
            {Auth.isEmployer() ? (
              <Menu.Item style={{ color: 'white', fontSize: '1.2rem' }}
                name='Post a Job'
                as={Link} to='/postJob'
              />) : null}
            <Menu.Item style={{ color: 'white', fontSize: '1.2rem' }}
              name='Logout'
              onClick={Auth.logout}
            />
          </>
        ) : (
          <Menu.Item style={{ color: 'white', fontSize: '1.2rem' }}
            name="Login or Sign Up"
            onClick={() => setShowModal(true)}
          />
        )}
      </Menu>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
