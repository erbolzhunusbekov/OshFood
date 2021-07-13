import React, { useState, useEffect, useContext } from 'react';
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  Button,
  FormControl
} from 'react-bootstrap';
import axios from 'axios';
import { API_COUNTRY } from '../../config';
import { useHistory, useParams } from 'react-router-dom';
import { BiBasket } from 'react-icons/bi';
import { Basket } from '../Basket';

export default function MyNavbar() {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const history = useHistory()
  const MyContext = useContext(Basket)

  useEffect(() => {
    axios.get(API_COUNTRY)
      .then((res) => {
        setData(res.data.meals)
      })
  }, [])

  const inpHandler = (e) => setText(e)
  const btnHandler = () => history.push(`/Search/${text}`)
  const dropHandler = (v) => history.push(`/Dropdown/${v.strArea}`)
  const homeHandler = (v) => history.push(`/`)
  const basketHandler = (v) => history.push(`/MyBasket/`)

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href='#' onClick={() => homeHandler()}>Osh Food</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => homeHandler()}>Home</Nav.Link>
            <Nav.Link onClick={() => basketHandler()}>
              Basket({MyContext.basket.length})
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {data.map((v, i) => {
                return <NavDropdown.Item key={i} onClick={() => dropHandler(v)}>{v.strArea}</NavDropdown.Item>
              })}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl onChange={(e) => inpHandler(e.target.value)} value={text} type="text" placeholder="Search" className="mr-sm-2" />
            <Button onClick={() => btnHandler()} variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}