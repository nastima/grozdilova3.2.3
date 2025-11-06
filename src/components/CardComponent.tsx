import { Card, Text, Image, Badge, Group } from '@mantine/core';
import type { Launch } from '../types/Launch';

interface CardComponentProps {
    launch: Launch;
    onSelect: (launch: Launch) => void;
}

function CardComponent({ launch, onSelect }: CardComponentProps) {
    const launchDate = new Date(launch.launch_date_utc).toLocaleDateString();

    return (
        <Card
            variant="custom-card"
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            onClick={() => onSelect(launch)}
        >
            {launch.links?.mission_patch_small && (
                <Card.Section>
                    <Image
                        src={launch.links.mission_patch_small}
                        height={160}
                        alt={launch.mission_name}
                        fit="contain"
                        p="md"
                    />
                </Card.Section>
            )}

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} size="lg">{launch.mission_name}</Text>
                <Badge color={launch.launch_success ? 'teal' : 'red'}>
                    {launch.launch_success ? 'Success' : 'Failed'}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                Rocket: {launch.rocket?.rocket_name}
            </Text>

            <Text size="sm" c="dimmed">
                Launch Date: {launchDate}
            </Text>

            <Text size="sm" c="dimmed">
                Flight #{launch.flight_number}
            </Text>
        </Card>
    );
}

export default CardComponent;