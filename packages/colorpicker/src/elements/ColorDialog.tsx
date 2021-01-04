/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useState, useEffect, useMemo, useContext } from 'react';
import tinycolor from 'tinycolor2';
import { usePopper } from 'react-popper';
import { ThemeContext } from 'styled-components';
import {
  StyledMenu,
  StyledFauxInput,
  StyledButton,
  StyledPreview,
  StyledColorPicker
} from '../styled/ColorDialog';
import { ColorPicker, IColorPickerProps } from '../index';
import { getRtlPopperPlacement, getPopperPlacement } from '../utils/gardenPlacements';

export interface IColorDialogProps extends IColorPickerProps {
  popperModifiers?: any;
  placement?: any;
  hasArrow?: boolean;
  isAnimated?: boolean;
  zIndex?: number;
}

export const ColorDialog: React.FC<IColorDialogProps> = ({
  color,
  onChange,
  strings,
  popperModifiers,
  placement,
  hasArrow,
  isAnimated,
  zIndex
}) => {
  const theme = useContext(ThemeContext);
  const popperPlacement = useMemo(
    () => (theme.rtl ? getRtlPopperPlacement(placement!) : getPopperPlacement(placement!)),
    [placement, theme.rtl]
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(
    buttonRef.current
  );
  const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
    placement: popperPlacement,
    modifiers: [
      { name: 'offset', options: { offset: [0, theme.space.base * 3] } }, // Default Popper offset
      ...(popperModifiers || [])
    ]
  });

  useEffect(() => {
    if (popperElement) {
      popperElement.focus();
      popperElement.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          buttonRef.current && buttonRef.current.focus();
        }
      });

      const focusableDescendants = Array.from(popperElement.querySelectorAll('*')).filter(
        (element: any) => element.tabIndex > -1
      );

      focusableDescendants.forEach((element: any) => {
        element.addEventListener('blur', () => {
          setTimeout(() => {
            if (popperElement && popperElement.contains(document.activeElement) === false) {
              setReferenceElement(null);
              buttonRef.current && buttonRef.current.focus();
            }
          }, 0);
        });
      });
    }
  }, [popperElement]);

  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        if (popperElement && popperElement.contains(document.activeElement) === false) {
          setReferenceElement(null);
        }
      }, 0);
    };

    popperElement?.addEventListener('blur', listener);

    return () => popperElement?.removeEventListener('blur', listener);
  }, [popperElement]);

  return (
    <>
      <StyledFauxInput tabIndex={-1}>
        <StyledButton
          ref={buttonRef}
          onClick={() => {
            if (popperElement) {
              setReferenceElement(null);
            } else {
              setReferenceElement(buttonRef.current);
            }
          }}
        >
          <StyledPreview backgroundColor={tinycolor(color as any).toRgbString()} />
        </StyledButton>
      </StyledFauxInput>

      {referenceElement ? (
        <StyledMenu
          tabIndex={-1}
          ref={setPopperElement}
          style={styles.popper}
          placement={state ? state.placement : undefined}
          zIndex={zIndex}
          isAnimated={isAnimated}
          {...attributes.popper}
        >
          <StyledColorPicker
            placement={state ? state.placement : 'top'}
            hasArrow={hasArrow}
            isAnimated={isAnimated}
          >
            <ColorPicker color={color} onChange={onChange} strings={strings} />
          </StyledColorPicker>
        </StyledMenu>
      ) : null}
    </>
  );
};

ColorDialog.defaultProps = {
  placement: 'bottom-start',
  hasArrow: false,
  isAnimated: false
};
