/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, act } from 'garden-test-utils';
import { TooltipModal } from './TooltipModal';

describe('TooltipModal.Close', () => {
  it('passes ref to underlying DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { container, getByRole, rerender } = render(<div />);

    await act(async () => {
      await rerender(
        <TooltipModal referenceElement={container as HTMLElement}>
          <TooltipModal.Close ref={ref} aria-label="Close" />
        </TooltipModal>
      );
    });

    expect(getByRole('button')).toBe(ref.current);
  });
});
