import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { Basket } from './Components/Basket';
import { Spinner } from 'react-bootstrap';
import { API_HOME } from './config'
import axios from 'axios';
import MyNavbar from './Components/MyNavbar/MyNavbar'
import Home from './Components/Home/Home';
import Categories from './Components/Home/Categories/Categories';
import About from './Components/Home/Categories/About/About';
import Search from './Components/MyNavbar/Search/Search';
import Dropdown from './Components/MyNavbar/Dropdown/Dropdown';
import MyBasket from './Components/MyBasket/MyBasket';

export default function App() {
  const [data, setData] = useState([])
  const [spin, setSpin] = useState(false);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);

  useEffect(() => {
    axios.get(API_HOME)
      .then((res) => {
        setData(res.data.categories)
        setSpin(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }, []);

  // const toggle = (v) => {
  //   const i = JSON.parse(localStorage.getItem('Basket')) || [];
  //   if (!i.find(g => g.idMeal === v.idMeal)) {
  //     localStorage.setItem('Basket', JSON.stringify([...i, v]));
  //   } else {
  //     localStorage.setItem('Basket', JSON.stringify(i.filter(id => id.idMeal !== v.idMeal)));
  //   }
  // }

  const Add = (v) => setBasket([...basket, v])
  const Delete = (b) => setBasket(basket.filter((v) => v !== b))
  const Toggle = (n) => basket.includes(n) ? Delete(n) : Add(n)

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  return (
    <Basket.Provider value={{
      basket,
      Toggle,
      setBasket,
    }}>
      {!spin
        ?
        <div className={'spin'}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        :
        <>
          <Router>
            <MyNavbar />
            <Switch>
              <Route path={`/Categories/:id`} component={Categories}></Route>
              <Route path="/About/:name" component={About}></Route>
              <Route path="/Search/:text" component={Search}></Route>
              <Route path="/Dropdown/:city" component={Dropdown}></Route>
              <Route path="/MyBasket/" component={MyBasket}></Route>
              <Route path="/">
                <Home data={data} />
              </Route>
            </Switch>
          </Router>
        </>
      }
    </Basket.Provider>
  )
}