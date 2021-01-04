import React, { Component, PureComponent } from 'react';
import { Checkboard } from 'react-color/lib/components/common';

export const calculateChange = (
  e: any,
  hsl: any,
  direction: any,
  initialA: any,
  container: any,
  rtl: any
) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (direction === 'vertical') {
    let a;

    if (top < 0) {
      a = 0;
    } else if (top > containerHeight) {
      a = 1;
    } else {
      a = Math.round((top * 100) / containerHeight) / 100;
    }

    if (hsl.a !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb'
      };
    }
  } else {
    let a;

    if (left < 0) {
      a = rtl ? 1 : 0;
    } else if (left > containerWidth) {
      a = rtl ? 0 : 1;
    } else {
      a = rtl
        ? 1 - Math.round((left * 100) / containerWidth) / 100
        : Math.round((left * 100) / containerWidth) / 100;
    }

    if (initialA !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb'
      };
    }
  }

  return null;
};

export class Alpha extends (PureComponent || Component)<any> {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e: any) => {
    const change = calculateChange(
      e,
      this.props.hsl,
      this.props.direction,
      this.props.a,
      (this as any).container,
      this.props.rtl
    );

    change && typeof this.props.onChange === 'function' && this.props.onChange(change, e);
  };

  handleMouseDown = (e: any) => {
    this.handleChange(e);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  render() {
    const rgb = this.props.rgb;
    const pointerPosition = this.props.rtl ? 100 - rgb.a * 100 : rgb.a * 100;
    const styles: any = {
      alpha: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: this.props.radius
      },
      checkboard: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        borderRadius: this.props.radius
      },
      gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: `linear-gradient(to ${this.props.rtl ? 'left' : 'right'}, rgba(${rgb.r},${
          rgb.g
        },${rgb.b}, 0) 0%,
				 rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
        boxShadow: this.props.shadow,
        borderRadius: this.props.radius
      },
      container: {
        position: 'relative',
        height: '100%',
        margin: '0 3px'
      },
      pointer: {
        position: 'absolute',
        left: `${pointerPosition}%`
      },
      slider: {
        width: '4px',
        borderRadius: '1px',
        height: '8px',
        boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
        background: '#fff',
        marginTop: '1px',
        transform: 'translateX(-2px)'
      }
    };

    return (
      <div style={styles.alpha}>
        <div style={styles.checkboard}>
          <Checkboard renderers={this.props.renderers} />
        </div>
        <div style={styles.gradient} />
        <div
          style={styles.container}
          ref={container => ((this as any).container = container)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.slider} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Alpha;
