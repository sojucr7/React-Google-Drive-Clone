import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Nav() {
  return (
    <Navbar className='border'>
      <Container>
        <Navbar.Brand href="#home"><img className="drive-logo" src="./drive.png"/>Google Drive Clone</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#">Soju Varughese</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;