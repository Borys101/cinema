import { Col, Row, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetAllShowsWithDiscount } from '../../apicalls/theatres';

const Promotions = () => {
    const [ discounts, setDiscounts ] = useState([]);
    const dispatch = useDispatch();    
    const navigate = useNavigate();     
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllShowsWithDiscount();
            if(response.success) {
                setDiscounts(response.data);
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

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <h2 className='text-md uppercase text-secondary mt-1 mb-1'>Акції та пропозиції</h2>
            <p className='text-md'>Система накопичення балів у застосунку кінотеатру працює на основі покупок квитків у кінотеатрі. Кожен раз, коли клієнт здійснює покупку, він отримує певну кількість балів, залежно від суми витрат. Ці бали можна потім обміняти на безкоштовні квитки або знижку до них, що пропонуються кінотеатром.</p>
            <h2 className='text-md mt-1 mb-1'>Система накопичення балів працює на таких умовах:</h2>
            <p>1. Кожні 10 гривень, витрачених на покупку квитків у кінотеатрі, приносять користувачу 1 бал.</p>
            <p>2. При оплаті квитків за допомогою накопичених балів, 1 бал еквівалентний 1 гривні.</p>
            <h2 className='text-md uppercase text-secondary mt-1 mb-1'>Доступні акції</h2>
            <Row gutter={[20]} className='mt-2'>
                {discounts.map(show => (
                    <Col span={6}>
                        <div 
                            className="card flex flex-col gap-1 cursor-pointer mb-2"
                            onClick={() => navigate(`/book-show/${show._doc._id}`)}
                        >
                            <img src={show.poster} alt='poster' height={200} width="100%"/>
                            <div className="flex justify-center p-1 bg-secondary text-white">
                                <h2 className='text-md uppercase'>{`${show._doc.discount}% на ${show._doc.name}`}</h2>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Promotions;