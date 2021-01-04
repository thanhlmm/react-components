/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { Meta } from '@storybook/react';
import { ColorPicker } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/Colorpicker',
  component: ColorPicker
} as Meta;

export { Default } from './examples/Default';

export { Dialog } from './examples/Dialog';
