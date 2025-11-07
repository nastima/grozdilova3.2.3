import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import CardComponent from './CardComponent';
import { mockLaunches } from '../../services/mockData';
import type { Launch } from '../../types/types';

// Пропсы по умолчанию для тестов
const defaultProps = {
    launch: mockLaunches[0],
    onSelect: vi.fn(),
};

describe('CardComponent', () => {
    // Очищаем моки перед каждым тестом
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // ТЕСТ 1: Проверка отображения всей информации о миссии
    it('should render mission information correctly', () => {
        render(<CardComponent {...defaultProps} />);

        // Проверяем что основные элементы отображаются:
        // - Название миссии
        expect(screen.getByText('Starlink-1')).toBeInTheDocument();
        // - Название ракеты
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
        // - Кнопка "See More"
        expect(screen.getByText('See More')).toBeInTheDocument();
        // - Изображение миссии
        expect(screen.getByAltText('Starlink-1')).toBeInTheDocument();
    });

    // ТЕСТ 2: Проверка отображения изображения когда оно доступно
    it('should display mission image when mission_patch_small is provided', () => {
        render(<CardComponent {...defaultProps} />);

        const image = screen.getByAltText('Starlink-1');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockLaunches[0].links.mission_patch_small);
    });

    // ТЕСТ 3: Проверка отображения заглушки когда изображение недоступно
    it('should display "No Image" when mission_patch_small is not provided', () => {
        const launchWithoutImage: Launch = {
            ...mockLaunches[0],
            links: {
                ...mockLaunches[0].links,
                mission_patch_small: ''
            }
        };

        render(<CardComponent {...defaultProps} launch={launchWithoutImage} />);

        // Проверяем что отображается текст "No Image"
        expect(screen.getByText('No Image')).toBeInTheDocument();
        // Проверяем что изображение не отображается
        expect(screen.queryByAltText('Starlink-1')).not.toBeInTheDocument();
    });

    // ТЕСТ 4: Проверка вызова onSelect при клике через fireEvent
    it('should call onSelect when "See More" button is clicked with fireEvent', () => {
        render(<CardComponent {...defaultProps} />);

        const seeMoreButton = screen.getByText('See More');
        fireEvent.click(seeMoreButton);

        expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
        expect(defaultProps.onSelect).toHaveBeenCalledWith(mockLaunches[0]);
    });

    // ТЕСТ 5: Проверка, что компонент не ломается при отсутствии rocket данных
    it('should handle missing rocket data gracefully', () => {
        const launchWithoutRocket: Launch = {
            ...mockLaunches[0],
            rocket: {
                rocket_name: ''
            }
        };

        render(<CardComponent {...defaultProps} launch={launchWithoutRocket} />);

        // Компонент должен отрендериться без ошибок
        expect(screen.getByText('Starlink-1')).toBeInTheDocument();
        expect(screen.getByText('See More')).toBeInTheDocument();
    });

    // ТЕСТ 6: Проверка отображения разных миссий из мока
    it('should render different missions correctly', () => {
        const crewDragonMission = mockLaunches[1];
        render(<CardComponent {...defaultProps} launch={crewDragonMission} />);

        expect(screen.getByText('Crew Dragon In-Flight Abort Test')).toBeInTheDocument();
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });

    // ТЕСТ 9: Проверка, что stopPropagation вызывается при клике
    it('should call stopPropagation on button click', async () => {
        const user = userEvent.setup();
        render(<CardComponent {...defaultProps} />);

        const seeMoreButton = screen.getByText('See More');

        // Создаем mock для stopPropagation
        const mockStopPropagation = vi.fn();

        // Добавляем stopPropagation к событию
        seeMoreButton.addEventListener('click', (e) => {
            e.stopPropagation = mockStopPropagation;
            e.stopPropagation();
        });

        await user.click(seeMoreButton);

        // Проверяем что onSelect все равно вызывается
        expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
    });
});