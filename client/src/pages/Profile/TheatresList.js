import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import TheatreForm from './TheatreForm';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTheatre, GetAllTheatresByOwner } from '../../apicalls/theatres';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Table, message } from 'antd';
import Shows from './Shows';

function TheatresList() {

    const { user } = useSelector(state => state.users);
    const [ showTheatreForModal, setShowTheatreForModal ] = useState(false);
    const [ selectedTheatre, setSelectedTheatre ] = useState(null);
    const [ formType, setFormType ] = useState("add");
    const [ theatres, setTheatres ] = useState([]);
    const [ openShowsModal, setOpenShowsModal ] = useState(false);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByOwner({owner: user._id});
            if(response.success) {
                setTheatres(response.data);
                console.log(response.data)
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteTheatre({ theatreId: id });
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
                    {record.isActive && <span 
                        className='underline'
                        onClick={() => {
                            setSelectedTheatre(record);
                            setOpenShowsModal(true);
                        }}>
                            Shows
                        </span>}
                </div>
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button 
                    variant="outlined" 
                    title="Додати театр" 
                    onClick={() => {
                        setFormType("add");
                        setShowTheatreForModal(true);
                    }}
                />

            </div>

            <Table columns={columns} dataSource={theatres} />

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
        </div>
    );
}

export default TheatresList;