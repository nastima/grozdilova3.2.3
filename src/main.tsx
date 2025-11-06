import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css'
import App from './App.tsx'

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
                    // Базовые стили для всех карточек
                    '&[data-variant="custom-card"]': {
                        width: '302px',
                        height: '414px',
                        borderRadius: '24px',
                        backgroundColor: theme.white,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',

                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows.md,
                        },
                    },
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