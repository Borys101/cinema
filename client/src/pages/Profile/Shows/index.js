import { Col, Form, Modal, Row, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { GetAllMovies } from '../../../apicalls/movies'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { AddShow, DeleteShow, GetAllShowsByTheatre } from '../../../apicalls/theatres';
import moment from 'moment'

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
    const [view, setView] = useState("table");
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const moviesResponse = await GetAllMovies();
            if (moviesResponse.success) {
                setMovies(moviesResponse.data);
            } else {
                message.error(moviesResponse.message);
            }
            const showsResponse = await GetAllShowsByTheatre({ theatreId: theatre._id });
            if (showsResponse.success) {
                setShows(showsResponse.data);
            } else {
                message.error(showsResponse.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }

    const handleAddShow = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await AddShow({ ...values, theatre: theatre._id });
            if (response.success) {
                message.success(response.message);
                getData();
                setView("table");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }

    const handleDelete = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteShow({ showId: id });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }

    const columns = [
        {
            title: "Назва сеансу",
            dataIndex: "name"
        },
        {
            title: "Дата",
            dataIndex: "date",
            render: (text, record) => {
                return moment(text).format("MMMM Do YYYY")
            }
        },
        {
            title: "Час",
            dataIndex: "time"
        },
        {
            title: "Назва фільму",
            dataIndex: "movies",
            render: (text, record) => {
                return record.movie.title;
            }
        },
        {
            title: "Ціна квитка",
            dataIndex: "ticketPrice"
        },
        {
            title: "Всього місць",
            dataIndex: "totalSeats"
        },
        {
            title: "Доступно місць",
            dataIndex: "availableSeats",
            render: (text, record) => {
                return record.totalSeats - record.bookedSeats.length;
            }
        },
        {
            title: "Дії",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className="flex gap-1 items-center">
                        {record.bookedSeats.length === 0 && (
                            <i className="ri-delete-bin-line"
                                onClick={() => {
                                    handleDelete(record._id);
                                }}
                            >
                            </i>
                        )}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <Modal
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className="text-primary text-md uppercase mb-1">
                Theatre: {theatre.name}
            </h1>
            <hr />

            <div className="flex justify-between mt-1 mb-1 items-center">
                <h1 className="text-md uppercase">
                    {view === "table" ? "Сеанси" : "Додати сеанс"}
                </h1>
                {view === "table" && <Button
                    variant="outlined"
                    title="Додати сеанс"
                    onClick={() => {
                        setView("form");
                    }}
                />}
            </div>

            {view === "table" && (<Table columns={columns} dataSource={shows} />)}

            {view === "form" &&
                <Form layout='vertical' onFinish={handleAddShow}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Назва сеансу" name="name" rules={[{ required: true, message: "Введіть назву сеансу" }]}>
                                <input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Оберіть дату" }]}>
                                <input type='date' min={new Date().toISOString().split("T")[0]} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Час" name="time" rules={[{ required: true, message: "Оберіть час" }]}>
                                <input type='time' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Фільм" name="movie" rules={[{ required: true, message: "Оберіть фільм" }]}>
                                <select>
                                    <option value="">Оберіть фільм</option>
                                    {movies.map(movie => (
                                        <option value={movie._id}>{movie.title}</option>
                                    ))}
                                </select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Ціна квитка" name="ticketPrice" rules={[{ required: true, message: "Введіть ціну квитка" }]}>
                                <input type='number' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Кількість місць" name="totalSeats" rules={[{ required: true, message: "Введіть кількість місць" }]}>
                                <input type='number' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="flex justify-end gap-1">
                        <Button
                            variant="outlined"
                            title="Cancel"
                            onClick={() => {
                                setView("table")
                            }}
                        />
                        <Button
                            variant="contained"
                            title="Save"
                            type="sumbit"
                        />
                    </div>
                </Form>}
        </Modal>
    );
}

export default Shows;