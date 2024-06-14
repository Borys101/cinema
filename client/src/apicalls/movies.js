const { axiosInstance } = require(".");

//Додати новий фільм
export const AddMovie = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/movies/add-movie", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/movies/add-movie", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Завантажити всі фільми
export const GetAllMovies = async () => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.get("/api/movies/get-all-movies");
=======
        const response = await axiosInstance.get("http://localhost:4000/api/movies/get-all-movies");
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//Оновити інформацію про фільм
export const UpdateMovie = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/movies/update-movie", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити фільм
export const DeleteMovie = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/movies/delete-movie", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати фільм за id
export const GetMovieById = async (id) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
=======
        const response = await axiosInstance.get(`http://localhost:4000/api/movies/get-movie-by-id/${id}`);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error.response;
    }
}