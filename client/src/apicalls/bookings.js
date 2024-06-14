import { axiosInstance } from ".";

export const MakePayment = async (token, amount) => {
    try {
      const response = await axiosInstance.post("http://localhost:4000/api/bookings/make-payment", {
        token,
        amount,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

export const BookShowTickets = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/api/bookings/book-show",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

export const GetBookingsOfUser = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:4000/api/bookings/get-bookings");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const AddPointsToUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:4000/api/users/add-points",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const RemovePointsFromUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:4000/api/users/remove-points",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};