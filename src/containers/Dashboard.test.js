import * as React from 'react';
import Dashboard from './Dashboard';
import { fireEvent } from '@testing-library/react'; 
import { renderWithStateMgmt, renderWithStateMgmtAndRouter } from '../lib/test-util';
import * as DASHBOARD_ACTION from '../redux/actions/dashboardAction';

test(`Dashboard can be rendered`, () => {
  renderWithStateMgmtAndRouter(<Dashboard />); 
});

test(`Dashboard before add item`, () => {
  const { getByText, getByTestId } = renderWithStateMgmtAndRouter(<Dashboard />);
  expect(getByText('item 1')).not.toBeNull();
  expect(getByTestId('ID-CART-LENGTH')).toHaveTextContent('item 1') 
});

test(`Dashboard after add item`, () => {
  const { getByTestId, getAllByTestId  } = renderWithStateMgmtAndRouter(<Dashboard />, {
    actions: [
      DASHBOARD_ACTION.addItem({
        id: 2,
        price: 250,
      })
    ],
  });
  
  expect(getByTestId('ID-CART-LENGTH')).toHaveTextContent('item 2');
  expect(getAllByTestId('ID-CART-ITEM')).toHaveLength(2)
});

test(`Dashboard can be filled`, async () => {
  // button pay by default is disable
  // if user filled form card number and name => button pay not disable
  const { debug, findByText, getByLabelText, getByText, history } = renderWithStateMgmtAndRouter(<Dashboard />, {
    actions : [], route : '/success-confirmation'
  });
  expect(getByText('Pay').disabled).toBe(true);
  fireEvent.change(getByLabelText('Card Number'), {
    target: {
      value: '5572336646354657',
    },
  });
  fireEvent.change(getByLabelText('Name'), {
    target: {
      value: 'James Bond',
    },
  }); 
  expect(getByText('Pay').disabled).toBe(false);
  debug();
  fireEvent.click(getByText('Pay'));
  console.log("RESULT_DASHBOARD", history)
  await findByText('Paid');
});