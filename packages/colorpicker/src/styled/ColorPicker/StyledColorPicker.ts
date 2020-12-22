/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import {
  getLineHeight,
  retrieveComponentStyles,
  DEFAULT_THEME
} from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker';

export const StyledColorPicker = styled.div`
  padding: ${props => props.theme.space.base * 4}px !important; /* stylelint-disable-line */
  width: 292px;
  line-height: ${props => getLineHeight(props.theme.space.base * 5, props.theme.fontSizes.md)};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledColorPicker.defaultProps = {
  theme: DEFAULT_THEME
};
