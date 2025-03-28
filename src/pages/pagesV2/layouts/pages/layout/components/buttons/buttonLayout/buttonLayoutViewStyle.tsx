import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';

import './style/style.css';
import { useSelectedLayout } from '../../../api/layout/useSelectedLayout';
import IconFilterButtonBig from '../../../../../../../../components/icons/iconFilterButton/iconFilterButtonBig';
import IconView1x5 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton1х5';
import IconView3x4 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton3x4';
import IconView3x3 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton3x3';
import IconView2x8 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton2x8';
import IconView1x12 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton1x12';
import IconView4x4 from '../../../../../../../../components/icons/iconFilterButton/iconFilterButton4x4';
import { ReactComponent as SvgIcon1x7 } from 'utils/app/assets/icons/layout-block-1x7.svg';

interface ButtonLayoutViewStyleProps {
    onFilterButtonClick: (
        size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4' | '1х7',
    ) => void;
    activeButton?: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4' | '1х7';
}

const ButtonLayoutViewStyle: React.FC<ButtonLayoutViewStyleProps> = ({
    onFilterButtonClick,
    activeButton,
}) => {
    const isMediumVisible = window.innerWidth > 850;
    const isBigVisible = window.innerWidth > 1024;

    return (
        <Flex gap="small" wrap="wrap" className="flex">
            <Button
                className="FilterButton2х2"
                type="primary"
                icon={<IconFilterButtonBig active={activeButton === '2x2'} />}
                style={{
                    backgroundColor: activeButton === '2x2' ? '#4D4E65' : '#FFFFFF',
                    color: activeButton === '2x2' ? '#FFFFFF' : '#4D4E65',
                    border: '1px solid #4D4E65',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => onFilterButtonClick('2x2')}
            />
            {isMediumVisible && (
                <Button
                    className="FilterButton1х5"
                    type="primary"
                    icon={<IconView1x5 active={activeButton === '1х5'} />}
                    style={{
                        backgroundColor: activeButton === '1х5' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '1х5' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('1х5')}
                />
            )}
            {isMediumVisible && (
                <Button
                    className="FilterButton1х5"
                    type="primary"
                    icon={
                        <SvgIcon1x7
                            style={{
                                fill: activeButton === '1х7' ? '#FFF' : '#4D4E65',
                                width: 16,
                                height: 16,
                            }}
                        />
                    }
                    style={{
                        backgroundColor: activeButton === '1х7' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '1х7' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('1х7')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButton3х4"
                    type="primary"
                    icon={<IconView3x4 active={activeButton === '3х4'} />}
                    style={{
                        backgroundColor: activeButton === '3х4' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '3х4' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('3х4')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButton3х3"
                    type="primary"
                    icon={<IconView3x3 active={activeButton === '3х3'} />}
                    style={{
                        backgroundColor: activeButton === '3х3' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '3х3' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('3х3')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButton2х8"
                    type="primary"
                    icon={<IconView2x8 active={activeButton === '2х8'} />}
                    style={{
                        backgroundColor: activeButton === '2х8' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '2х8' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('2х8')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButton1х12"
                    type="primary"
                    icon={<IconView1x12 active={activeButton === '1х12'} />}
                    style={{
                        backgroundColor: activeButton === '1х12' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '1х12' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('1х12')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButton4х4"
                    type="primary"
                    icon={<IconView4x4 active={activeButton === '4х4'} />}
                    style={{
                        backgroundColor: activeButton === '4х4' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === '4х4' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onFilterButtonClick('4х4')}
                />
            )}
        </Flex>
    );
};

export default ButtonLayoutViewStyle;

// interface ButtonLayoutViewStylerProps {
//     onFilterButtonClick: (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => void;
// }
//
// const ButtonLayoutViewStyle: React.FC<ButtonLayoutViewStylerProps> = ({ onFilterButtonClick }) => {
//     const { selectedLayout, setSelectedLayout } = useSelectedLayout();
//     const [activeButton, setActiveButton] = useState<'2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4'>(selectedLayout.viewType);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };
//
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//
//
//     const handleButtonClick = (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => {
//         setActiveButton(size);
//         onFilterButtonClick(size);
//     };
//
//     const isMediumVisible = windowWidth > 850;
//     const isBigVisible = windowWidth > 1024;
//
//     return (
//
//         <Flex gap="small" wrap="wrap" className="flex">
//             <Button
//                 className="FilterButton2х2"
//                 type="primary"
//                 icon={<IconFilterButtonBig active={activeButton === '2x2'} />}
//                 style={{
//                     backgroundColor: activeButton === '2x2' ? '#4D4E65' : '#FFFFFF',
//                     color: activeButton === '2x2' ? '#FFFFFF' : '#4D4E65',
//                     border: '1px solid #4D4E65',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//                 onClick={() => handleButtonClick('2x2')}
//             />
//             {isMediumVisible && (
//                 <Button
//                     className="FilterButton1х5"
//                     type="primary"
//                     icon={<IconView1x5 active={activeButton === '1х5'} />}
//                     style={{
//                         backgroundColor: activeButton === '1х5' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '1х5' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('1х5')}
//                 />
//             )}
//             {isBigVisible && (
//                 <Button
//                     className="FilterButton3х4"
//                     type="primary"
//                     icon={<IconView3x4 active={activeButton === '3х4'} />}
//                     style={{
//                         backgroundColor: activeButton === '3х4' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '3х4' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('3х4')}
//                 />
//             )}
//             {isBigVisible && (
//                 <Button
//                     className="FilterButton3х3"
//                     type="primary"
//                     icon={<IconView3x3 active={activeButton === '3х3'} />}
//                     style={{
//                         backgroundColor: activeButton === '3х3' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '3х3' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('3х3')}
//                 />
//             )}
//             {isBigVisible && (
//                 <Button
//                     className="FilterButton2х8"
//                     type="primary"
//                     icon={<IconView2x8 active={activeButton === '2х8'} />}
//                     style={{
//                         backgroundColor: activeButton === '2х8' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '2х8' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('2х8')}
//                 />
//             )}
//             {isBigVisible && (
//                 <Button
//                     className="FilterButton1х12"
//                     type="primary"
//                     icon={<IconView1x12 active={activeButton === '1х12'} />}
//                     style={{
//                         backgroundColor: activeButton === '1х12' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '1х12' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('1х12')}
//                 />
//             )}
//             {isBigVisible && (
//                 <Button
//                     className="FilterButton4х4"
//                     type="primary"
//                     icon={<IconView4x4 active={activeButton === '4х4'} />}
//                     style={{
//                         backgroundColor: activeButton === '4х4' ? '#4D4E65' : '#FFFFFF',
//                         color: activeButton === '4х4' ? '#FFFFFF' : '#4D4E65',
//                         border: '1px solid #4D4E65',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                     }}
//                     onClick={() => handleButtonClick('4х4')}
//                 />
//             )}
//
//         </Flex>
//     );
// };
//
// export default ButtonLayoutViewStyle;
