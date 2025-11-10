import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from './Modal';
import { mockLaunches } from '../../services/mockData';
import type { Launch } from '../../types/types';

// Пропсы по умолчанию для тестов
const defaultProps = {
    launch: mockLaunches[0],
    isOpen: true,
    onClose: vi.fn(),
};

describe('Modal Component', () => {

    beforeEach(() => {
        vi.clearAllMocks(); // Очищаем моки перед каждым тестом
    });

    // ТЕСТ 1: Проверка, что модалка открывается и показывает правильный контент
    it('should open and show boot information when isOpen=true', () => {
        // Рендерим модалку с пропсом isOpen=true
        render(<Modal {...defaultProps} />);

        // Проверяем что основные элементы отображаются:
        // - Название миссии в заголовке
        expect(screen.getByRole('heading', { level: 2, name: 'Starlink-1' })).toBeInTheDocument();
        // - Название ракеты
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
        // - Детали миссии
        expect(screen.getByText('First mission of 2020. This launch will deploy the first batch of Starlink version 1.0 satellites.')).toBeInTheDocument();
        // - Изображение миссии
        expect(screen.getByAltText('Starlink-1')).toBeInTheDocument();
        // - Кнопка закрытия
        expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
    });

    // ТЕСТ 2: Проверка, что модалка не отображается когда закрыта
    it('should not be displayed when isOpen=false', () => {
        // Рендерим модалку с пропсом isOpen=false
        const { container } = render(
            <Modal {...defaultProps} isOpen={false} />
        );

        // Проверяем что в DOM ничего не отрендерилось
        expect(container.firstChild).toBeNull();
    });

    // ТЕСТ 3: Проверка закрытия модалки через кнопку "×"
    it('should be closed by clicking the close button', () => {
        render(<Modal {...defaultProps} />);

        // Находим и кликаем на кнопку закрытия (крестик)
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        // Проверяем что функция onClose была вызвана
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    // ТЕСТ 4: Проверка закрытия модалки через клик на фон
    it('should be closed when clicked on a darkened background', () => {
        render(<Modal {...defaultProps} />);

        // Находим фон модалки
        const backdrop = screen.getByTestId('modal-backdrop');
        fireEvent.click(backdrop);

        // Проверяем что функция onClose была вызвана
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    // ТЕСТ 5: Проверка, что модалка НЕ закрывается при клике на сам контент
    it('should not be closed when clicking on the contents of the modal', () => {
        render(<Modal {...defaultProps} />);

        // Находим контент модалки
        const modalContent = screen.getByTestId('modal-content');
        fireEvent.click(modalContent);

        // Проверяем что функция onClose НЕ была вызвана
        expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    // ТЕСТ 6: Проверка закрытия модалки через клавишу Escape
    it('should close when you press the Escape key', () => {
        render(<Modal {...defaultProps} />);

        // Симулируем нажатие клавиши Escape на документе
        fireEvent.keyDown(document, { key: 'Escape' });

        // Проверяем что функция onClose была вызвана
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    // ТЕСТ 7: Проверка отображения сообщения когда нет деталей миссии
    it('should show "No details available" when mission details are missing', () => {
        // Создаем мок
        const launchWithEmptyDetails: Launch = {
            ...mockLaunches[0],
            details: ''
        };

        // Рендерим модалку с запуском без деталей
        render(<Modal {...defaultProps} launch={launchWithEmptyDetails} />);

        // Проверяем что отображается сообщение об отсутствии деталей
        expect(screen.getByText('No details available for this mission.')).toBeInTheDocument();
    });

    // ТЕСТ 8: Проверка, что модалка показывает заглушку когда изображение отсутствует
    it('should show "No Image" placeholder when mission_patch is missing', () => {
        // Создаем мок
        const launchWithoutImage: Launch = {
            ...mockLaunches[0],
            links: {
                ...mockLaunches[0].links,
                mission_patch: ''
            }
        };

        // Рендерим модалку с запуском без изображения
        render(<Modal {...defaultProps} launch={launchWithoutImage} />);

        // Проверяем что изображение не отображается
        const image = screen.queryByAltText('Starlink-1');
        expect(image).not.toBeInTheDocument();

        // Проверяем что отображается заглушка "No Image Available"
        const placeholder = screen.getByText('No Image');
        expect(placeholder).toBeInTheDocument();
    });
});