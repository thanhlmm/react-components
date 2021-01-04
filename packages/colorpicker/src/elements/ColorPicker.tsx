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
import { EditableInput, Saturation } from 'react-color/lib/components/common';
import {
  StyledThumb,
  StyledColorPicker,
  StyledSaturation,
  StyledFlex,
  StyledPreview,
  StyledSliders,
  StyledHue,
  StyledAlpha
} from '../styled/ColorPicker';
import { isValidHex, toState, simpleCheckForValidColor } from '../utils';
import { Alpha } from './Alpha';
import { Hue } from './Hue';

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
  onChange?: (ColorState: IColorState, event?: Event) => any;
}

export interface IColorWrapComp {
  hex: HEXColor;
  rgb: RGBColor;
  hsl: HSLColor;
  hsv: HSVColor;
  color: Color;
  strings?: Strings;
  onChange?: (data?: any, event?: Event) => any;
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

    if (colorInputType === 'hex') {
      const key = Object.keys(data)[0];
      const isValid = isValidHex(data[key]);

      isValid && onChange && onChange({ hex: tinycolor(data[key]).toHex(), source: 'hex' }, e);
    }

    if (isNaN(inputValue)) return;

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
      <StyledFlex>
        <StyledPreview backgroundColor={tinycolor(rgb).toRgbString()} />
        <StyledSliders>
          <StyledHue>
            <Hue
              hsl={hsl}
              onChange={onChange}
              radius={theme.borderRadii.sm}
              pointer={() => <StyledThumb />}
              rtl={theme.rtl}
            />
          </StyledHue>
          <StyledAlpha>
            <Alpha
              style={{
                // pointer: {
                //   left: 0,
                //   right: `-${rgb.a! * 100}%`
                // },
                checkboard: {
                  borderRadius: theme.borderRadii.sm
                },
                gradient: {
                  borderRadius: theme.borderRadii.sm,
                  fontSize: '50px'
                  // background: `linear-gradient(to left, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
                  // rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`
                }
              }}
              rgb={rgb}
              hsl={hsl}
              onChange={onChange}
              pointer={() => <StyledThumb />}
              rtl={theme.rtl}
            />
          </StyledAlpha>
        </StyledSliders>
      </StyledFlex>
      <StyledFlex>
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
        {rgb.a !== undefined && (
          <EditableInput
            style={{ wrap: WRAP_STYLE, label: LABEL_STYLE, input: INPUT_STYLE }}
            label={strings.alpha || 'A'}
            value={Math.round(rgb.a * 100)}
            onChange={inputChange.bind(null, 'alpha')}
          />
        )}
      </StyledFlex>
    </StyledColorPicker>
  );
});

ColorPicker.propTypes = {
  onChange: PropTypes.func,
  color: PropTypes.any,
  strings: PropTypes.object
};
