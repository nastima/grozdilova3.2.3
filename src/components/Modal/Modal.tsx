import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps  } from '../../types/types';


function Modal({ launch, isOpen, onClose }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !launch) return null;

    return createPortal(
        <div
            data-testid="modal-backdrop"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px',
            }}
            onClick={onClose}
        >
            <div
                data-testid="modal-content"
                style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Заголовок и кнопка закрытия */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#000'
                        }}>
                        {launch.mission_name}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Большое изображение миссии */}
                {launch.links?.mission_patch && (
                    <img
                        src={launch.links.mission_patch}
                        alt={launch.mission_name}
                        style={{
                            width: '200px',
                            height: '200px',
                            display: 'block',
                            margin: '0 auto 16px'
                        }}
                    />
                )}
                {/* Название миссии (повторно) */}
                <h4 style={{
                    margin: '0',
                    fontSize: '16px',
                    color: '#000',
                    fontWeight: 'bold'
                }}>Mission name:</h4>
                <p style={{margin: '5px 0 10px 0 '}}>{launch.mission_name}</p>

                {/* Название ракеты */}
                <h4 style={{
                    margin: '0',
                    fontSize: '16px',
                    color: '#000',
                    fontWeight: 'bold'
                }}><strong>Rocket:</strong></h4>
                <p style={{margin: '5px 0 10px 0 '}}>{launch.rocket?.rocket_name}</p>

                {/* Детали миссии */}
                <div>
                    <h4 style={{
                        margin: '0',
                        fontSize: '16px',
                        color: '#000',
                        fontWeight: 'bold'
                    }}>
                        Details:
                    </h4>
                    {launch.details ? (
                        <p style={{
                            margin: '5px 0 10px 0 ',
                            lineHeight: '1.5',
                            color: '#000',
                            fontSize: '14px'
                        }}>
                            {launch.details}
                        </p>
                    ) : (
                        <p style={{
                            margin: '5px 0 10px 0 ',
                            color: '#666',
                            fontStyle: 'italic'
                        }}>
                            No details available for this mission.
                        </p>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;