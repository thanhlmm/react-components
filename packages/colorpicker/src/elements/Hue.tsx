import React, { Component, PureComponent } from 'react';

export const calculateChange = (e: any, direction: any, hsl: any, container: any, rtl: any) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (direction === 'vertical') {
    let h;

    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      const percent = -((top * 100) / containerHeight) + 100;

      h = (360 * percent) / 100;
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl'
      };
    }
  } else {
    let h;

    if (left < 0) {
      h = rtl ? 359 : 0;
    } else if (left > containerWidth) {
      h = rtl ? 0 : 359;
    } else {
      const percent = rtl ? 99 - (left * 100) / containerWidth : (left * 100) / containerWidth;

      h = (360 * percent) / 100;
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl'
      };
    }
  }

  return null;
};

export class Hue extends (PureComponent || Component)<any> {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e: any) => {
    const change = calculateChange(
      e,
      this.props.direction,
      this.props.hsl,
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

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { direction = 'horizontal' } = this.props;

    const position = (this.props.hsl.h * 100) / 360;

    const rtlPosition = 100 - (this.props.hsl.h * 100) / 360;

    const pointerPosition = this.props.rtl ? rtlPosition : position;

    const styles: any = {
      hue: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: this.props.radius,
        boxShadow: this.props.shadow
      },
      container: {
        padding: '0 2px',
        position: 'relative',
        height: '100%',
        borderRadius: this.props.radius
      },
      pointer: {
        position: 'absolute',
        left: `${pointerPosition}%`
      },
      slider: {
        marginTop: '1px',
        width: '4px',
        borderRadius: '1px',
        height: '8px',
        boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
        background: '#fff',
        transform: 'translateX(-2px)'
      }
    };

    return (
      <div style={styles.hue}>
        <div
          className={`hue-${direction}`}
          style={styles.container}
          ref={container => ((this as any).container = container)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <style>{`
            .hue-horizontal {
              background: linear-gradient(to ${
                this.props.rtl ? 'left' : 'right'
              }, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to ${
                this.props.rtl ? 'left' : 'right'
              }, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }

            .hue-vertical {
              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `}</style>
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

export default Hue;
