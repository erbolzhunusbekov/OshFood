import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  Row,
  Container,
  Spinner,
  Button,
  Modal,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import { Basket } from '../Basket';
import MyCards from '../MyCards'
import css from './main.module.css'
import { IoApps } from 'react-icons/io5';
import InputMask from 'react-input-mask';

export default function MyBasket() {
  const MyContext = useContext(Basket);
  const [show, setShow] = useState(false);
  const [inpName, setInpName] = useState('');
  const [inpAddress, setInpAddress] = useState('');
  const [inpNumber, setInpNumber] = useState('');
  const [check, setCheck] = useState([]);
  const [myState, setMyState] = useState(false)
  const chat = -537486693

  // setName(p => ({
  //   ...p,
  //   jk: ''
  // }))

  Object.size = (obj) => {
    let size = 0;
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const InpName = (e) => setInpName(e);
  const InpAddress = (e) => setInpAddress(e);
  const InpNumber = (e) => setInpNumber(e);
  const addCheck = (e, v) => {
    setCheck(p => {
      if (e === true) {
        return [...p, v]
      } else {
        return p.filter((b) => b.idMeal !== v.idMeal)
      }
    })
  }

  console.log(check);


  const Send = () => {
    axios.post(`https://api.telegram.org/bot1720068505:AAGilIHoTeeuQAmhDw9nzPGEaXmbB9K6n8E/sendMessage`, {
      parse_mode: 'HTML',
      text: `<b>NEW ORDER</b>\n\nFull name: ${inpName} \nAddress: ${inpNumber} \nPhone number: ${inpAddress} \n${check.map((v) => `\n${v.strMeal}`)}`,
      chat_id: chat,
    })
    setShow(false)
    if (myState) {
      MyContext.setBasket(p => check.filter((v) => p.idMeal !== v.idMeal))
    }
  }


  const mostCheck = () => setMyState(true)

  console.log(myState);

  return (
    <>
      {MyContext.basket.length == 0
        ?
        <div className={'spin'}>
          <div className={css.img}>
            <h1 className={css.h1}>
              BASKET IS EMPTY
            </h1>
          </div>
        </div>
        :
        <Container>
          <div className={css.basket}>
            <h1>
              Basket({MyContext.basket.length})
            </h1>
            <Button onClick={() => handleShow()} variant={'outline-success'}>
              <IoApps /> Order {MyContext.basket.length > 1 ? MyContext.basket.length + ' meals' : MyContext.basket.length + ' meal'}
            </Button>
            {show
              ?
              <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Your full name
                  </p>
                  <FormControl onChange={(e) => InpName(e.target.value)} type="text" placeholder="Erbol" className="mr-sm-2" />
                  <p className={'my-2'}>
                    Address
                  </p>
                  <FormControl onChange={(e) => InpAddress(e.target.value)} type="text" placeholder="Osh" className="mr-sm-2" />
                  <p className={'my-2'}>
                    Contact phone number
                  </p>
                  <InputMask placeholder={'Phone number'} value={inpNumber} className={css.myInp} onChange={(e) => InpNumber(e.target.value)} mask="+\9\9\6 999 999 999"></InputMask>
                  {MyContext.basket.map((v, i) => {
                    return (
                      <div>
                        <input key={i} onChange={(e) => addCheck(e.target.checked, v)} value={v.strMeal} className={css.check} id={i} type={'checkbox'} />
                        <label for={i}>{v.strMeal}</label>
                      </div>
                    )
                  })}
                </Modal.Body>
                <Modal.Footer>
                  <InputGroup className="mb-3">
                    <input className={css.check} type={'checkbox'} id={'ch'} onChange={() => mostCheck()} />
                    <label className={css.la} for={'ch'}>
                      Remove meals from trash after order
                    </label>
                  </InputGroup>
                </Modal.Footer>
                <Modal.Footer>
                  <Button variant="outline-danger" onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button disabled={inpNumber.split(' ').join('').split('_').join('').length < 13 || inpName === '' || inpAddress === '' || Object.keys(check).length == 0} onClick={() => Send()} variant="outline-success">
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
              :
              null
            }
          </div>
          <Row className={'mt-4'}>
            {MyContext.basket.map((v, i) => {
              return <MyCards key={i} v={v} />
            })}
          </Row>
        </Container>}
    </>
  )
}