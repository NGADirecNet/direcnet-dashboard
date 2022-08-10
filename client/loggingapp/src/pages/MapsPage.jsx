import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Page } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const MapsPage = () => {
    const { currentColor } = useStateContext();
    const navigate = useNavigate();

    return (
        <Page headerCat="Page" headerTitle="Maps">
            <div className="m-3">
                <Button
                    color="white"
                    text="Add"
                    bgColor={currentColor}
                    borderRadius="10px"
                    onClick={() => navigate('/maps/new')}
                />
            </div>
        </Page>
    )
}

export default MapsPage;