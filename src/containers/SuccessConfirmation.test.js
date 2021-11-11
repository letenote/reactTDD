import * as React from 'react';
import SuccessConfirmation from './SuccessConfirmation';
import { renderWithStateMgmt } from '../lib/test-util';

test(`SuccessConfirmation can be rendered`, () => {
  renderWithStateMgmt(<SuccessConfirmation />); 
});

test(`SuccessConfirmation Display Text "Success Payment"`, async () => {
  const { debug, findByText } = renderWithStateMgmt(<SuccessConfirmation />);
  debug() 
  await findByText('Success Payment');
});