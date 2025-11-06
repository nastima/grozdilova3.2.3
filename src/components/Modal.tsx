import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Launch } from '../types/Launch';

interface ModalProps {
    launch: Launch | null;
    isOpen: boolean;
    onClose: () => void;
}

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
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    maxWidth: '500px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ margin: 0 }}>Mission Details</h2>
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

                {launch.links?.mission_patch && (
                    <img
                        src={launch.links.mission_patch}
                        alt={launch.mission_name}
                        style={{ width: '200px', height: '200px', display: 'block', margin: '0 auto 16px' }}
                    />
                )}

                <h3 style={{ marginBottom: '8px' }}>{launch.mission_name}</h3>
                <p style={{ marginBottom: '8px' }}><strong>Rocket:</strong> {launch.rocket?.rocket_name}</p>

                {launch.details && (
                    <p style={{ lineHeight: '1.5' }}>{launch.details}</p>
                )}
            </div>
        </div>,
        document.body
    );
}

export default Modal;