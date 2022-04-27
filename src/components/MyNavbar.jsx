import { Navbar, Nav } from 'react-bootstrap'

const MyNavbar = ({ payoff }) => {
  //   console.log(props)

  // props looks like this:
  // {
  //     payoff: "The best pasta on the internet!"
  // }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Strivestaurant - {payoff}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#menu">Menu</Nav.Link>
          <Nav.Link href="#reservations">Reservations</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
