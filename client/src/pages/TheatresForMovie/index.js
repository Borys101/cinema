import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetMovieById } from '../../apicalls/movies';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import { GetAllTheatresByMovie } from '../../apicalls/theatres';

function TheatresForMovie() {
    const tempDate = new URLSearchParams(window.location.search).get("date");
    const [ date, setDate ] = useState(tempDate || moment().format("YYYY-MM-DD"));
    const [ movie, setMovie ] = useState([]);
    const [ theatres, setTheatres ] = useState([]);
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const params = useParams();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetMovieById(params.id);
            if(response.success) {
                setMovie(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const getTheatres = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByMovie({date, movie: params.id});
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getTheatres();
    }, [date])
    return movie && <div>
        <div className='flex justify-between items-center mb-2'>
            <div>
                <h1 className="text-2xl uppercase">
                    {movie.title} ({movie.language})
                </h1>
                <h1 className="text-md">
                    Тривалість: {movie.duration} хвилин
                </h1>
                <h1 className="text-md">
                    Дата релізу: {moment(movie.releaseDate).format("DD.MM.YYYY")}
                </h1>
                <h1 className="text-md">
                    Жанр: {movie.genre}
                </h1>
            </div>
            <div>
                <h1 className="text-md">
                    Обрати дату:
                </h1>
                <input 
                    type="date" 
                    min={moment().format("YYYY-MM-DD")} 
                    value={date} 
                    onChange={(e) => {
                        setDate(e.target.value);
                        navigate(`/movie/${params.id}?date=${e.target.value}`);
                    }}
                />
            </div>
        </div>

        <hr />
        <div className='mt-1'>
            <h1 className="text-xl uppercase">
                Theatres
            </h1>
        </div>

        <div className="mt-1 flex-col gap-1">
            {theatres.map(theatre => (
                <div className="card p-2">
                    <h1 className="text-md uppercase">{theatre.name}</h1>
                    <h1 className="text-sm">Адреса: {theatre.address}</h1>

                    <div className="divider"></div>

                    <div className="flex gap-2">
                        {theatre.shows.sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")).map(show => (
                            <div 
                                className='card p-1 cursor-pointer'
                                onClick={() => {
                                    navigate(`/book-show/${show._id}`)
                                }}
                            >
                                <h1 className="text-sm">{show.time}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default TheatresForMovie;