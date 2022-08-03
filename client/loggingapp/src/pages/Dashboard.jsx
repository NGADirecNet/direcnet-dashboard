import React from 'react';
import { FaJira, FaConfluence, FaBitbucket } from 'react-icons/fa'
import { DiGitBranch } from 'react-icons/di';
import { BsCheck2 } from 'react-icons/bs';
import { GoEye } from 'react-icons/go';
import { CalendarWidget, SyncWidget, GraphWidget, RecentWidget, SmallWidget, WeatherWidget } from '../components';
import { getTime } from '../data/smallWidgetUtil';

const Dashboard = () => {
  const normalLink = 'flex items-center gap-5 pl-4 pt-2 pb-1.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1';
  const smallWidgetData = [
    {
      icon: <DiGitBranch />,
      ...getTime('15 Jul 2022 9:50', 'Software Change', '6c47dc6'),
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'red-600',
      externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/6c47dc6fcbb6d2a4399e43a99d20dc3587b1d1e9'
    },
    {
      icon: <BsCheck2 />,
      ...getTime('8 Jul 2022 9:52', 'Stable Software', 'main'),
      externallink: 'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/7b1efb684f2adf8a4f9e89270d1ed3ec62611e61'
    },
    {
      icon: <GoEye />,
      ...getTime('7/27/22', 'Demo'),
      link: '/demo'
    },
  ];
  const getAtlassianButton = (link, icon, text) =>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={normalLink}
    >
      <button style={{ color: "#0052CC" }}>{icon}</button>
      <span>{text}</span>
    </a>

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-6 pt-8 m-3">
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8443/secure/Dashboard.jspa", <FaJira />, "Jira")}
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8444/display/DIR/Next+Gen+Airborne+DirecNet", <FaConfluence />, "Confluence")}
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/", <FaBitbucket />, "BitBucket")}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <p className='text-lg font-semibold'>Latest</p>
            <div className='flex justify-between px-1 py-1'>
              <p>SW</p>
              <p>Jun 29 2022</p>
            </div>
            <div className='flex justify-between px-1 py-1'>
              <p>FW</p>
              <p>2022/06/01</p>
            </div>
            <div className='flex justify-between px-1 py-1'>
              <p>GUI</p>
              <p>1.0</p>
            </div>
          </div>
          {smallWidgetData.map((item) => (
            <SmallWidget item={item} />
          ))}
        </div>
      </div>
      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <RecentWidget />
        <GraphWidget />
      </div>
      <div className="flex flex-wrap justify-center">
        <SyncWidget />
        <CalendarWidget />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Dashboard;