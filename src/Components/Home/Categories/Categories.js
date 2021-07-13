import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {
  Row,
  Container,
  Spinner,
} from 'react-bootstrap'
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { API_CATEGORY } from '../../../config';
import { Basket } from '../../Basket';
import MyCards from '../../MyCards';

export default function Categories() {
  const [data, setData] = useState([])
  const [spin, setSpin] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const { Toggle, basket } = useContext(Basket)
  const MyContext = useContext(Basket)

  useEffect(() => {
    axios.get(API_CATEGORY + id)
      .then((res) => {
        setData(res.data.meals)
        setSpin(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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