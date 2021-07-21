import React from 'react';
import { shallow } from 'enzyme';
import { CompanyBannerComponent } from './CompanyBanner';

describe('Component CompanyBanner', () => {
  it('should render without crashing', () => {
    const component = shallow(<CompanyBannerComponent />);
    expect(component).toBeTruthy();
  });
});
