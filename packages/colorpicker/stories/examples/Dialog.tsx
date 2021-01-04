/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorDialog } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorDialog',
  component: ColorDialog
} as Meta;

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
  source?: string;
}

export const Dialog: Story<any> = () => {
  const magentaRGB = { r: 255, g: 0, b: 255, a: 1 };
  const magentaRGB2 = { r: 255, g: 0, b: 0, a: 1 };
  // const blueRGBString = 'rgb(0,2,255)';
  // const blueRGBString = { h: 240, s: 100, l: 50, a: 1 };
  const lime = '#b4da55';
  const [color, setColor] = React.useState(lime);
  const [color1, setColor1] = React.useState<RGBColor>(magentaRGB);
  const [color2, setColor2] = React.useState<RGBColor>(magentaRGB);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ColorDialog
        color={color2}
        onChange={data => {
          setColor2(data.rgb);
        }}
      />
    </div>
  );
};
