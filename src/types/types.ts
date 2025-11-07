// Пропсы для сервера
export interface Launch  {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    launch_date_utc: string;
    rocket: {
        rocket_name: string;
    };
    launch_success: boolean;
    links: {
        mission_patch: string;
        mission_patch_small: string;
        article_link: string;
        wikipedia: string;
        video_link: string;
    };
    details: string;
}

// Пропсы для компонентов
export interface CardComponentProps {
    launch: Launch;
    onSelect: (launch: Launch) => void;
}

export interface ModalProps {
    launch: Launch | null;
    isOpen: boolean;
    onClose: () => void;
}

// Пропсы для useReducer
export interface LaunchState {
    launches: Launch[];
    selectedLaunch: Launch | null;
    loading: boolean;
    error: string | null;
    isModalOpen: boolean;
}

export type LaunchAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Launch[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'SELECT_LAUNCH'; payload: Launch }
    | { type: 'CLOSE_MODAL' };
