/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorPicker } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker
} as Meta;

export const Default: Story<any> = () => {
  const magentaRGB = { r: 255, g: 0, b: 255, a: 0.5 };
  // const blueRGBString = 'rgb(0,2,255)';
  const blueRGBString = { h: 240, s: 100, l: 50, a: 1 };
  const lime = '#b4da55';
  const [color, setColor] = React.useState(blueRGBString);
  const [color1, setColor1] = React.useState(lime);
  const [color2, setColor2] = React.useState(magentaRGB);

  return (
    <>
      <ColorPicker
        color={color}
        onChange={(data: any) => {
          setColor(data.rgb);
        }}
      />
      <hr />
      <ColorPicker
        color={color1}
        onChange={(data: any) => {
          setColor1(data.rgb);
        }}
        strings={{
          hex: 'عرافة',
          alpha: 'ألفا',
          red: 'أحمر',
          green: 'أخضر',
          blue: 'أزرق'
        }}
      />
      <hr />
      <ColorPicker
        color={color2}
        onChange={(data: any) => {
          setColor2(data.rgb);
        }}
      />
    </>
  );
};
