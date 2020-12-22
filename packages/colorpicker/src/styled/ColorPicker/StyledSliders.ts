/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.sliders';

export const StyledSliders = styled.div`
  margin-left: ${props => props.theme.space.base * 2}px;
  width: 100%;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledSliders.defaultProps = {
  theme: DEFAULT_THEME
};
