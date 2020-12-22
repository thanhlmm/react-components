/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { getColor } from '@zendeskgarden/react-theming';
import { Story, Meta } from '@storybook/react';
import { Button } from '@zendeskgarden/react-buttons';
import { TooltipModal } from '@zendeskgarden/react-modals';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';

export default {
  title: 'Components/Modals/TooltipModal',
  component: TooltipModal
} as Meta;

const StyledProgress = styled(TooltipModal.FooterItem)`
  flex-grow: 1;
  color: ${p => getColor('neutralHue', 600, p.theme)};
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Example = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();

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

      <Row>
        <Col textAlign="center">
          <Button
            ref={buttonRef}
            onClick={() => {
              setReferenceElement(buttonRef.current);
            }}
          >
            Tooltip modal
          </Button>
          <TooltipModal
            referenceElement={referenceElement}
            onClose={() => setReferenceElement(null)}
            placement="top"
          >
            BEANS!
          </TooltipModal>
        </Col>
      </Row>

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
    </>
  );
};

export const Default: Story = ({
  id,
  zIndex,
  hasArrow,
  isAnimated,
  restoreFocus,
  focusOnMount,
  backdropProps
}) => {
  return <Example />;
};

Default.argTypes = {
  isAnimated: {
    control: 'boolean'
  },
  hasArrow: {
    control: 'boolean'
  },
  zIndex: {
    control: 'boolean'
  },
  focusOnMount: {
    control: 'boolean'
  },
  restoreFocus: {
    control: 'boolean'
  },
  id: {
    control: 'text'
  },
  referenceElement: { control: { disable: true } },
  popperModifiers: { control: { disable: true } },
  backdropProps: { control: { disable: true } },
  placement: {
    control: { disable: true }
  }
};
