import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchProduct, getOne } from '../../../redux/productsRedux';
import { addToBracket } from '../../../redux/bracketRedux';
import { IMAGES_URL } from '../../../redux/config.js';
import { Link } from 'react-router-dom';

import styles from './Product.module.scss';


class Component extends React.Component {

  state = {
    product: {
      pieces: 0,
    }
  }

  componentDidMount() {
    const {fetchOneProduct} = this.props;
    fetchOneProduct();
  }

  handleChange = (e) => {
    const {product} = this.state;
    product.pieces = e.target.value;
  };

  addToCard(product){
    if(this.state.product.pieces > 0){
    const {addOneProduct} = this.props;
    let productBracket = {
      id: product._id,
      content: product.content,
      title: product.title,
      photo: product.images[0],
      pieces: this.state.product.pieces,
      price: product.price,
      remarks: '',
    }

    addOneProduct(productBracket);
  } else {
    alertify.alert('You did not choose pieces :)', 'Please fill pieces!');
  };
  };

  render() {
    const {className, product} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        {product ? 
        
        <div className="container">
          <div className={` row ${styles.productCard}`}>
            <div className="col-auto">
              <Card key={product._id}>
                <CardHeader title={product.title}></CardHeader>
                <CardContent>
                  <Typography variant="h5" 
                    color="secondary" 
                    component="p">
                      Price: {product.price} zł
                  </Typography>
                    </CardContent>
                <CardMedia className={styles.productPhoto}
                  component="img"
                  src={`${IMAGES_URL}/${product.images ? product.images[0] : ''}`}>
                </CardMedia>
                <CardContent>
                  <Typography variant="body2" 
                    color="primary"
                    component="p">
                      {product.content}
                    </Typography>
                </CardContent>
                {product.images.map(image =>
                <div className={styles.productImage}>
                  <img alt="productImage" src={`${IMAGES_URL}/${image}`} />
                </div>
                  )}
                <CardContent>
                  <TextField name="piece"
                    placeholder="Pieces:" 
                    InputProps={{ inputProps: { max: 10, min: 0 }}} 
                    type="number"
                    onChange={(e)=> this.handleChange(e)}></TextField>
                  <Button variant="contained"
                    className={styles.buttonAdd}
                    onClick={() => this.addToCard(product)}
                    color="primary"
                    size="medium"
                    startIcon={<AddShoppingCartIcon />}>
                      Add to card
                    </Button>
                    <Button variant="contained"
                    className={styles.buttonBack}
                    color="primary"
                    size="medium"
                    startIcon={<KeyboardBackspaceIcon />}
                    >
                      <Link to='/products'>Go back</Link>
                    </Button>
                </CardContent>
              </Card>
          </div>
          </div>
        </div>
        : <span>loading</span> }
      </div>
    )
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  product: getOne(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOneProduct: () => dispatch(fetchProduct(props.match.params.id)),
  addOneProduct:(payload) => dispatch(addToBracket(payload))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};
