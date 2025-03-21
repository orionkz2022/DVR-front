import React, { useState } from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAuthStore } from '../../../../../../../store/auth/auth';
import LocationMap2 from '../../../../../../../components/locationMap2/LocationMap2';
import { Device } from '../../../../../../../types/Device';
import { ONLINE_PLAY_LAYOUT_URL } from '../../../../../../../const/const';
import './styles.css';
import { ReactComponent as SvgPoints } from 'utils/app/assets/icons/Points.svg';
import { ReactComponent as SvgSetting } from 'utils/app/assets/icons/Setting.svg';
import { ReactComponent as SvgSoundOn } from 'utils/app/assets/icons/Sound-on.svg';
import { ReactComponent as SvgSoundOff } from 'utils/app/assets/icons/Sound-off.svg';
import { useStateNameDevice } from '../../api/layout/useStateNameDevice';

// Интерфейсы для типизации
interface CameraConfig {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface LayoutConfig {
    cols: number;
    rows: number;
    cameras: CameraConfig[];
}

interface CameraTileProps {
    device?: Device;
    index: number;
    onMenuClick: (action: string, device: Device | null, index: number) => void;
    isShowNameDevice: boolean;
    onAddDevice: () => void;
    menuType: 'edit' | 'layout';
    style?: React.CSSProperties;
    setIsModalVisible: (open: boolean) => void;
}

interface CameraGridProps {
    viewType: string;
    devices: Device[];
    menuType: 'edit' | 'layout';
    isMapVisible: boolean;
    setIsModalVisible: (open: boolean) => void;
}

// Конфигурация раскладок
const layoutConfigs: Record<string, LayoutConfig> = {
    '2х2': {
        cols: 2,
        rows: 2,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 }, // Камера 1
            { x: 1, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 0, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 1, y: 1, width: 1, height: 1 }, // Камера 4
        ],
    },
    '1х5': {
        cols: 3,
        rows: 3,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 }, // Большая камера
            { x: 2, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 2, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 0, y: 2, width: 1, height: 1 }, // Камера 4
            { x: 1, y: 2, width: 1, height: 1 }, // Камера 5
            { x: 2, y: 2, width: 1, height: 1 }, // Камера 6
        ],
    },
    '1х7': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 3, height: 3 }, // Большая камера
            { x: 3, y: 0, width: 1, height: 1 }, // Камера 2
            { x: 3, y: 1, width: 1, height: 1 }, // Камера 3
            { x: 3, y: 2, width: 1, height: 1 }, // Камера 4
            { x: 0, y: 3, width: 1, height: 1 }, // Камера 5
            { x: 1, y: 3, width: 1, height: 1 }, // Камера 6
            { x: 2, y: 3, width: 1, height: 1 }, // Камера 7
            { x: 3, y: 3, width: 1, height: 1 }, // Камера 8
        ],
    },
    '3х3': {
        cols: 3,
        rows: 3,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 },
            { x: 1, y: 0, width: 1, height: 1 },
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 0, y: 1, width: 1, height: 1 },
            { x: 1, y: 1, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
        ],
    },
    '3х4': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 },
            { x: 2, y: 0, width: 2, height: 2 },
            { x: 0, y: 2, width: 2, height: 2 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '2х8': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 },
            { x: 2, y: 0, width: 2, height: 2 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '1х12': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 2, height: 2 }, // Большая камера
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 3, y: 0, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 3, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
    '4х4': {
        cols: 4,
        rows: 4,
        cameras: [
            { x: 0, y: 0, width: 1, height: 1 }, // Большая камера
            { x: 1, y: 0, width: 1, height: 1 },
            { x: 2, y: 0, width: 1, height: 1 },
            { x: 3, y: 0, width: 1, height: 1 },
            { x: 0, y: 1, width: 1, height: 1 },
            { x: 1, y: 1, width: 1, height: 1 },
            { x: 2, y: 1, width: 1, height: 1 },
            { x: 3, y: 1, width: 1, height: 1 },
            { x: 0, y: 2, width: 1, height: 1 },
            { x: 1, y: 2, width: 1, height: 1 },
            { x: 2, y: 2, width: 1, height: 1 },
            { x: 3, y: 2, width: 1, height: 1 },
            { x: 0, y: 3, width: 1, height: 1 },
            { x: 1, y: 3, width: 1, height: 1 },
            { x: 2, y: 3, width: 1, height: 1 },
            { x: 3, y: 3, width: 1, height: 1 },
        ],
    },
};

