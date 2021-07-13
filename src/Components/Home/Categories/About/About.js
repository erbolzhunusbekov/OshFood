import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { API_ABOUT } from '../../../../config';
import {
  Row,
  Col,
  Container,
  Spinner,
  Image,
} from 'react-bootstrap'

export default function About() {
  const [data, setData] = useState([])
  const [spin, setSpin] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    axios.get(API_ABOUT + name)
    .then((res) => {
      console.log(res)  
      setData(res.data.meals[0])
      setSpin(true)
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
          <h3 className={'text-center my-4'}>
            {data.strMeal}
          </h3>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12}>
                <Image className={'img-fluid'} src={data.strMealThumb} />
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <h3>Country: {data.strArea}</h3>
                <h3>Category: {data.strCategory}</h3>
                <h3>Tags: {data.strTags === null ? 'Not Found' : data.strTags}</h3>
                <h6>
                  {data.strInstructions}
                </h6>
                <a target={'_blank'} href={data.strYoutube}>
                  Youtube Video
                </a>
              </Col>
            </Row>
          </Container>
        </>
      }
    </>
  )
}