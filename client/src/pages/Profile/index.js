import React from 'react';
import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import Bookings from './Bookings';
function Profile() {
    return (
        <div>
            <PageTitle title="Профіль" />
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Бронювання" key="1">
                    <Bookings />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Profile;