// Fallback-конфигурация по умолчанию
const defaultConfig: LayoutConfig = {
    cols: 2,
    rows: 2,
    cameras: [
        { x: 0, y: 0, width: 1, height: 1 },
        { x: 1, y: 0, width: 1, height: 1 },
        { x: 0, y: 1, width: 1, height: 1 },
        { x: 1, y: 1, width: 1, height: 1 },
    ],
};

// Компонент CameraTile
const CameraTile: React.FC<CameraTileProps> = ({
    device,
    index,
    onMenuClick,
    onAddDevice,
    menuType,
    style,
    setIsModalVisible,
}) => {
    const { SmartDVRToken } = useAuthStore();
    const [audio, setAudio] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const { isShowNameDevice, setIsShowNameDevice } = useStateNameDevice();

    return (
        <TileContainer
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {(isShowNameDevice || isHovered) && device && (
                <CameraHeader className={!isShowNameDevice && !isHovered ? 'hidden' : ''}>
                    <HeaderLeft>
                        <>
                            <Circle>{index + 1}</Circle>
                            <DeviceName>{device?.name || 'Нет устройства'}</DeviceName>
                        </>
                    </HeaderLeft>

                    {device ? (
                        <Dropdown
                            placement={'bottomRight'}
                            overlay={menu(device, index, menuType, setIsModalVisible)}
                            trigger={['click']}
                            getPopupContainer={(triggerNode) =>
                                triggerNode.parentElement || document.body
                            }
                            overlayClassName="dropdown-camera"
                        >
                            <Button
                                className={
                                    'button-base button-type-secondary button-size-small_icon'
                                }
                                style={{ border: '2px solid var(--button-secondary-text)' }}
                            >
                                <SvgPoints />
                            </Button>
                        </Dropdown>
                    ) : (
                        ''
                    )}
                </CameraHeader>
            )}

            {device ? (
                device.online ? (
                    <VideoIframe src={`${ONLINE_PLAY_LAYOUT_URL}${device.UID}/${SmartDVRToken}`} />
                ) : (
                    <OfflineMessage>Устройство оффлайн</OfflineMessage>
                )
            ) : (
                <EmptyTile onClick={onAddDevice}>+</EmptyTile>
            )}

            {/* Условие для отображения футера */}
            {device && (
                <CameraFooter className={!isShowNameDevice && !isHovered ? 'hidden' : ''}>
                    <FooterIcon onClick={() => console.log('Left icon clicked')}>
                        {audio ? (
                            <SvgSoundOn
                                style={{ paddingLeft: 8 }}
                                onClick={() => setAudio(false)}
                            />
                        ) : (
                            <SvgSoundOff
                                style={{ paddingLeft: 8, fill: '#FFF' }}
                                onClick={() => setAudio(true)}
                            />
                        )}
                    </FooterIcon>
                    <FooterIcon onClick={() => console.log('Right icon clicked')}>
                        <SvgSetting style={{ paddingRight: 8 }} />
                    </FooterIcon>
                </CameraFooter>
            )}
        </TileContainer>
    );
};

