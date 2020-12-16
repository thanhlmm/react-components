/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'colorpicker.preview.box';

interface IStyledPreviewBox {
  backgroundColor?: any;
}

export const StyledPreviewBox = styled.div.attrs<IStyledPreviewBox>(props => ({
  style: { background: props.backgroundColor }
}))<IStyledPreviewBox>`
  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.19);
  width: 36px;
  height: 36px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledPreviewBox.defaultProps = {
  theme: DEFAULT_THEME
};
