import { axiosInstance } from ".";

//Додати новий театр
export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post(
<<<<<<< HEAD
            "/api/theatres/add-theatre",
=======
            "http://localhost:4000/api/theatres/add-theatre",
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
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
=======
        const response = await axiosInstance.get("http://localhost:4000/api/theatres/get-all-theatres");
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Оновити інформацію про кінотеатр
export const UpdateTheatre = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/update-theatre", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/update-theatre", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити кінотеатр
export const DeleteTheatre = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/delete-theatre", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/delete-theatre", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Додати новий сеанс
export const AddShow = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/add-show", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/add-show", payload);
>>>>>>> my-recovered-branch
        return response.data;   
    } catch (error) {
        return error.response;
    }
}

//Отримати усі сеанси
export const GetAllShowsByTheatre = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/get-all-shows-by-theatre", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/get-all-shows-by-theatre", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити сеанс
export const DeleteShow = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/delete-show", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/delete-show", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати усі театри для кіно
export const GetAllTheatresByMovie = async (payload) => {
    try {
      const response = await axiosInstance.post(
<<<<<<< HEAD
        "/api/theatres/get-all-theatres-by-movie",
=======
        "http://localhost:4000/api/theatres/get-all-theatres-by-movie",
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/theatres/get-show-by-id", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/get-show-by-id", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати шоу зі знижкою
export const GetAllShowsWithDiscount = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:4000/api/theatres/get-all-shows-with-discount");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Змінити знижку
export const ChangeDiscount = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/theatres/change-discount", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}