import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { message } from 'antd';
import { GetShowById } from '../../apicalls/theatres';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Button from "../../components/Button"
<<<<<<< HEAD
import { BookShowTickets, MakePayment } from '../../apicalls/bookings';
=======
import { AddPointsToUser, BookShowTickets, MakePayment, RemovePointsFromUser } from '../../apicalls/bookings';
import { AddPoints, RemovePoints } from '../../redux/usersSlice';
import { Switch } from "antd";
import { InputNumber } from "antd";
>>>>>>> my-recovered-branch

function BookShow() {
  const { user } = useSelector(state => state.users);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
<<<<<<< HEAD
=======
  const [isUsePoints, setIsUsePoints] = useState(false);
  const [usedPoints, setUsedPoints] = useState(0);
>>>>>>> my-recovered-branch
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
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
=======
  const onUsePointsChange = (e) => {
    setIsUsePoints(e);
  }

  const onCountPointsChange = (e) => {
    setUsedPoints(e);
    console.log(e);
    console.log(selectedSeats.length * show.ticketPrice)

  }

  const handleBookButtonClick = async () => {
    if (selectedSeats.length * show.ticketPrice * (1 - show.discount / 100) - usedPoints === 0) {
      await book(null);
    }
  };

>>>>>>> my-recovered-branch
  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;
                let seatClass = "seat";

                if (selectedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat";
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat";
                }

                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
<<<<<<< HEAD
        transactionId,
        user: user._id,
      });
      if (response.success) {
=======
        transactionId: transactionId || "points",
        user: user._id,
      });
      if (response.success) {
        await AddPointsToUser({ points: Math.floor((selectedSeats.length * show.ticketPrice * (1 - show.discount / 100) - usedPoints) / 10) })
        await RemovePointsFromUser({ points: usedPoints })
        dispatch(AddPoints(Math.floor((selectedSeats.length * show.ticketPrice * (1 - show.discount / 100) - usedPoints) / 10)))
        dispatch(RemovePoints(usedPoints));
>>>>>>> my-recovered-branch
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
<<<<<<< HEAD
=======
    console.log(123);
>>>>>>> my-recovered-branch
  }, [])
  return (
    show && <div>
      <div className="flex justify-between card p-2 items-center">
        <div>
          <h1 className="text-xl">{show.theatre.name}</h1>
          <h1 className="text-sm">{show.theatre.address}</h1>
        </div>

        <div>
          <h1 className="text-2xl uppercase">{show.movie.title} ({show.movie.language})</h1>
        </div>

        <div>
          <h1 className="text-xl">{moment(show.date).format("DD.MM.YYYY")} -{" "} {moment(show.time, "HH:mm").format("HH:mm")}</h1>
        </div>
      </div>
      <div className="flex justify-center mt-2">{getSeats()}</div>


      {selectedSeats.length > 0 && (
        <div className="mt-2 flex justify-center gap-2 items-center flex-col">
          <div className="flex justify-center">
<<<<<<< HEAD
            <div className="card flex uppercase p-2 gap-3">
              <h1 className="text-sm">
                <b>Обрані місця: {selectedSeats.join(", ")}</b>
              </h1>
              <h1 className="text-sm">
                <b>Вартість: {selectedSeats.length * show.ticketPrice} грн</b>
              </h1>
            </div>
          </div>
          <StripeCheckout
            currency='UAH'
            token={onToken}
            amount={selectedSeats.length * show.ticketPrice * 100}
            stripeKey='pk_test_51OFy3vDFICM3o74tYKqk2BlTWbP9lPIgAGP3GXWXIKMGBIq5pTsoTHPD0eeso8cVmBAE5mBeSFLoLTgmYvbILYf7003nuA2gDO'
          >
            <Button title='Book now' />
          </StripeCheckout>
=======
            <div className="card">
              <div className='flex uppercase p-2 gap-3'>
                <h1 className="text-sm">
                  <b>Обрані місця: {selectedSeats.join(", ")}</b>
                </h1>
                <h1 className="text-sm">
                  {!show.discount ? <b>Вартість: {(selectedSeats.length * show.ticketPrice - usedPoints).toFixed(2)} грн</b> : <b>Вартість: <del>{(selectedSeats.length * show.ticketPrice - usedPoints).toFixed(2)}</del> {((selectedSeats.length * show.ticketPrice) / 100 * (100 - show.discount) - usedPoints).toFixed(2)} грн </b>}
                </h1>
              </div>
              <div className='flex uppercase p-1 justify-center'>
                <h1 className='text-sm'>
                  <b className='pr-1'>Використати бали ({user.points})</b>
                  <Switch size='small' onChange={onUsePointsChange} disabled={!user.points} />
                </h1>
              </div>
              {isUsePoints && <div className='flex justify-center m-1'>
                <InputNumber placeholder='Введіть кількість балів' className='w-60' max={user.points > show.ticketPrice ? show.ticketPrice * selectedSeats.length * (1 - show.discount / 100) : user.points} onChange={onCountPointsChange} />
              </div>
              }
            </div>
          </div>
          <div className='flex items-center gap-3'>
            {usedPoints === selectedSeats.length * show.ticketPrice * (1 - show.discount / 100) ? <Button title='Забронювати' onClick={handleBookButtonClick} />
              : <StripeCheckout
                currency='UAH'
                token={onToken}
                amount={(selectedSeats.length * show.ticketPrice * (1 - show.discount / 100) - usedPoints) * 100}
                stripeKey='pk_test_51OFy3vDFICM3o74tYKqk2BlTWbP9lPIgAGP3GXWXIKMGBIq5pTsoTHPD0eeso8cVmBAE5mBeSFLoLTgmYvbILYf7003nuA2gDO'
              >
                <Button title='Забронювати' onClick={handleBookButtonClick} />
              </StripeCheckout>}
          </div>
>>>>>>> my-recovered-branch
        </div>
      )}
    </div>
  );
}

export default BookShow;