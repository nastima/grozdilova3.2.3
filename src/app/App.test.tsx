import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../test/test-utils';
import App from './App';
import { mockLaunches } from '../services/mockData';
import { getLaunches } from '../services/spacexApi'

// Mock модуля API
vi.mock('../services/spacexApi', () => ({
    getLaunches: vi.fn()
}))

describe('App Component', () => {
    // Сбрасываем моки перед каждым тестом
    beforeEach(() => {
        vi.mocked(getLaunches).mockReset();
    });

    // Тест 1: Проверяем отображение заголовка
    it('should render main title', async () => {
        // Мокаем успешный ответ с mockLaunches
        vi.mocked(getLaunches).mockResolvedValue(mockLaunches);

        render(<App />)

        // Ждем появления заголовка
        await waitFor(() => {
            expect(screen.getByText('SpaceX Launches 2020')).toBeInTheDocument()
        })
    })

    // Тест 2: Проверяем успешную загрузку данных
    it('should render launches when API succeeds', async () => {
        // Используем мок
        vi.mocked(getLaunches).mockResolvedValue(mockLaunches)

        render(<App />)

        // Ждем появления данных из мок файла
        await waitFor(() => {
            expect(screen.getByText('Starlink-1')).toBeInTheDocument()
            expect(screen.getByText('Crew Dragon In-Flight Abort Test')).toBeInTheDocument()
            expect(screen.getByText('Starlink-2')).toBeInTheDocument()
        })
    })

    // Тест 3: Проверяем отображение ошибки
    it('should show error message when API fails', async () => {
        // Настраиваем мок для ошибки
        vi.mocked(getLaunches).mockRejectedValue(new Error('API Error'))

        render(<App />)

        // Ждем появления сообщения об ошибке
        await waitFor(() => {
            expect(screen.getByText('Error!')).toBeInTheDocument()
        })
    })
})