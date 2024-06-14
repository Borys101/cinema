import { axiosInstance } from ".";

export const MakePayment = async (token, amount) => {
    try {
<<<<<<< HEAD
      const response = await axiosInstance.post("/api/bookings/make-payment", {
=======
      const response = await axiosInstance.post("http://localhost:4000/api/bookings/make-payment", {
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
        "/api/bookings/book-show",
=======
        "http://localhost:4000/api/bookings/book-show",
>>>>>>> my-recovered-branch
        payload
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

export const GetBookingsOfUser = async () => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.get("/api/bookings/get-bookings");
=======
        const response = await axiosInstance.get("http://localhost:4000/api/bookings/get-bookings");
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response.data;
    }
<<<<<<< HEAD
}
=======
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
>>>>>>> my-recovered-branch
