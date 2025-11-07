// src/types/global.d.ts
import '@testing-library/jest-dom';

declare global {
    let jest: any;
    let fetch: jest.Mock;
}

export {};