/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { arrowStyles, retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { getArrowPosition } from '../../utils/gardenPlacements';

const COMPONENT_ID = 'colorpicker.dialog.colorpicker';

export const StyledColorPicker = styled.div.attrs<any>(props => ({
  'data-garden-version': PACKAGE_VERSION,
  className: props.isAnimated && 'is-animated'
}))<any>`
  ${props =>
    props.hasArrow &&
    arrowStyles(getArrowPosition(props.placement), {
      size: `${props.theme.space.base * 2.5}px`,
      inset: `${props.theme.space.base / 2}px`,
      animationModifier: '.is-animated'
    })};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledColorPicker.defaultProps = {
  theme: DEFAULT_THEME
};