// Компонент CameraGrid
const CameraGrid: React.FC<CameraGridProps> = ({
    viewType,
    devices,
    menuType,
    isMapVisible,
    setIsModalVisible,
}) => {
    // Получаем конфигурацию или используем fallback
    const config = layoutConfigs[`${viewType}`] || defaultConfig;
    // const config = layoutConfigs[`1х5`] || defaultConfig;
    const { isShowNameDevice, setIsShowNameDevice } = useStateNameDevice();

    console.log(viewType);

    return (
        <GridContainer cols={config.cols} rows={config.rows} isMapVisible={isMapVisible}>
            {config.cameras.map((camera, index) => (
                <CameraTile
                    key={index}
                    style={{
                        gridColumn: `${camera.x + 1} / span ${camera.width}`,
                        gridRow: `${camera.y + 1} / span ${camera.height}`,
                    }}
                    device={devices[index]}
                    index={index}
                    onMenuClick={(action, device, idx) => {
                        // Обработка действий
                        console.log(action, device, idx);
                    }}
                    isShowNameDevice={isShowNameDevice}
                    // isShowNameDevice={true}
                    menuType={menuType}
                    setIsModalVisible={setIsModalVisible}
                    onAddDevice={() => {
                        // Логика добавления устройства
                        console.log('Add device');
                    }}
                />
            ))}

            {/*{isMapVisible && (*/}
            {/*    <MapContainer cols={config.cols}>*/}
            {/*        <LocationMap2 devices={devices} />*/}
            {/*    </MapContainer>*/}
            {/*)}*/}
        </GridContainer>
    );
};

// Стилизация (остаются без изменений)
const GridWrapper = styled.div`
    flex: 1;
    overflow: hidden;
`;

const TileContainer = styled.div`
    position: relative;
    background: var(--gray-01);
    border-radius: 8px;
    // overflow: hidden;
    cursor: pointer;
`;

const CameraHeader = styled.div`
    position: absolute;
    height: 20px;
    border-radius: 8px 8px 0 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    background: var(--primary-shadow-1);
    z-index: 1;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CameraFooter = styled.div`
    height: 20px;
    position: absolute;
    border-radius: 0 0 8px 8px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    background: var(--primary);
    // z-index: 1;
`;

const FooterIcon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #fff;

    &:hover {
        opacity: 0.8;
    }
`;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
`;

const DeviceName = styled.span`
    color: #fff;
    font-size: 14px;
`;

const ActionButton = styled(Button)`
    background: #3e405f !important;
    border-color: #3e405f !important;
    color: white !important;
`;

const VideoIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const OfflineMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
`;

const EmptyTile = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const GridContainer = styled.div<{ cols: number; rows: number; isMapVisible: boolean }>`
    display: grid;
    grid-template-columns: ${({ cols, isMapVisible }) => `repeat(${cols}, 1fr) `};
    grid-template-rows: repeat(${({ rows }) => rows}, minmax(auto, 1fr));
    gap: 8px;
    height: 100%;
    // padding: 10px;
`;

const MapContainer = styled.div<{ cols: number }>`
    grid-column: ${({ cols }) => cols + 1};
    grid-row: 1 / -1;
    background: #1a1c24;
    border-radius: 8px;
    overflow: hidden;
`;

// Вспомогательная функция для меню
const menu = (
    device: Device,
    index: number,
    menuType: 'edit' | 'layout',
    setIsModalVisible: (open: boolean) => void,
) => (
    <Menu>
        {menuType === 'edit' ? (
            <>
                <Menu.Item key="edit" onClick={() => setIsModalVisible(true)}>
                    Изменить положение
                </Menu.Item>
                <Menu.Item key="delete" danger>
                    Удалить
                </Menu.Item>
            </>
        ) : (
            <>
                <Menu.Item key="recVideo">Запись видео</Menu.Item>
                <Menu.Item key="recAudio">Запись аудио</Menu.Item>
                <Menu.Item key="takePhoto">Сделать фото</Menu.Item>
                <Menu.Item key="goToDevice">Перейти к устройству</Menu.Item>
            </>
        )}
    </Menu>
);

export default CameraGrid;
