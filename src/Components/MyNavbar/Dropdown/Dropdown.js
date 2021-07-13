import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Spinner,
  Image,
} from 'react-bootstrap'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { API_DROPDOWN } from '../../../config';
import MyCards from '../../MyCards';

export default function Dropdown() {
  const [data, setData] = useState([])
  const [spin, setSpin] = useState(false)
  const { city } = useParams()

  useEffect(() => {
    axios.get(API_DROPDOWN + city)
      .then((res) => {
        setData(res.data.meals)
        console.log(res)
        setSpin(true)
      })
      .catch((e) => {
        console.log(e)  
      })
  }, [city])

  return (
    <>
      {!spin
        ?
        <div className={'spin'}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        :
        <>
          <Container>
            <Row className={'mt-4'}>
              {data.map((v) => {
                return (
                  <MyCards v={ v } />
                )
              })}
            </Row>
          </Container>
        </>
      }
    </>
  )
}