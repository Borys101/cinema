import { axiosInstance } from ".";

//Додати новий театр
export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/theatres/add-theatre",
            payload
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати список кінотеатрів
export const GetAllTheatres = async () => {
    try {
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати список кінотеатрів користувача
export const GetAllTheatresByOwner = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/get-all-theatres-by-owner", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Оновити інформацію про кінотеатр
export const UpdateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/update-theatre", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити кінотеатр
export const DeleteTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/delete-theatre", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Додати новий сеанс
export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/add-show", payload);
        return response.data;   
    } catch (error) {
        return error.response;
    }
}

//Отримати усі сеанси
export const GetAllShowsByTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/get-all-shows-by-theatre", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити сеанс
export const DeleteShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/delete-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати усі театри для кіно
export const GetAllTheatresByMovie = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/get-all-theatres-by-movie",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

//Отримати шоу за id
export const GetShowById = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/get-show-by-id", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}