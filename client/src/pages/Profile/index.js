import React from 'react';
import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
<<<<<<< HEAD
import TheatresList from './TheatresList';
=======
>>>>>>> my-recovered-branch
import Bookings from './Bookings';
function Profile() {
    return (
        <div>
            <PageTitle title="Профіль" />
<<<<<<< HEAD

=======
>>>>>>> my-recovered-branch
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Бронювання" key="1">
                    <Bookings />
                </Tabs.TabPane>
<<<<<<< HEAD
                <Tabs.TabPane tab="Театри" key="2">
                    <TheatresList />
                </Tabs.TabPane>
=======
>>>>>>> my-recovered-branch
            </Tabs>
        </div>
    )
}

export default Profile;