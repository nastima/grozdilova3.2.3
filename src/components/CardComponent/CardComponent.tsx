import React from 'react';
import { Card, Text, Image, Button } from '@mantine/core';
import type {  CardComponentProps  } from '../../types/types';


function CardComponent({ launch, onSelect }: CardComponentProps) {

    const handleSeeMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(launch);
    };

    return (
        <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
        >
            {/* Изображение или пустой div */}
            <Card.Section
                style={{
                    flex: '1 1 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px'
                }}>
                {launch.links?.mission_patch_small ? (
                    <Image
                        src={launch.links.mission_patch_small}
                        height={150}
                        width={150}
                        alt={launch.mission_name}
                        fit="contain"
                        p="md"
                    />
                ) : (
                    <div style={{
                        width: '150px',
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ccc',
                        fontSize: '14px'
                    }}>
                        No Image
                    </div>
                )}
            </Card.Section>

            {/* Название миссии */}
            <Text
                fw={700}
                size="xl"
                style={{
                    textAlign: 'center',
                    marginBottom: '8px'
                }}
            >
                {launch.mission_name}
            </Text>

            {/* Название ракеты */}

            <Text
                size="md"
                c="dimmed"
                style={{
                    textAlign: 'center',
                    marginBottom: '16px'
                }}
            >
                {launch.rocket?.rocket_name}
            </Text>
            {/* Кнопка See More */}
            <Button
                fullWidth
                style={{
                    margin: 'auto',
                }}
                onClick={handleSeeMoreClick}
            >
                See More
            </Button>

        </Card>
    );
}

export default CardComponent;