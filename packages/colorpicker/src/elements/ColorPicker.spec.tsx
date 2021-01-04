/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'garden-test-utils';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('Updates the preview box when the hex input is changed', () => {
    const { getByLabelText, getByTestId } = render(<ColorPicker color="yellow" />);
    const hexInput = getByLabelText('Hex');
    const previewBox = getByTestId('preview-box');

    expect(previewBox).toHaveStyle('background: rgb(255, 255, 0);');

    userEvent.clear(hexInput);
    userEvent.type(hexInput, '#b4da55');

    expect(previewBox).toHaveStyle('background: rgb(180, 218, 85);');
  });

  it('Updates the preview box when the RGB/A inputs are changed', () => {
    const { getByLabelText, getByTestId } = render(<ColorPicker color="yellow" />);
    const redInput = getByLabelText('R');
    const greenInput = getByLabelText('G');
    const blueInput = getByLabelText('B');
    const alphaInput = getByLabelText('A');
    const previewBox = getByTestId('preview-box');

    expect(previewBox).toHaveStyle('background: rgb(255, 255, 0);');

    userEvent.clear(redInput);
    userEvent.type(redInput, '180');
    expect(previewBox).toHaveStyle('background: rgb(180, 255, 0);');

    userEvent.clear(greenInput);
    userEvent.type(greenInput, '218');
    expect(previewBox).toHaveStyle('background: rgb(180, 218, 0);');

    userEvent.clear(blueInput);
    userEvent.type(blueInput, '85');
    expect(previewBox).toHaveStyle('background: rgb(180, 218, 85);');

    userEvent.clear(alphaInput);
    userEvent.type(alphaInput, '65');
    expect(previewBox).toHaveStyle('background: rgba(180, 218, 85, 0.65);');
  });

  it('Does not change the color for the preview box when user types an invalid RGB/A', () => {
    const { getByLabelText, getByTestId } = render(<ColorPicker color="yellow" />);
    const hexInput = getByLabelText('Hex');
    const previewBox = getByTestId('preview-box');

    expect(previewBox).toHaveStyle('background: rgb(255, 255, 0);');

    userEvent.clear(hexInput);
    userEvent.type(hexInput, '#b4da55');

    expect(previewBox).toHaveStyle('background: rgb(180, 218, 85);');
  });
});
