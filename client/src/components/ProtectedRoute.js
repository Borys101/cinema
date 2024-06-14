import React, { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';

function ProtectedRoute({children}) {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                dispatch(SetUser(null));
                message.error(response.message);
                localStorage.removeItem("token");
            }
        } catch (error) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser();
        } else {
            navigate('/login');
        }
    }, [])

    return (
        user && (
            <>
                <div className='layout p-1'>
                <div className="header bg-secondary br-2 flex justify-between p-3">
                    <div>
                        <h1 className="text-2xl text-white cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            MOVIES
                        </h1>
                    </div>
                    <div className="flex">
                        <div className='mt-1 flex'>
                            <i class="ri-coin-fill pr-03" style={{ color: "yellow", fontSize: "24px" }}></i>
                            <span className='pt-03 pr-1 text-white'>{user.points}</span>
                        </div>
                        <div className='bg-white p-1 flex gap-1'>
                            <i className="ri-shield-user-line"></i>
                            <h1 className="text-sm underline"
                                onClick={() => {
                                    if(user.isAdmin) {
                                        navigate("/admin")
                                    } else {
                                        navigate("/profile")
                                    }
                                }}
                            >
                                {user.name}
                            </h1>
                            <i className="ri-logout-box-r-line ml-2"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login")
                                }}>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="content mt-1 p-1">
                    {children}
                </div>
            </div>
            </>
        )
    )
}

export default ProtectedRoute;