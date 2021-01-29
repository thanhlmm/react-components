/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.saturation_wrapper';

export const StyledSaturationWrapper = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  position: relative;
  margin-bottom: ${props => props.theme.space.base * 2}px;
  padding-bottom: 75%;
  overflow: hidden;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledSaturationWrapper.defaultProps = {
  theme: DEFAULT_THEME
};