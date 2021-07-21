import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { changeBracket, removeFromBracket, updateBracket} from '../../../redux/bracketRedux';

import styles from './ShopBracket.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { getBracket } from '../../../redux/bracketRedux';
import { IMAGES_URL } from '../../../redux/config.js';
import { TextField } from '@material-ui/core';

class Component extends React.Component {

  countTotal(pieces, price){
    let amount = parseInt(price);
    return pieces * amount;
  };

  render() {
    const { className, bracketProduct, removeProduct, updateBracket, changeBracket} = this.props;
    const card = bracketProduct.bracketProducts;
    return(
      <div className={clsx(className, styles.root)}>
        {card.length ?
        <div className="container">
          <h3 className={styles.bracketTitle}>Your shopping list:</h3>
          <p>To close bracket, click on the BRACKET icon</p>
          {card.map(product =>
            <div className={`row + ${styles.productBracket}`}>
              <div className={`col-sm-4 col-md-4 + ${styles.bracketPhoto}`}>
                <img alt="shopPhoto" src={`${IMAGES_URL}/${product.photo}`} /> 
              </div>
              <div className={`col-sm-4 col-md-4 + ${styles.bracketTitle}`}>
                <h5>{product.title}</h5> 
              </div>
              <div className={`col-sm-2 col-md-2 + ${styles.bracketPieces}`}>
                <TextField name="piece" type="number" InputProps={{ inputProps: { max: 10, min: 1 }}} defaultValue={product.pieces} label="Pieces" onChange={(event) => changeBracket(event.target.value, product.id, product.price, product.title)}></TextField>
                <p>Total: {this.countTotal(product.pieces, product.price)}zł</p>
              </div>
              <div className={`col-sm-2 col-md-2 + ${styles.bracketAction}`}>
                 <FontAwesomeIcon icon={faTrash} type="button" onClick={()=> removeProduct(product)}/>
              </div>
              <div className="row">
                <div className={`col-sm-12 col-md-12 + ${styles.additionRemarks}`}>
                  <TextField id="standard-basic" label="Additional remarks" className={styles.additionalText} onChange={(event) => updateBracket(event.target.value, product.id)}></TextField>
                </div>
              </div>
            </div>
            )}
            <div className="row">
              <h5>TOTAL : {bracketProduct.total} zł</h5>
                <div className={`col-sm-12 col-md-12 + ${styles.order}`}>
                  <Button variant="contained"
                    className={styles.buttonOrder}
                    color="primary"
                    size="medium"
                    >
                    <Link to='/order'>Let's ORDER IT !</Link>
                  </Button>
                </div>
              </div>
        </div>  
        :
        <p>Your bracket is empty, so let's go shopping!</p>}
      </div> 
    )
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  bracketProduct: getBracket(state),
});

const mapDispatchToProps = dispatch  => ({
  removeProduct: (payload) => dispatch(removeFromBracket(payload)),
  updateBracket: (value, id) => dispatch(updateBracket([value, id])),
  changeBracket: (value, id, price, title) => dispatch(changeBracket([value, id, price, title])),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as ShopBracket,
  Container as ShopBracket,
  Component as ShopBracketComponent,
};
