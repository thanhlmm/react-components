/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.dialog.preview';

export const StyledPreview = styled.span<any>`
  display: inline-block;
  border-radius: ${props => props.theme.borderRadii.sm};
  background: ${props => props.backgroundColor};
  width: ${props => props.theme.space.base * 5}px;
  height: ${props => props.theme.space.base * 5}px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledPreview.defaultProps = {
  theme: DEFAULT_THEME
};
