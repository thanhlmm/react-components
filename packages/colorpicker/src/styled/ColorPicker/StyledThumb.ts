/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.thumb';

export const StyledThumb = styled.div`
  transform: translate(-9px, -1px);
  border-radius: 50%;
  box-shadow: ${props =>
    props.theme.shadows.lg(
      `${props.theme.shadowWidths.sm}`,
      '4px',
      getColor('black', undefined, props.theme, 0.37)!
    )};
  background-color: ${props => props.theme.colors.background};
  width: ${props => props.theme.space.base * 4.5}px;
  height: ${props => props.theme.space.base * 4.5}px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledThumb.defaultProps = {
  theme: DEFAULT_THEME
};
