/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, getColor, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.preview';

interface IStyledPreview {
  backgroundColor?: string;
}

export const StyledPreview = styled.div.attrs<IStyledPreview>(props => ({
  style: { background: props.backgroundColor },
  'data-test-id': 'preview-box',
  'data-test-hidden': 'true'
}))<IStyledPreview>`
  box-shadow: inset 0 0 0 1px ${props => getColor('black', undefined, props.theme, 0.37)!};
  width: ${props => props.theme.space.base * 9}px;
  height: ${props => props.theme.space.base * 9}px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledPreview.defaultProps = {
  theme: DEFAULT_THEME
};
