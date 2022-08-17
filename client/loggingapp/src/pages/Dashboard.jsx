import React from 'react';
import { FaJira, FaConfluence, FaBitbucket } from 'react-icons/fa'
import { GoEye } from 'react-icons/go';
import { CalendarWidget, SyncWidget, GraphWidget, RecentWidget, SmallWidget, WeatherWidget, ChangeSmallWidget, MainSmallWidget, EditableTextField } from '../components';
import { getTime } from '../data/smallWidgetUtil';
import { useStateContext } from '../contexts/ContextProvider';
import dashApiService from '../api/dashApi';

const Dashboard = () => {
  const { currentDemo, dashInfo, setDashInfo } = useStateContext();
  const normalLink = 'flex items-center gap-5 pl-4 pt-2 pb-1.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1';
  const smallWidgetData = [
    {
      data: {
        icon: <GoEye />,
        ...getTime(new Date(currentDemo.date).toLocaleDateString('en-US'), 'Demo'),
        link: '/tests/' + currentDemo._id
      },
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

  const updateLatest = (e, field, idx) => {
    const newDashInfo = {
      ...dashInfo, 
      latest: [...dashInfo.latest.map((l, i) => (i === idx ? { ...l, [field]: e.value } : l) )]
    }
    setDashInfo(newDashInfo);
    dashApiService.update(newDashInfo);
  }

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-6 pt-8 m-3">
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8443/secure/Dashboard.jspa", <FaJira />, "Jira")}
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8444/display/DIR/Next+Gen+Airborne+DirecNet", <FaConfluence />, "Confluence")}
          {getAtlassianButton("https://cuse-atlassian.alionscience.com:8446/plugins/servlet/bb_ag/projects/DNET/repos/simulink/commits", <FaBitbucket />, "BitBucket")}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-5 rounded-2xl ">
            <p className='text-lg font-semibold'>Latest</p>
            {dashInfo && dashInfo.latest.map((d, idx) => {
              return (
                <div className='flex justify-between px-1 py-1'>
                  <EditableTextField
                    placeholder={d.name}
                    className=''
                    onChange={(e) => updateLatest(e, 'name', idx)}
                  />
                  <EditableTextField
                    placeholder={d.value}
                    className=''
                    onChange={(e) => updateLatest(e, 'value', idx)}
                  />
                </div>
              )
            })}
          </div>
          <ChangeSmallWidget />
          <MainSmallWidget />
          {smallWidgetData.map((item) => (
            <SmallWidget item={item.data} dropData={item.dropData} key={item} />
          ))}
        </div>
      </div>
      <div className="flex gap-8 m-4 flex-wrap justify-center">
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