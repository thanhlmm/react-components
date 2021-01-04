/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.flex';

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${props => props.theme.rtl && 'row'};
  justify-content: space-between;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledFlex.defaultProps = {
  theme: DEFAULT_THEME
};
