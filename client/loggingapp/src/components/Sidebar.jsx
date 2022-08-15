import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiNetworkBars } from 'react-icons/gi'
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';
import { VscDashboard, VscRadioTower } from 'react-icons/vsc';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineCalendar, AiOutlineAreaChart } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FiMap } from 'react-icons/fi';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'home',
          icon: <VscDashboard />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'tests',
          icon: <VscRadioTower />,
        },
        // {
        //   name: 'emane',
        //   icon: <RiComputerLine />,
        // },
        {
          name: 'maps',
          icon: <FiMap />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'weather',
          icon: <TiWeatherPartlySunny />,
        },
        {
          name: 'charts',
          icon: <AiOutlineAreaChart />,
        },
      ],
    },
  ];

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <=900) setActiveMenu(false)
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          <div className='flex justify-between items-center'>
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-l font-extrabold tracking-tight dark:text-white text-slate-900">
              <GiNetworkBars /> <span>DirecNet Testing Dashboard</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button type="button" onClick={() => setActiveMenu((prevState) => !prevState)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className='mt-10'>
            {links.map((item) => (
              <div key={item.title}>
                <p className='text-gray-400 m-3 mt-4 uppercase'>
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className='capitalize'>
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar