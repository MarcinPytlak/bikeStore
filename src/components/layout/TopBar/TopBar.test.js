import React from 'react';
import { shallow } from 'enzyme';
import { TopBarComponent } from './TopBar';

describe('Component TopBar', () => {
  it('should render without crashing', () => {
    const component = shallow(<TopBarComponent />);
    expect(component).toBeTruthy();
  });
});
