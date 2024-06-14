import React, { useEffect, useState } from 'react';
import Button from "../../components/Button";
import MoviesForm from './MoviesForm';
import moment from 'moment'
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { DeleteMovie, GetAllMovies } from '../../apicalls/movies';

function MoviesList() {
    const [ movies, setMovies ] = useState([]);
    const [ showMovieFormModal, setShowMovieFormModal ] = useState(false);
    const [ selectedMovie, setSelectedMovie ] = useState(null);
    const [ formType, setFormType ] = useState("add");
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if(response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const handleDelete = async (movieId) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteMovie({
                movieId
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
            title: "Постер",
            dataIndex: "poster",
            render: (text, record) => {
                return (
                    <img 
                        className='br-1'
                        src={record.poster}
                        alt="poster"
                        height="60"
                        width="80"
                    />
                )
            }
        },
        {
            title: "Назва",
            dataIndex: "title"
        },
        {
            title: "Опис",
            dataIndex: "description"
        },
        {
            title: "Тривалість (хвилин)",
            dataIndex: "duration"
        },
        {
            title: "Жанр",
            dataIndex: "genre"
        },
        {
            title: "Мова",
            dataIndex: "language"
        },
        {
            title: "Дата релізу",
            dataIndex: "releaseDate",
            render: (text, record) => {
                return moment(record.releaseDate).format("DD-MM-YYYY")
            }
        },
        {
            title: "Дії",
            dataIndex: "action",
            render: (text, record) => {
                return <div className="flex gap-1">
                    <i className="ri-delete-bin-line"
                        onClick={() => {
                            handleDelete(record._id);
                        }}
                    >
                    </i>
                    <i 
                        className="ri-pencil-line"
                        onClick={() => {
                            setSelectedMovie(record);
                            setFormType("edit");
                            setShowMovieFormModal(true);
                        }}
                    ></i>
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
                    title="Додати фільм"
<<<<<<< HEAD
                    variant="outlined"
=======
                    variant="white"
>>>>>>> my-recovered-branch
                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }}
                />
            </div>

<<<<<<< HEAD
            <Table columns={columns} dataSource={movies}/>
=======
            <Table columns={columns} dataSource={movies} pagination={false}/>
>>>>>>> my-recovered-branch

            {showMovieFormModal && <MoviesForm 
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />}
        </div>
    );
}

export default MoviesList;