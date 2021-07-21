import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getBracket } from '../../../redux/bracketRedux';

import styles from './CompanyBanner.module.scss';
import SimplePopper from '../../common/Popper';

const Component = ({bracket}) => (

  <div className={styles.root}>
    <div className="container">
      <div className={`row ${styles.banner}`}>
        <div className={`col-sm-2 col-md-3 ${styles.logo}`}>
          <a label="Homepage" href="/" ><img src="/bikelogo.png" alt="BikeCentrum" /></a>
        </div>
        <div className={`col-sm-6 col-md-6 text-center ${styles.companyTitle}`}>
          <h4>BikeCentrum</h4>
        </div>
        <div className={`col-sm-4 col-md-3 text-right ${styles.cart}`}>
          <a className={styles.cartBox}>
            <div className={styles.cartIcon}>
              <SimplePopper />
            </div>
            <div className={styles.cartCounter}>{bracket.bracketProducts.length}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  bracket: getBracket(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as CompanyBanner,
  Container as CompanyBanner,
  Component as CompanyBannerComponent,
};
