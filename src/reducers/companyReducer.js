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

export const listFavoritesReducer = (state = { allFavorites: [], }, action) => {
  switch (action.type) {
    case FAVORITES_LIST_REQUEST:
      return { loading: true };
    case FAVORITES_LIST_SUCCESS:
      return {
        loading: false,
        allFavorites: action.payload,
      };
    case FAVORITES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listCompaniesReducer = (state = { allCompanies: [], }, action) => {
  switch (action.type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, };
    case COMPANY_LIST_SUCCESS:
      return {
        loading: false, allCompanies: action.payload,
      };
    case COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAVORITES_CREATE_REQUEST:
      return { loading: false, };
    case FAVORITES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload
      };
    case FAVORITES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAVORITES_DELETE_REQUEST:
      return { loading: false };
    case FAVORITES_DELETE_SUCCESS:
      return {loading: false, success: true, message: action.payload,
      };
    case FAVORITES_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};