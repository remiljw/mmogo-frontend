import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_RESET_REQUEST,
  USER_RESET_REQUEST_SUCCESS,
  USER_RESET_REQUEST_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,
  USER_ACTIVATE_FAIL,
  USER_CONFIRM_RESET_REQUEST,
  USER_CONFIRM_RESET_SUCCESS,
  USER_CONFIRM_RESET_FAIL,
} from "../constants/userConstants";

const url = "https://mmogo-assessment.herokuapp.com";
// const url = "http://localhost:8000";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/auth/token/login/`,
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("lmUserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response 
        && error.response.data.message
          ? error.response.data
          : error.response.data.non_field_errors
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("lmUserInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

export const register = (username, email,  password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/auth/users/`,
      {
        username: username,
        email: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: 'Registration Successful, Check your email to activate your account',
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.username || error.response.data.email || error.response.data.password,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.auth_token}`,
      },
    };
    const { data } = await axios.get(`${url}/auth/users/me/`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const reset = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${url}/auth/users/reset_password/`, 
    {
      email: email,
    }, config);

    dispatch({
      type: USER_RESET_REQUEST_SUCCESS,
      payload: data + 'You will receive an email to reset your password if you have an account with us',
    });
  } catch (error) {
    dispatch({
      type: USER_RESET_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.email,
    });
  }
};

export const activate = (uid, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ACTIVATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/auth/users/activation/`,
      { uid, token },
      config
    );

    dispatch({
      type: USER_ACTIVATE_SUCCESS,
      payload: data + 'Account Activated. You will be redirected to the login page',
    });
  } catch (error) {
    dispatch({
      type: USER_ACTIVATE_FAIL,
      payload:
        error.response 
        && error.response.data.message
          ? error.response.data
          : error.response.data.token || error.response.data.uid
    });
  }
};

export const confirm_reset = (uid, token, new_password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CONFIRM_RESET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/auth/users/reset_password_confirm/`,
      { uid, token, new_password },
      config
    );

    dispatch({
      type: USER_CONFIRM_RESET_SUCCESS,
      payload: data + 'Password Reset Successful',
    });
  } catch (error) {
    dispatch({
      type: USER_CONFIRM_RESET_FAIL,
      payload:
        error.response 
        && error.response.data.message
          ? error.response.data
          : error.response.data.new_password || error.response.data.token
    });
  }
};