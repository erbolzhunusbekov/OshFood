import React, { useContext } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Basket } from './Basket';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

export default function MyCards({ v }) {
  const MyContext = useContext(Basket)

  return (
    <>
      <Col className={'myCards'} xl={3} lg={3} md={6} sm={12}>
        <Card className={'Cards'} style={{ width: '17rem', marginTop: 10, padding: 10 }}>
          <Link className={'mx-0'} to={`/About/${v.idMeal}`}>
            <Image className={'mySpan'} src={v.strMealThumb} fluid />
            <h5 className={'p-4 text-center'}>
              {v.strMeal}
            </h5>
          </Link>
          <Button className={'myBtn'} onClick={() => MyContext.Toggle(v)} variant={MyContext.basket.includes(v) ? 'danger' : 'success'}> 
          {MyContext.basket.includes(v) ? <TiDeleteOutline className={'del'} /> : <AiOutlinePlusCircle className={'add'} />}{MyContext.basket.includes(v) ? 'Delete from basket' : 'Add to basket'} </Button>
        </Card>
      </Col>
    </>
  )
}