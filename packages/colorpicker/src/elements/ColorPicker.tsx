/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import tinycolor from 'tinycolor2';
import { EditableInput, Saturation, Hue, Alpha } from 'react-color/lib/components/common';
import {
  StyledThumb,
  StyledColorPicker,
  StyledSaturation,
  StyledFlexContainer,
  StyledPreviewBox,
  StyledSliders,
  StyledHue,
  StyledAlpha
} from '../styled';
import { isValidHex, toState, simpleCheckForValidColor } from '../utils';

export interface HEXColor {
  hex: string;
  source?: string;
}

export interface HSLColor {
  a?: number;
  h: number;
  l: number;
  s: number;
  source?: string;
}

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
  source?: string;
}

export interface HSVColor {
  a?: number;
  h: number;
  s: number;
  v: number;
  source?: string;
}

export type Color = string | HEXColor | HSLColor | RGBColor | HSVColor;

export type ColorInputType = 'red' | 'green' | 'blue' | 'alpha' | 'hex';

export interface Strings {
  hex?: string;
  red?: string;
  green?: string;
  blue?: string;
  alpha?: string;
}

export interface IColorState {
  hex: string;
  hsl: HSLColor;
  hsv: HSVColor;
  rgb: RGBColor;
  oldHue: number;
  source: string;
}

// export type ColorChangeHandler<T = HSLColor | HSVColor | RGBColor> = (color: T) => void;

export interface IColorPickerProps {
  /** Sets the current color of the color picker. Accepts hex string or object of rgb, hsl, and hsv */
  color: Color;
  /** Replaces the default (English) labels */
  strings?: Strings;
  /** The callback that is fired when a color picker state is changed */
  onChange?: (ColorState?: IColorState, event?: Event) => any;
  /** The callback that is fired after a series of color picker states have changed */
  onChangeComplete?: any; // implement this
}

export interface IColorWrapComp {
  hex: HEXColor;
  rgb: RGBColor;
  hsl: HSLColor;
  hsv: HSVColor;
  color: Color;
  strings?: Strings;
  onChange?: (data?: any, event?: Event) => any;
  onChangeComplete?: any; // implement this?
}

export const ColorWrap = (Picker: React.FC<any>) => {
  const Comp = (props: IColorPickerProps) => {
    const [state, setState] = React.useState<IColorState>({
      ...toState(props.color, 0)
    });

    const handleChange = (data: any, event: Event) => {
      const isValidColor = simpleCheckForValidColor(data);

      if (isValidColor) {
        const colors = toState(data, data.h || state.oldHue);

        setState(colors);
        props.onChangeComplete && props.onChangeComplete(colors, event);

        props.onChange && props.onChange(colors, event);
      }
    };

    return <Picker {...props} {...state} onChange={handleChange} />;
  };

  return Comp;
};

// eslint-disable-next-line new-cap
export const ColorPicker: React.FC<IColorPickerProps> = ColorWrap((props: IColorWrapComp) => {
  const { onChange, hex, rgb, hsl, hsv, strings = {} } = props;
  const theme = useContext(ThemeContext);

  const inputChange = (colorInputType: ColorInputType, data: any, e: Event) => {
    const label = Object.keys(data)[0];
    const inputValue = Number(data[label]);

    if (colorInputType === 'red') {
      onChange && onChange({ ...rgb, r: inputValue, e });
    }

    if (colorInputType === 'green') {
      onChange && onChange({ ...rgb, g: inputValue, e });
    }

    if (colorInputType === 'blue') {
      onChange && onChange({ ...rgb, b: inputValue, e });
    }

    if (colorInputType === 'alpha') {
      onChange && onChange({ ...rgb, a: Number(inputValue) / 100 }, e);
    }

    if (colorInputType === 'hex') {
      const key = Object.keys(data)[0];
      const isValid = isValidHex(data[key]);

      isValid && onChange && onChange({ hex: tinycolor(data[key]).toHex(), source: 'hex' }, e);
    }
  };

  const LABEL_STYLE = {
    margin: `${theme.space.base}px 0px`,
    textAlign: 'center',
    color: theme.palette.grey[600],
    fontSize: theme.fontSizes.md
  };

  const INPUT_STYLE = {
    padding: `${theme.space.base}px 0px`,
    textAlign: 'center',
    color: theme.palette.grey[800]
  };

  const WRAP_STYLE = {
    width: '17%',
    display: 'flex',
    flexDirection: 'column-reverse'
  };

  return (
    <StyledColorPicker>
      <StyledSaturation>
        <Saturation onChange={onChange} hsl={hsl} hsv={hsv} pointer={() => <StyledThumb />} />
      </StyledSaturation>
      <StyledFlexContainer>
        <StyledPreviewBox backgroundColor={tinycolor(rgb).toRgbString()} />
        <StyledSliders>
          <StyledHue>
            <Hue
              hsl={hsl}
              onChange={onChange}
              radius={theme.borderRadii.sm}
              pointer={() => <StyledThumb />}
            />
          </StyledHue>
          <StyledAlpha>
            <Alpha
              style={{
                checkboard: { borderRadius: theme.borderRadii.sm },
                gradient: { borderRadius: theme.borderRadii.sm }
              }}
              rgb={rgb}
              hsl={hsl}
              onChange={onChange}
              pointer={() => <StyledThumb />}
            />
          </StyledAlpha>
        </StyledSliders>
      </StyledFlexContainer>
      <StyledFlexContainer>
        <EditableInput
          label={strings.hex || 'Hex'}
          style={{
            wrap: { ...WRAP_STYLE, width: '28%' },
            label: LABEL_STYLE,
            input: INPUT_STYLE
          }}
          value={hex}
          onChange={inputChange.bind(null, 'hex')}
        />
        <EditableInput
          style={{ wrap: WRAP_STYLE, label: LABEL_STYLE, input: INPUT_STYLE }}
          label={strings.red || 'R'}
          value={rgb.r}
          onChange={inputChange.bind(null, 'red')}
        />
        <EditableInput
          style={{ wrap: WRAP_STYLE, label: LABEL_STYLE, input: INPUT_STYLE }}
          label={strings.green || 'G'}
          value={rgb.g}
          onChange={inputChange.bind(null, 'green')}
        />
        <EditableInput
          style={{ wrap: WRAP_STYLE, label: LABEL_STYLE, input: INPUT_STYLE }}
          label={strings.blue || 'B'}
          value={rgb.b}
          onChange={inputChange.bind(null, 'blue')}
        />
        <EditableInput
          style={{ wrap: WRAP_STYLE, label: LABEL_STYLE, input: INPUT_STYLE }}
          label={strings.alpha || 'A'}
          value={rgb.a ? Math.round(rgb.a * 100) : 100}
          onChange={inputChange.bind(null, 'alpha')}
        />
      </StyledFlexContainer>
    </StyledColorPicker>
  );
});

ColorPicker.propTypes = {
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  color: PropTypes.any,
  strings: PropTypes.object
};
