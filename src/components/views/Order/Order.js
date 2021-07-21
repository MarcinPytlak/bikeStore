import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

import { connect } from 'react-redux';
import { getBracket } from '../../../redux/bracketRedux';
import { IMAGES_URL } from '../../../redux/config.js';
import { v4 as uuidv4 } from 'uuid';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import styles from './Order.module.scss';
import { fetchAddOrder } from '../../../redux/orderRedux';

class Component extends React.Component{
  state = {
    order: {
      id: '',
      name: '',
      surname: '',
      email:'',
      phone: '',
      address: '',
      address2: '',
      city: '',
      postalCode: '',
      orderData: [],
      finalAmount : 0,
    }
  }

  handleOrderChange = (event) => {
    const {order} = this.state;

    this.setState({ order: {...order, [event.target.name]: event.target.value}});
    console.log(order);
  }


  submitOrder = (event) => {
    event.preventDefault();
    const {order} = this.state;
    const {addOrder, bracketProducts} = this.props;
    const orderProducts = bracketProducts.bracketProducts;
    const orderedProducts = [];
    orderProducts.map(product => {
      let item = {
        id: product.id,
        title: product.title,
        price: product.price,
        pieces: product.pieces,
      }
      return orderedProducts.push(item)
    })
    order.orderData = orderedProducts;
    order.id = uuidv4();
    order.finalAmount = bracketProducts.total;
    addOrder(order);
    alertify.alert('Success!', 'Your order has beem send to us!', function(){ alertify.success('Ok'); });
  }

  countTotal(pieces, price){
    let amount = parseInt(price);
    return pieces * amount;
  };

  render(){
    const {className, bracketProducts} = this.props;
    let products = bracketProducts.bracketProducts;
 
    return(
      <div className={clsx(className, styles.root)}>
      { products.length ? 
        <div className="container">
          <div className={`row + ${styles.orderTitle}`}>
            <h2>Your shopping summary and order</h2>
          </div> 
        {products.map(product=> (
          <div className={`row + ${styles.orderProduct}`}>
            <div className={`col-sm-5 col-md-4 + ${styles.orderPicture}`}>
              <img alt="productPhoto" src={`${IMAGES_URL}/${product.photo}`} />
            </div>
            <div className={`col-sm-5 col-md-4 + ${styles.orderData}`}>
              <h2>{product.title}</h2>
              <div className="row">
                <div className="col-auto">
                  <p>Additional remarks: {product.remarks ? product.remarks : <span>no</span>}</p>
                </div>
              </div>
            </div>
            <div className={`col-sm-2 col-md-2 + ${styles.orderPrice}`}>
              <h5>Price:</h5>
              <p>{this.countTotal(product.pieces, product.price)} zł</p>
            </div>
            <div className={`col-sm-2 col-md-2 + ${styles.orderPieces}`}>
              <h5>Pieces:</h5>
              <p>{product.pieces}</p>
            </div>
          </div>
        ))}
            <div className={styles.sumTotal}>
              <h3>Final amount: <span>{bracketProducts.total}</span> zł</h3>
            </div>
            <h3>Please fill formulage below: </h3>
        <Form onSubmit={this.submitOrder}>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Your name" required onChange={this.handleOrderChange}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input type="text" name="surname" id="surname" placeholder="Your surname" required onChange={this.handleOrderChange} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
          <Label for="email">Your email</Label>
          <Input type="email" name="email" required id="email" placeholder="Enter your email"  onChange={this.handleOrderChange}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Your phone number</Label>
            <Input type="text" name="phone" id="phone" placeholder="Format: 123456789" maxLength={9} required  onChange={this.handleOrderChange}/>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input type="text" name="address" id="address" placeholder="ex. ul.Letnia 3" required onChange={this.handleOrderChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="address2">Address 2</Label>
        <Input type="text" name="address2" id="address2" placeholder="flat number (if it's necessary" onChange={this.handleOrderChange}/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" placeholder="ex. Warszawa" required onChange={this.handleOrderChange}/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="postal">Postal code</Label>
            <Input type="text" name="postalCode" id="postal" placeholder="format 00-495" required maxLength={6} minLength={6} onChange={this.handleOrderChange}/>
          </FormGroup>  
        </Col>
      </Row>
      <FormGroup check row>
        <Col sm={{ size: 10}}>
          <Button>Submit</Button>
        </Col>
      </FormGroup>
        </Form>
        </div>
        : 
        <div className={styles.emptyBracket}>
          <h1>Bracket is empty!</h1>
        </div>
      }
      </div>
    )
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  addOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  bracketProducts: getBracket(state),
});

const mapDispatchToProps = dispatch => ({
  addOrder: (post) => dispatch(fetchAddOrder(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Order,
  Container as Order,
  Component as OrderComponent,
};
