import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

function render(ui: React.ReactElement, options = {}) {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MantineProvider>
            {children}
        </MantineProvider>
    );

    return rtlRender(ui, { wrapper, ...options });
}

export * from '@testing-library/react';
export { render };