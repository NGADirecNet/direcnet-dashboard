import React, { useState } from 'react'
import dashApiService from '../api/dashApi';
import weatherApiService from '../api/weatherApi';
import { AddButton, Dropdown, DropdownLocation, EditableTextField, Page as PageWrap, RemoveButton } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useWeatherContext } from '../contexts/WeatherContextProvider';

const SettingsPage = () => {

    const { dashInfo, setDashInfo } = useStateContext();
    const { weatherData, setWeatherData, setCurrent, setDaily, setHourly, setMinutely } = useWeatherContext();

    const addLocation = () => {
        const newLocation = { name: "New Location Name", lat: 0.0000, long: 0.0000 };
        const newDashInfo = { ...dashInfo, locations: [...dashInfo.locations, newLocation] };
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
    }

    const updateDefaultWeather = (val) => {
        const newDashInfo = { ...dashInfo, weatherDefault: val }
        setDashInfo(newDashInfo);
        dashApiService.update(newDashInfo);
    }

    return (
        <PageWrap headerCat="Page" headerTitle="Settings">
            <div>
                <p className='font-bold py-3'>Our Locations</p>
                <div className='flex gap-10 flex-wrap lg:flex-nowrap'>
                    {dashInfo && dashInfo.locations.map((l, i) => {
                        return (
                            <DropdownLocation loc={l} idx={i} />
                        )
                    })}
                </div>
                <AddButton onClick={addLocation} />
            </div>
            <div>
                <p className='font-bold py-3'>Select Weather Default:</p>
                {dashInfo && <Dropdown
                    data={dashInfo.locations.map((l, i) => {return { location: l.name, index: i }})}
                    fields={{text: 'location', value: 'index'}}
                    onChange={updateDefaultWeather}
                    defaultValue={dashInfo.weatherDefault}
                    width={"200px"}
                />}
            </div>
        </PageWrap>
    );
}

export default SettingsPage;