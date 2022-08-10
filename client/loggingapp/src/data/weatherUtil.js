// Util for weather portion of application
import { WiCloud, WiCloudy, WiDayCloudy, WiDayShowers, WiDaySunny, WiRain, WiSnow, WiStormShowers, WiStrongWind } from 'react-icons/wi'

export const apiIcon = [
    {
        name: '01',
        icon: <WiDaySunny />
    },
    {
        name: '02',
        icon: <WiDayCloudy />
    },
    {
        name: '03',
        icon: <WiCloud />
    },
    {
        name: '04',
        icon: <WiCloudy />
    },
    {
        name: '09',
        icon: <WiDayShowers />
    },
    {
        name: '10',
        icon: <WiRain />
    },
    {
        name: '11',
        icon: <WiStormShowers />
    },
    {
        name: '13',
        icon: <WiSnow />
    },
    {
        name: '50',
        icon: <WiStrongWind />
    },
]