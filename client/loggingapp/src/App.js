import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Footer, Sidebar, NavBar } from './components';
import { Dashboard, Calendar, Weather, Charts, EmanePage, TestingPage, TestView } from './pages';
import './App.css'

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
    const { activeMenu, currentColor, tests } = useStateContext();
    
    return (
        <BrowserRouter>
            <div className='flex relative dark:bg-main-dark-bg'>
                <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                        <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                            style={{ background: currentColor, borderRadius: '50%' }}>
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <Sidebar />
                    </div>
                ) : (
                    <div className='w-0'>
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <NavBar />
                    </div>
                    <div>
                        <Routes>
                            {/* Dashboard */}
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/home' element={<Dashboard />} />
                            {/* Pages */}
                            <Route path='/tests' element={<TestingPage />} >
                                {/* Todo change test view to subset of tests url */}
                                {/* <Route path='test1' element={<TestView />} /> */}
                            </Route>
                            <Route path='/emane' element={<EmanePage />} />

                            {/* Apps */}
                            <Route path='/calendar' element={<Calendar />} />
                            <Route path='/weather' element={<Weather />} />
                            <Route path='/charts' element={<Charts />} />

                            {/* Tests */}
                            <Route path='/test/:id' element={<TestView />} />
                            <Route path='/test/new' element={<TestView new />} />
                            <Route path='/demo' element={<TestView />} />

                            {/* External */}
                            <Route path='/latest-stable' element={
                                // <a
                                //     href={'https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/8cabc6bf2239fdd14c88f90e8787c8dfb2d13231'}
                                //     target="_blank"
                                //     rel="noopener noreferrer"
                                // />
                                () => {
                                    // useEffect(() => {
                                        window.location.replace('https://cuse-atlassian.alionscience.com:8446/projects/DNET/repos/simulink/commits/8cabc6bf2239fdd14c88f90e8787c8dfb2d13231')
                                    // }, [])
                                    return null;
                                }
                            } />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
            {/* Links */}
            {tests.map(test => (<Link to={'/test/' + test._id} />))}
        </BrowserRouter>
    )
}

export default App