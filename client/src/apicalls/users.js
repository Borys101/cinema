const { axiosInstance } = require(".");

//Реєстрація нового користувача
export const RegisterUser = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/users/register", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/users/register", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error;
    }
}

//Авторизація користувача
export const LoginUser = async (payload) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post("/api/users/login", payload);
=======
        const response = await axiosInstance.post("http://localhost:4000/api/users/login", payload);
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error;
    }
}

//Отримати користувача
export const GetCurrentUser = async () => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.get("/api/users/get-current-user");
=======
        const response = await axiosInstance.get("http://localhost:4000/api/users/get-current-user");
>>>>>>> my-recovered-branch
        return response.data;
    } catch (error) {
        return error;
    }
}