import React from 'react';
import {
  Card,
  Row,
  Col,
  Container,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';


export default function Home(props) {

  return (
    <>
      <Container>
        <Row className={'mt-4'}>
          {props.data.map((v) => {
            return (
              <Col xl={3} lg={3} md={6} sm={12}>
                <Link className={'mx-0'} to={`/Categories/${v.strCategory}`}>
                  <Card style={{ width: '17rem', marginTop: 10, padding: 10 }}>
                    <Card.Img variant="top" src={v.strCategoryThumb} />
                    <Card.Body className={'text-center'}>
                      <Card.Title>{v.strCategory}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}
