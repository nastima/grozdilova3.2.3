import { describe, it, expect } from 'vitest';
import { reducer, initialState } from './Reducer';
import { mockLaunches } from '../services/mockData';

describe('Reducer', () => {
    // ТЕСТ 1: Проверка начального состояния
    it('should return the default initial state', () => {
        // Вызываем редюсер с неизвестным action type
        const result = reducer(initialState, { type: 'UNKNOWN_ACTION' } as any);

        // Проверяем что состояние не изменилось
        expect(result).toEqual(initialState);
    });

    // ТЕСТ 2: Обработка начала загрузки данных (FETCH_START)
    it('must set loading=true and clear error at FETCH_START', () => {
        // Начальное состояние с ошибкой
        const stateWithError = {
            ...initialState,
            error: 'Previous error',
            loading: false
        };

        // Вызываем редюсер с action FETCH_START
        const result = reducer(stateWithError, { type: 'FETCH_START' });

        // - loading установлен в true
        expect(result.loading).toBe(true);
        // - error очищен
        expect(result.error).toBe(null);
        // - остальные поля не изменились
        expect(result.launches).toEqual(stateWithError.launches);
        expect(result.selectedLaunch).toEqual(stateWithError.selectedLaunch);
        expect(result.isModalOpen).toEqual(stateWithError.isModalOpen);
    });

    // ТЕСТ 3: Обработка успешной загрузки данных (FETCH_SUCCESS)
    it('must set loading=false and save data at FETCH_SUCCESS', () => {
        // Начальное состояние с loading=true
        const loadingState = {
            ...initialState,
            loading: true,
            launches: []
        };

        // Вызываем редюсер с action FETCH_SUCCESS
        const result = reducer(loadingState, {
            type: 'FETCH_SUCCESS',
            payload: mockLaunches
        });

        // - loading установлен в false
        expect(result.loading).toBe(false);
        // - launches содержат 3 запуска
        expect(result.launches).toEqual(mockLaunches);
        expect(result.launches).toHaveLength(3);
        expect(result.launches[0].mission_name).toBe('Starlink-1');
        expect(result.launches[1].mission_name).toBe('Crew Dragon In-Flight Abort Test');
        expect(result.launches[2].mission_name).toBe('Starlink-2');
        // - error остался null
        expect(result.error).toBe(null);
    });

    // ТЕСТ 4: Обработка ошибки загрузки (FETCH_ERROR)
    it('must set loading=false and save error at FETCH_ERROR', () => {
        // Начальное состояние с loading=true
        const loadingState = {
            ...initialState,
            loading: true,
            error: null
        };

        const errorMessage = 'Network error';

        // Вызываем редюсер с action FETCH_ERROR и сообщением об ошибке
        const result = reducer(loadingState, {
            type: 'FETCH_ERROR',
            payload: errorMessage
        });

        // - loading установлен в false
        expect(result.loading).toBe(false);
        // - error содержит сообщение об ошибке
        expect(result.error).toBe(errorMessage);
        // - launches остались пустым массивом
        expect(result.launches).toEqual([]);
    });

    // ТЕСТ 5: Выбор запуска для отображения в модалке (SELECT_LAUNCH)
    it('must set selectedLaunch and open modality at SELECT_LAUNCH', () => {
        // Начальное состояние с закрытой модалкой
        const initialStateWithModalClosed = {
            ...initialState,
            isModalOpen: false,
            selectedLaunch: null
        };

        // Выбираем первый запуск
        const selectedLaunch = mockLaunches[0];

        // Вызываем редюсер с action SELECT_LAUNCH
        const result = reducer(initialStateWithModalClosed, {
            type: 'SELECT_LAUNCH',
            payload: selectedLaunch
        });

        // - selectedLaunch установлен в выбранный запуск
        expect(result.selectedLaunch).toEqual(selectedLaunch);
        expect(result.selectedLaunch?.mission_name).toBe('Starlink-1');
        // - модалка открыта (isModalOpen = true)
        expect(result.isModalOpen).toBe(true);
        // - остальные поля не изменились
        expect(result.launches).toEqual(initialState.launches);
        expect(result.loading).toBe(false);
        expect(result.error).toBe(null);
    });

    // ТЕСТ 6: Закрытие модалки (CLOSE_MODAL)
    it('must close the modality and reset selectedLaunch at CLOSE_MODAL', () => {
        // Состояние с открытой модалкой и выбранным запуском
        const stateWithOpenModal = {
            ...initialState,
            isModalOpen: true,
            selectedLaunch: mockLaunches[1]
        };

        // Вызываем редюсер с action CLOSE_MODAL
        const result = reducer(stateWithOpenModal, { type: 'CLOSE_MODAL' });

        // - модалка закрыта (isModalOpen = false)
        expect(result.isModalOpen).toBe(false);
        // - selectedLaunch сброшен в null
        expect(result.selectedLaunch).toBe(null);
        // - остальные поля не изменились
        expect(result.launches).toEqual(stateWithOpenModal.launches);
        expect(result.loading).toBe(stateWithOpenModal.loading);
        expect(result.error).toBe(stateWithOpenModal.error);
    });

    // ТЕСТ 7: Комплексный сценарий - полный цикл работы
    it('should correctly handle full cycle: load -> select -> close', () => {
        let state = initialState;

        // 1. Начинаем загрузку
        state = reducer(state, { type: 'FETCH_START' });
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);

        // 2. Успешно загружаем данные
        state = reducer(state, {
            type: 'FETCH_SUCCESS',
            payload: mockLaunches
        });
        expect(state.loading).toBe(false);
        expect(state.launches).toEqual(mockLaunches);
        expect(state.launches).toHaveLength(3);

        // 3. Выбираем запуск для просмотра
        state = reducer(state, {
            type: 'SELECT_LAUNCH',
            payload: mockLaunches[2]
        });
        expect(state.selectedLaunch?.mission_name).toBe('Starlink-2');
        expect(state.isModalOpen).toBe(true);

        // 4. Закрываем модалку
        state = reducer(state, { type: 'CLOSE_MODAL' });
        expect(state.isModalOpen).toBe(false);
        expect(state.selectedLaunch).toBe(null);
        expect(state.launches).toEqual(mockLaunches);
    });
});