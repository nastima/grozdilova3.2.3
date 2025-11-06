export interface Launch {
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

export interface LaunchResponse extends Array<Launch> {}