/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { getMenuPosition } from '../../utils/gardenPlacements';
import { menuStyles, retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.dialog.menu';

export const StyledMenu = styled.div.attrs<any>(props => ({
  className: props.isAnimated && 'is-animated'
}))<any>`
  ${props =>
    menuStyles(getMenuPosition(props.placement), {
      theme: props.theme,
      hidden: false,
      /**
       * Popper v2 no longer allows margin values to be applied to referenced
       * elements.
       */
      margin: '0',
      zIndex: props.zIndex,
      animationModifier: '.is-animated'
    })};

  outline: none;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledMenu.defaultProps = {
  theme: DEFAULT_THEME
};
