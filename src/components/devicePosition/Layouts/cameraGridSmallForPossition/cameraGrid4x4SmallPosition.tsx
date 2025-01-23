import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Device} from "../../../../types/Device";
import {useSelectedLayout} from "../../../../store/useSelectedLayout";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 163px); /* Четыре колонки фиксированной ширины */
    grid-template-rows: repeat(4, 80px); /* Четыре строки фиксированной высоты */
    gap: 5px; /* Отступ между элементами */
`;

const CameraHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #4d4e6540; /* Полупрозрачный фон */
    padding: 0;
    border-radius: 0;
    width: 100%;
`;

const CameraTile = styled.div<{ isSelected: boolean }>`
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* Для абсолютного позиционирования нумерации */
    font-size: 24px;
    height: 100%;
    cursor: pointer;
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")}; /* Желтая рамка для выбранных */
    box-shadow: ${({ isSelected }) =>
            isSelected ? "0 0 10px 2px yellow" : "none"}; /* Подсветка для выбранных */
`;


const Circle = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    color: black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    margin: 4px;
    z-index: 10;
`;

const DeviceName = styled.span`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: left;
    color: white; /* Цвет текста */
    margin-top: 6px;
`;

interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string | null) => void; // Обновляем тип
    selectedDevices: string[]; // Список выбранных устройств
}


const CameraGrid4x4SmallPosition: React.FC<CameraGridProps> = ({
                                                           menuType,
                                                           onDeviceClick,
                                                           selectedDevices,
                                                       }) => {
    const { selectedLayout } = useSelectedLayout();
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

    // Загрузка устройств при обновлении выбранной раскладки
    useEffect(() => {
        if (selectedLayout?.devices) {
            setDevices([...selectedLayout.devices]);
        }
    }, [selectedLayout]);

    const handleTileClick = (device: Device | null) => {
        if (device && device.UID) {
            setSelectedPosition(device.UID);
            onDeviceClick(device.UID); // Передаем UID устройства
        } else {
            setSelectedPosition(null);
            onDeviceClick(null); // Передаем null для сброса
        }
    };

    return (
        <GridContainer>
            {Array.from({ length: 16 }).map((_, idx) => {
                const device = devices[idx] || null;
                const isSelected = device ? selectedPosition === device.UID : false;


                return (
                    <CameraTile
                        key={device?.UID || idx}
                        isSelected={isSelected}
                        onClick={() => handleTileClick(device)}
                    >
                        <CameraHeader>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Circle>{idx + 1}</Circle>
                                {device && (
                                    <DeviceName style={{ marginLeft: 8 }}>
                                        {device.name || "Нет устройства"}
                                    </DeviceName>
                                )}
                            </div>
                        </CameraHeader>

                        {idx + 1}

                    </CameraTile>
                );
            })}
        </GridContainer>
    );
};

export default CameraGrid4x4SmallPosition;