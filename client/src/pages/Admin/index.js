import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Tabs } from 'antd';
import MoviesList from './MoviesList';
import TheatresList from './TheatresList';

function Admin() {
    return (
        <div>
            <PageTitle title="Адмін" />

            <Tabs>
                <Tabs.TabPane tab="Фільми" key="1">
                    <MoviesList />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Театри" key="2">
                    <TheatresList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Admin;