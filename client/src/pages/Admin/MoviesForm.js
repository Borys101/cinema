import React from 'react';
import { Col, Form, Modal, Row, message } from 'antd';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { AddMovie, UpdateMovie } from '../../apicalls/movies';
import moment from 'moment';

function MoviesForm({ showMovieFormModal, setShowMovieFormModal, selectedMovie, setSelectedMovie, formType, getData }) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
    }
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;

            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie({
                    ...values,
                    movieId: selectedMovie._id
                })
            }

            if (response.success) {
                getData();
                message.success(response.message);
                setShowMovieFormModal(false);
                dispatch(HideLoading());
            } else {
                message.error(response.message)
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <Modal
            title={formType === "add" ? "ДОДАТИ ІНФОРМАЦІЯ ПРО ФІЛЬМ" : "РЕДАГУВАТИ ІНФОРМАЦІЮ ПРО ФІЛЬМ"}
            open={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
                initialValues={selectedMovie}
            >
                <Row
                    gutter={16}
                >
                    <Col span={24}>
                        <Form.Item label="Назва фільму" name="title">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Опис фільму" name="description">
                            <textarea type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Тривалість фільму (хвилини)" name="duration">
                            <input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Мова" name="language">
                            <select>
                                <option value="">Оберіть мову</option>
                                <option value="Українська">Українська</option>
                                <option value="Англійська">Англійська</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Дата релізу" name="releaseDate">
                            <input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Жанр" name="genre">
                            <select name="" id="">
                                <option>Оберіть жанр</option>
                                <option value="Екшн">Екшн</option>
                                <option value="Комедія">Комедія</option>
                                <option value="Драма">Драма</option>
                                <option value="Роман">Роман</option>
                                <option value="Хорор">Хорор</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Посилання на постер" name="poster">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-end gap-1">
                    <Button 
                        title='Cancel' 
                        variant="outlined" 
                        type='button'
                        onClick={() => {
                            setShowMovieFormModal(false);
                            setSelectedMovie(null);
                        }}
                    />
                    <Button title="Save" type="submit" />
                </div>
            </Form>
        </Modal>
    );
}

export default MoviesForm;