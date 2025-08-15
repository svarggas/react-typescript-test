import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.MEDIASTACK_ACCESS_KEY': JSON.stringify(
        process.env.MEDIASTACK_ACCESS_KEY,
      ),
    },
  },
});
