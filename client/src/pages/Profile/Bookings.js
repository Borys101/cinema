import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { Row, Col, message } from 'antd';
import { GetBookingsOfUser } from '../../apicalls/bookings';
import moment from 'moment';
function Bookings() {
    const [ bookings, setBookings ] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetBookingsOfUser();
            if (response.success) {
                setBookings(response.data);
                console.log(response.data);
            } else {
                message.error(response.message);
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
    return (
        <div>
            <Row gutter={[16, 16]}>
                {bookings.map(booking => (
                    <Col span={12}>
                        <div className="card p-2 flex justify-between uppercase">
                            <div>
                                <h1 className="text-xl">
                                    {booking.show.movie.title} ({booking.show.movie.language})
                                </h1>
                                <div className="divider"></div>
                                <h1 className="text-sm">
                                    {booking.show.theatre.name} ({booking.show.theatre.address})
                                </h1>
                                <h1 className="text-sm">
                                    Дата та час: {moment(booking.show.date).format("DD.MM.YYYY")} - {moment(booking.show.time, "HH:mm").format("HH:mm")}
                                </h1>
                                <h1 className="text-sm">Ціна: {(booking.show.ticketPrice * booking.seats.length)} грн</h1>
                                <h1 className="text-sm">ID бронювання: {booking._id}</h1>
                            </div>

                            <div>
                                <img src={booking.show.movie.poster} alt="poster" height={100} width={100} className='br-1'/>
                                <h1 className="text-sm">
                                    Місця: {booking.seats.join(", ")}
                                </h1>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Bookings;