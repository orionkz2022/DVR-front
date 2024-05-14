import React from "react";
import "./style.css"
import IconSignalLow from "../../../icons/iconSignalLow/IconSignalLow";
import {ConfigProvider, Progress} from "antd";
import device from "../../../../pages/device/Device";

interface DeviceProps{
    device:any
}
const InfoBar: React.FC<DeviceProps> = ({device}) => {
    console.log("info bat", device.UID)
    return (
        <div className="infoBarDevice">
            <div className="battery">
                <h1 className="h1bat">Уровень заряда</h1>
                <span className="span"><IconSignalLow/>{device.battery_percent}%</span>
            </div>
            <div className="hdd">
                <h1 className="h1hdd">Занятость жёсткого диска</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Progress: {
                                defaultColor: '#FCE49C',
                                fontSize:24
                            }
                        },
                    }}
                >
                    <Progress
                        className="progress"
                        percent={40}
                    />
                </ConfigProvider>
            </div>
            <div className="time">
                <h1 className="h1time">Время онлайн</h1>

            </div>
        </div>
    );
}

export default InfoBar;
