/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorPicker, ColorDialog } from '@zendeskgarden/react-colorpicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker
} as Meta;

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
  source?: string;
}

export const Default: Story<any> = () => {
  const magentaRGB = { r: 255, g: 0, b: 255, a: 0.5 };
  // const blueRGBString = 'rgb(0,2,255)';
  // const blueRGBString = { h: 240, s: 100, l: 50, a: 1 };
  const lime = '#b4da55';
  const [color, setColor] = React.useState(lime);
  const [color1, setColor1] = React.useState(lime);
  const [color2, setColor2] = React.useState<RGBColor>(magentaRGB);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ColorDialog
          hasArrow
          isAnimated
          color={color}
          onChange={data => {
            setColor(data.hex);
          }}
          strings={{
            hex: 'عرافة',
            alpha: 'ألفا',
            red: 'أحمر',
            green: 'أخضر',
            blue: 'أزرق'
          }}
        />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
      <br />
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
      <br />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
      <br />
      <ColorPicker
        color={color2}
        onChange={data => {
          setColor2(data.rgb);
        }}
      />
    </>
  );
};
