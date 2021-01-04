/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

// Styled-Component setup
import 'jest-styled-components';

import '@testing-library/jest-dom/extend-expect';

// Enable async/await
import '@babel/polyfill';

// https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
HTMLCanvasElement.prototype.getContext = () => {};
