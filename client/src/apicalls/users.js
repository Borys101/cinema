const { axiosInstance } = require(".");

//Реєстрація нового користувача
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}

//Авторизація користувача
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:4000/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}

//Отримати користувача
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:4000/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error;
    }
}