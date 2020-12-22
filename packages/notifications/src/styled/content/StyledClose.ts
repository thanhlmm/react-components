/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { css, ThemeProps, DefaultTheme } from 'styled-components';
import { retrieveComponentStyles, getColor, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { VALIDATION_HUE } from '../../utils/types';

const COMPONENT_ID = 'notifications.close';

interface IStyledCloseProps {
  hue?: VALIDATION_HUE;
}

const colorStyles = (props: IStyledCloseProps & ThemeProps<DefaultTheme>) => {
  let color;
  let hoverColor;
  let focusBackgroundColor;

  if (props.hue) {
    const shade = props.hue === 'warningHue' ? 700 : 600;

    color = getColor(props.hue, shade, props.theme);
    focusBackgroundColor = getColor(props.hue, shade, props.theme, 0.15);
    hoverColor = getColor(props.hue, 800, props.theme);
  } else {
    color = getColor('neutralHue', 600, props.theme);
    focusBackgroundColor = getColor('neutralHue', 600, props.theme, 0.15);
    hoverColor = getColor('neutralHue', 800, props.theme);
  }

  return css`
    color: ${color};

    &:hover,
    &[data-garden-focus-visible] {
      color: ${hoverColor};
    }

    &[data-garden-focus-visible] {
      background-color: ${focusBackgroundColor};
    }
  `;
};

const sizeStyles = (props: ThemeProps<DefaultTheme>) => {
  const position = `${props.theme.space.base * 2.5}px`;
  const size = `${props.theme.space.base * 8}px`;

  return css`
    top: ${position};
    ${props.theme.rtl ? 'left' : 'right'}: ${position};
    width: ${size};
    height: ${size};
  `;
};

/**
 * Used to close a Notification. Supports all `<button>` props
 *
 * 1. Reset for <button> element.
 * 2. Remove dotted outline from Firefox on focus.
 */
export const StyledClose = styled.button.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledCloseProps>`
  display: block;
  position: absolute;
  transition: background-color 0.1s ease-in-out, color 0.25s ease-in-out;
  border: none; /* [1] */
  border-radius: 50%;
  background-color: transparent; /* [1] */
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  font-size: 0; /* [1] */
  user-select: none;

  ${props => sizeStyles(props)};

  &::-moz-focus-inner {
    border: 0; /* [2] */
  }

  &:focus {
    outline: none;
  }

  ${props => colorStyles(props)};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledClose.defaultProps = {
  theme: DEFAULT_THEME
};
