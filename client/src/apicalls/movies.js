const { axiosInstance } = require(".");

//Додати новий фільм
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Завантажити всі фільми
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:4000/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//Оновити інформацію про фільм
export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Видалити фільм
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Отримати фільм за id
export const GetMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`http://localhost:4000/api/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}