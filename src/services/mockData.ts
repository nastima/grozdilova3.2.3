import type { Launch } from '../types/Launch';

export const mockLaunches: Launch[] = [
    {
        flight_number: 94,
        mission_name: "Starlink-1",
        launch_year: "2020",
        launch_date_utc: "2020-01-07T02:19:00.000Z",
        rocket: {
            rocket_name: "Falcon 9"
        },
        launch_success: true,
        links: {
            mission_patch: "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
            mission_patch_small: "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
            article_link: "https://spaceflightnow.com/2020/01/07/spacex-launches-60-more-starlink-satellites-for-global-internet-coverage/",
            wikipedia: "https://en.wikipedia.org/wiki/Starlink",
            video_link: "https://youtu.be/pIDuv0Ta0XQ"
        },
        details: "First mission of 2020. This launch will deploy the first batch of Starlink version 1.0 satellites."
    },
    {
        flight_number: 95,
        mission_name: "Crew Dragon In-Flight Abort Test",
        launch_year: "2020",
        launch_date_utc: "2020-01-19T14:00:00.000Z",
        rocket: {
            rocket_name: "Falcon 9"
        },
        launch_success: true,
        links: {
            mission_patch: "https://i.imgur.com/6iU2ZMQ.png",
            mission_patch_small: "https://i.imgur.com/6iU2ZMQ.png",
            article_link: "https://spaceflightnow.com/2020/01/19/spacex-successfully-tests-crew-dragon-in-flight-abort-system/",
            wikipedia: "https://en.wikipedia.org/wiki/SpX-DM2",
            video_link: "https://youtu.be/mhrkdHshb3E"
        },
        details: "Test of Crew Dragon's in-flight abort system. The test was successful."
    },
    {
        flight_number: 96,
        mission_name: "Starlink-2",
        launch_year: "2020",
        launch_date_utc: "2020-01-29T14:06:00.000Z",
        rocket: {
            rocket_name: "Falcon 9"
        },
        launch_success: true,
        links: {
            mission_patch: "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
            mission_patch_small: "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
            article_link: "https://spaceflightnow.com/2020/01/29/spacex-launches-more-starlink-satellites-tests-design-change-for-astronomers/",
            wikipedia: "https://en.wikipedia.org/wiki/Starlink",
            video_link: "https://youtu.be/1KmBDCiL7PU"
        },
        details: "Second batch of Starlink satellites featuring a dark coating to reduce reflectivity."
    }
];