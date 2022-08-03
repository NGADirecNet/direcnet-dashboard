import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </TooltipComponent>
);

const NavBar = () => {
    const { activeMenu, setActiveMenu, screenSize, setScreenSize, currentColor } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) setActiveMenu(false);
        else setActiveMenu(true);
    }, [screenSize]);

    return (
        <div className='flex justify-between p-2 md:ml-6 md: mr-6 relative'>
            <NavButton title="Menu" customFunc={() => setActiveMenu(prevState => !prevState)} color={currentColor} icon={<AiOutlineMenu />} />
        </div>
    )
}

export default NavBar