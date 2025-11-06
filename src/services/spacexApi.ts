import type { Launch } from '../types/Launch';

export const getLaunches = async (year: string = '2020'): Promise<Launch[]> => {
    const response = await fetch(`https://api.spacexdata.com/v3/launches?launch_year=${year}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Убираем дубликаты по flight_number
    return data.filter((launch: Launch, index: number, array: Launch[]) =>
        array.findIndex(item => item.flight_number === launch.flight_number) === index
    );
};