import axios from "axios";
import {
  FAVORITES_LIST_REQUEST,
  FAVORITES_LIST_SUCCESS,
  FAVORITES_LIST_FAIL,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  FAVORITES_CREATE_REQUEST,
  FAVORITES_CREATE_SUCCESS,
  FAVORITES_CREATE_FAIL,
  FAVORITES_DELETE_REQUEST,
  FAVORITES_DELETE_SUCCESS,
  FAVORITES_DELETE_FAIL,
} from "../constants/companyConstant.js";

// const url = "http://127.0.0.1:8000";
const url = "https://mmogo-assessment.herokuapp.com";

export const listFavorites = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVORITES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Token ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/favorites/`, config);
    dispatch({
      type: FAVORITES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAVORITES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Token ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/companies/`, config);
    dispatch({
      type: COMPANY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addFavorite = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVORITES_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.post(`${url}/api/fav/${id}/` , {}, config);

    dispatch({
      type: FAVORITES_CREATE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FAVORITES_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFavorite = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVORITES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.delete(
      `${url}/api/fav/${id}/`,
      config
    );
    dispatch({
      type: FAVORITES_DELETE_SUCCESS,
      payload: data + 'removed',
    });
    
  } catch (error) {
    dispatch({
      type: FAVORITES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
