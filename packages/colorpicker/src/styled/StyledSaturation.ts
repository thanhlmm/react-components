/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.saturation';

export const StyledSaturation = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.space.base}px;
  border-radius: ${props => props.theme.space.base}px;
  padding-bottom: 75%;
  width: 100%;
  overflow: hidden;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledSaturation.defaultProps = {
  theme: DEFAULT_THEME
};
