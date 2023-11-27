import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Table, message } from 'antd';

function TheatresList() {

    const [ theatres, setTheatres ] = useState([]);

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatres();
            if(response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const handleStatusChange = async (theatre) => {
        try {
            dispatch(ShowLoading());
            const response = await UpdateTheatre({
                theatreId: theatre._id,
                ...theatre,
                isActive: !theatre.isActive
            });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: "Назва",
            dataIndex: "name"
        },
        {
            title: "Адреса",
            dataIndex: "address"
        },
        {
            title: "Номер телефону",
            dataIndex: "phone"
        },
        {
            title: "Електрона пошта",
            dataIndex: "email"
        },
        {
            title: "Власник",
            dataIndex: "owner",
            render: (text, record) => {
                return record.owner.name
            }
        },
        {
            title: "Статус",
            dataIndex: "isActive",
            render: (text, record) => {
                if (text) {
                    return "Схвалено"
                } else {
                    return "Очікує / Заблоковано"
                }
            }
        },
        {
            title: "Дії",
            dataIndex: "action",
            render: (text, record) => {
                return (<div className="flex gap-1">
                    {record.isActive && <span className='underline' onClick={() => handleStatusChange(record)}>Заблокувати</span>}
                    {!record.isActive && <span className='underline'onClick={() => handleStatusChange(record)}>Схвалити</span>}
                </div>)
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>

            <Table columns={columns} dataSource={theatres} />
        </div>
    );
}

export default TheatresList;