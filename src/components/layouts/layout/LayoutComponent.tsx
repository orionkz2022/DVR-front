import React, {useState} from 'react';
import './style.css';
import {Layout} from "../../../types/Layouts";
import DeviceCart from "../camera/DeviceCart";
import ButtonAddPlus from "../../buttons/buttonAddPlus/ButtonAddPlus";
import AddDeviceInLayout from "../../modals/addDeviceInLayout/AddDeviceInLayout";


interface LayoutData{
    layout:Layout[];
    onLayoutUpdate: () => void;
}

const LayoutCartComponent: React.FC<LayoutData> = ({layout,onLayoutUpdate}) => {

    const [showAddDeviceModal, setShowAddDeviceNodal]=useState(false)
    const [currentLayoutUID, setCurrentLayoutUID] = useState<string | null>(null);


    const handleAddDeviceInLayout = (uid: string) => {
        setCurrentLayoutUID(uid);
        setShowAddDeviceNodal(true)
    };

    const handleOkLayoutModal = () => {
        setShowAddDeviceNodal(false);
        onLayoutUpdate();
    };

    const handleCancelLayoutModal = () => {
        setShowAddDeviceNodal(false)
    };


    return (

        <div className="LayoutCartComponent">
            {layout.map((layoutItem, index) => (
                <div key={index} className="LayoutItem">
                    <div className="titleLayoutComnponent">
                        <h2 className="layoutH2">{layoutItem.name}</h2>
                        <h2 className="countDeviceLayout">({layoutItem.devices.length})</h2>
                        <ButtonAddPlus onClick={() => handleAddDeviceInLayout(layoutItem.uid)}/>
                    </div>
                    <div className="DeviceList">
                        {layoutItem.devices.map((device, deviceIndex) => (
                            <DeviceCart key={`${index}-${deviceIndex}`} device={device} layout={layoutItem}/>
                        ))}
                    </div>
                    {currentLayoutUID === layoutItem.uid && (
                        <AddDeviceInLayout
                            layoutUID={layoutItem.uid}
                            visible={showAddDeviceModal}
                            onOk={handleOkLayoutModal}
                            onCancel={handleCancelLayoutModal}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default LayoutCartComponent;
