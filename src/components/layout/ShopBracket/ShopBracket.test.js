import React from 'react';
import { shallow } from 'enzyme';
import { ShopBracketComponent } from './ShopBracket';

describe('Component ShopBracket', () => {
  it('should render without crashing', () => {
    const component = shallow(<ShopBracketComponent />);
    expect(component).toBeTruthy();
  });
});
