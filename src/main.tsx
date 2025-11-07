import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import App from './app/App.tsx'

const theme = createTheme({
    colors: {
        blue: [
            '#e7f5ff',
            '#d0ebff',
            '#a5d8ff',
            '#74c0fc',
            '#4dabf7',
            '#339af0',
            '#228be6',
            '#1c7ed6',
            '#1971c2',
            '#1864ab',
        ],
    },
    white: '#ffffff',
    black: '#000000',
    components: {
        Card: {
            defaultProps: {
                shadow: 'sm',
                padding: 'md',
                radius: 'md',
                withBorder: true,
            },
            styles: (theme: any) => ({
                root: {
                    width: '300px',
                    height: '380px',
                    paddingBottom: '20px',
                    borderRadius: '24px',
                    backgroundColor: theme.white,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0px 2px 8px 0px #21252914, 0px 1px 2px 0px #2125291A',
                },
            }),
        },
        Button: {
            defaultProps: {
                color: 'blue',
                size: 'md',
            },
            styles: (theme: any) => ({
                root: {
                    width: '250px',
                    height: '35px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontSize: '14px',
                    backgroundColor: theme.colors.blue[6],
                    color: theme.white,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                },
            }),
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </StrictMode>,
)