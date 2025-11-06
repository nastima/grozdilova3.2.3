import type { Launch } from '../types/Launch';

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

export const initialState: LaunchState = {
    launches: [],
    selectedLaunch: null,
    loading: false,
    error: null,
    isModalOpen: false,
};

export function launchReducer(state: LaunchState, action: LaunchAction): LaunchState {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, launches: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'SELECT_LAUNCH':
            return { ...state, selectedLaunch: action.payload, isModalOpen: true };
        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false, selectedLaunch: null };
        default:
            return state;
    }
}