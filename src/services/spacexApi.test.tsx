import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLaunches } from './spacexApi';
import { mockLaunches } from './mockData';

// Мокаем глобальную функцию fetch
global.fetch = vi.fn();

describe('spacexApi', () => {
    beforeEach(() => {
        // Очищаем все моки перед каждым тестом
        vi.clearAllMocks();
    });

    // ТЕСТ 1: Успешный запрос с годом по умолчанию (2020)
    it('must return a successful run array without specifying the year', async () => {
        // Мокаем успешный ответ fetch
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockLaunches)
        };
        vi.mocked(fetch).mockResolvedValue(mockResponse as any);

        // Вызываем тестируемую функцию без параметров (год по умолчанию)
        const result = await getLaunches();

        // - fetch был вызван с правильным URL (год по умолчанию 2020)
        expect(fetch).toHaveBeenCalledWith('https://api.spacexdata.com/v3/launches?launch_year=2020');
        // - возвращен правильный результат
        expect(result).toEqual(mockLaunches);
        // - результат содержит 3 запуска
        expect(result).toHaveLength(3);
        // - json метод был вызван
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    // ТЕСТ 2: Обработка HTTP ошибки
    it('should throw error when the answer is not ok', async () => {
        // Мокаем НЕ успешный ответ fetch
        const mockResponse = {
            ok: false,
            status: 404
        };
        vi.mocked(fetch).mockResolvedValue(mockResponse as any);

        // Проверяем что функция выбрасывает ошибку
        await expect(getLaunches()).rejects.toThrow('HTTP error! status: 404');

        // Проверяем что fetch был вызван
        expect(fetch).toHaveBeenCalledWith('https://api.spacexdata.com/v3/launches?launch_year=2020');
    });

    // ТЕСТ 3: Обработка сетевой ошибки
    it('should throw error at network problem', async () => {
        // Мокаем что fetch выбрасывает ошибку
        const networkError = new Error('Network failure');
        vi.mocked(fetch).mockRejectedValue(networkError);

        // Проверяем что функция пробрасывает сетевую ошибку
        await expect(getLaunches()).rejects.toThrow('Network failure');
    });

    // ТЕСТ 4: Удаление дубликатов по flight_number
    it('should delete duplicate starts by flight_number', async () => {
        // Создаем мок данные с дубликатами
        const dataWithDuplicates = [
            mockLaunches[0], // Starlink-1
            mockLaunches[0], // Дубликат Starlink-1
            mockLaunches[1], // Crew Dragon
            mockLaunches[0], // Еще один дубликат Starlink-1
            mockLaunches[2], // Starlink-2
        ];

        // Мокаем успешный ответ с дубликатами
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(dataWithDuplicates)
        };
        vi.mocked(fetch).mockResolvedValue(mockResponse as any);

        // Вызываем тестируемую функцию
        const result = await getLaunches();

        // - дубликаты удалены, остались только уникальные flight_number
        expect(result).toHaveLength(3);
        // - порядок сохранен
        expect(result[0].flight_number).toBe(94);
        expect(result[1].flight_number).toBe(95);
        expect(result[2].flight_number).toBe(96);
        // - все оригинальные данные на месте
        expect(result[0].mission_name).toBe('Starlink-1');
        expect(result[1].mission_name).toBe('Crew Dragon In-Flight Abort Test');
        expect(result[2].mission_name).toBe('Starlink-2');
    });

    // ТЕСТ 5: Проверка структуры возвращаемых данных
    it('must return data in the correct Launch format', async () => {
        // Мокаем успешный ответ
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue([mockLaunches[0]])
        };
        vi.mocked(fetch).mockResolvedValue(mockResponse as any);

        // Вызываем тестируемую функцию
        const result = await getLaunches();

        // Проверяем структуру данных первого запуска
        const firstLaunch = result[0];
        expect(firstLaunch).toHaveProperty('flight_number', 94);
        expect(firstLaunch).toHaveProperty('mission_name', 'Starlink-1');
        expect(firstLaunch).toHaveProperty('launch_year', '2020');
        expect(firstLaunch).toHaveProperty('rocket');
        expect(firstLaunch.rocket).toHaveProperty('rocket_name', 'Falcon 9');
        expect(firstLaunch).toHaveProperty('launch_success', true);
        expect(firstLaunch).toHaveProperty('details');
        expect(firstLaunch).toHaveProperty('links');
        expect(firstLaunch.links).toHaveProperty('mission_patch');
        expect(firstLaunch.links).toHaveProperty('mission_patch_small');
        expect(firstLaunch.links).toHaveProperty('article_link');
        expect(firstLaunch.links).toHaveProperty('wikipedia');
        expect(firstLaunch.links).toHaveProperty('video_link');
    });
});

