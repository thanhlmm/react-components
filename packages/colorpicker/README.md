# @zendeskgarden/react-colorpicker [![npm version](https://flat.badgen.net/npm/v/@zendeskgarden/react-colorpicker)](https://www.npmjs.com/package/@zendeskgarden/react-colorpicker)

This package includes components related to colorpicker in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/react-colorpicker

# Peer Dependencies - Also Required
npm install react react-dom prop-types styled-components @zendeskgarden/react-theming
```

## Usage

```jsx
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Example } from '@zendeskgarden/react-colorpicker';

/**
 * Place a `ThemeProvider` at the root of your React application
 */
<ThemeProvider>
  <Example>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi...</Example>
</ThemeProvider>;
```

<!--
  TODO:

  * [ ] Add colorpicker to root README table.
  * [ ] Add colorpicker to demo `index.html`.
  * [ ] Add colorpicker to `styleguide.base.config.js` webpack globals.
  * [ ] Delete this comment block.
-->
