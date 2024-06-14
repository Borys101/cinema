import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Table, message } from 'antd';

function TheatresList() {

    const [ theatres, setTheatres ] = useState([]);

=======
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Table, message } from 'antd';
import Button from '../../components/Button';
import TheatreForm from './TheatreForm';
import { DeleteTheatre } from '../../apicalls/theatres';
import Shows from './Shows';

function TheatresList() {

    const { user } = useSelector(state => state.users);
    const [ showTheatreForModal, setShowTheatreForModal ] = useState(false);
    const [ selectedTheatre, setSelectedTheatre ] = useState(null);
    const [ formType, setFormType ] = useState("add");
    const [ theatres, setTheatres ] = useState([]);
    const [ openShowsModal, setOpenShowsModal ] = useState(false);
>>>>>>> my-recovered-branch
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

<<<<<<< HEAD
    const handleStatusChange = async (theatre) => {
        try {
            dispatch(ShowLoading());
            const response = await UpdateTheatre({
                theatreId: theatre._id,
                ...theatre,
                isActive: !theatre.isActive
            });
=======
    const handleDelete = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteTheatre({ theatreId: id });
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
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
=======
            title: "Дії",
            dataIndex: "action",
            render: (text, record) => {
                return <div className="flex gap-1 items-center">
                    <i className="ri-delete-bin-line"
                        onClick={() => {
                            handleDelete(record._id);
                        }}
                    >
                    </i>
                    <i 
                        className="ri-pencil-line"
                        onClick={() => {
                            setFormType("edit");
                            setSelectedTheatre(record);
                            setShowTheatreForModal(true);
                        }}
                    ></i>
                    {<span 
                        className='underline'
                        onClick={() => {
                            setSelectedTheatre(record);
                            setOpenShowsModal(true);
                        }}>
                            Сеанси
                        </span>}
                </div>
>>>>>>> my-recovered-branch
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
<<<<<<< HEAD

            <Table columns={columns} dataSource={theatres} />
=======
            <div className="flex justify-end mb-1">
                <Button 
                    variant="white" 
                    title="Додати театр" 
                    onClick={() => {
                        setFormType("add");
                        setShowTheatreForModal(true);
                    }}
                />

            </div>

            <Table columns={columns} dataSource={theatres} pagination={false}/>

            {showTheatreForModal && (
                <TheatreForm 
                    showTheatreForModal={showTheatreForModal}
                    setShowTheatreForModal={setShowTheatreForModal}
                    formType={formType}
                    setFormType={setFormType}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
            />)}
            {openShowsModal && <Shows 
                openShowsModal={openShowsModal}
                setOpenShowsModal={setOpenShowsModal}
                theatre={selectedTheatre}    
            />}
>>>>>>> my-recovered-branch
        </div>
    );
}

export default TheatresList;