import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_SEARCH } from '../../../config';
import {
  Row,
  Container,
  Spinner,
} from 'react-bootstrap'
import css from './main.module.css'
import MyCards from '../../MyCards';

export default function Search() {
  const [data, setData] = useState([])
  const [spin, setSpin] = useState(false)
  const [error, setError] = useState(false)
  const { text } = useParams()

  useEffect(() => {
    axios.get(API_SEARCH + text)
      .then((res) => {
        console.log(res)
        setError(res.data.meals === null ? true : false)
        setData(res.data.meals === null ? [] : res.data.meals)
        setSpin(true)
      })
  }, [text])

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
        error
          ?
          <div className={'spin'}>
            <div className={css.img}>
              <h1 className={css.h1}>
                This product does not exist
              </h1>
            </div>
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