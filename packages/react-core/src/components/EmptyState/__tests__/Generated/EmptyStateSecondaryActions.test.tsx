/**
 * This test was generated
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import { EmptyStateSecondaryActions } from '../../EmptyStateSecondaryActions';
// any missing imports can usually be resolved by adding them here
import {} from '../..';

it('EmptyStateSecondaryActions should match snapshot (auto-generated)', () => {
  const { asFragment } = render(<EmptyStateSecondaryActions children={<>ReactNode</>} className={"''"} />);
  expect(asFragment()).toMatchSnapshot();
});
