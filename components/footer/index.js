import Link from 'next/link';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar fixed="bottom" expand="sm" bg="dark" variant="dark">
      <a href="emailto:kavabata.y@gmail.com">Powered by Kavabata</a>
    </Navbar>    
  )
}
