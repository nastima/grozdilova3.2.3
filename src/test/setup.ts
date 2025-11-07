import '@testing-library/jest-dom';
import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Мок window.matchMedia для Mantine
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

// Автоматическая очистка после каждого теста
afterEach(() => {
    cleanup();
});