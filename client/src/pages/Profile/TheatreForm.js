import { Form, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function TheatreForm({
  showTheatreForModal,
  setShowTheatreForModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreForModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.message);
      }
       
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Додати театр" : "Редагувати інформацію про театр"}
      open={showTheatreForModal}
      onCancel={() => {
        setShowTheatreForModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Назва"
          name="name"
          rules={[{ required: true, message: "Введіть назву кінотеатру" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Адреса"
          name="address"
          rules={[{ required: true, message: "Введіть адресу кінотеатру" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Номер телефону"
          name="phone"
          rules={[
            { required: true, message: "Введіть контактний телефон кінотеатру" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Електрона пошта"
          name="email"
          rules={[{ required: true, message: "Введіть електрону пошту кінотеатру" }]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreForModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;