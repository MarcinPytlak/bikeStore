/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { fetchCategories, getAllCategories } from '../../../redux/categoriesRedux.js';
import { fetchProducts, getAll } from '../../../redux/productsRedux';
import { IMAGES_URL } from '../../../redux/config.js';
import styles from './AllProducts.module.scss';


class Component extends React.Component {
  state = {
    activeCategory: 'shockAbsorber',
    className: styles.fadeEnd,
  }
  componentDidMount(){
    const {fetchProducts, fetchCategories} = this.props;
    fetchProducts();
    fetchCategories();
  }

  handleCategoryChange(id){
    this.setState({ className: `${styles.fadeStart}`});
    setTimeout(() => {
      this.setState({
        activeCategory: id,
        className:`${styles.fadeEnd}`,
      });
    });
    
  }

  render() {

    const{categories, products, className} = this.props;
    const {activeCategory} = this.state;
    let categoryProducts = [];

    if(products.length){
      categoryProducts = products.filter(product=> product.category === activeCategory);
    }
    
    return (
      <div className={clsx(className, styles.root)}>
        <div className="container">
          <div className={styles.panelBar}>
            <div className={`row no-gutters ${styles.menuPagesBar}`}>
              <div className={'col-auto ' + styles.heading}>
                <h3>Our products</h3>
              </div>
              <div className={'col ' + styles.menu}>
                <ul>
                  {categories ? categories.map(item => (
                    <li key={item.id}>
                      <a
                        className={item.id === activeCategory && styles.active}
                        onClick={() => this.handleCategoryChange(item.id)}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))
                : <span>loading...</span>}
                </ul>
              </div>
            </div>
          </div>
          <div className={`row ${styles.products} ${this.state.className}`}>
            {categoryProducts.map(product => (
              <div key={product.id} className={`col-xs-6 col-md-4 + ${styles.singleProduct}`}>
                <Card key={product.title} className={styles.card}>
                  <CardActionArea>
                    <CardMedia className={styles.cardmedia}
                      styles={"object-fit : contain"}
                      component="img"
                      src={`${IMAGES_URL}/${product.images ? product.images[0] : ''}`}/>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h2">{product.title}</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Price: {product.price} zł
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="medium" color="secondary">
          <Link to={`/products/${product._id}`}>See details</Link>
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string,
      content: PropTypes.string,
      category: PropTypes.string,
    })
  ),
  fetchProducts: PropTypes.func,
  fetchCategories: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories : () =>dispatch(fetchCategories()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as AllProducts,
  Container as AllProducts,
  Component as AllProductsComponent,
};
