import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userResetReducer,
  userActivateReducer,
  userConfirmResetReducer,
} from "./reducers/userReducers";
import {
  listCompaniesReducer,
  listFavoritesReducer,
  addFavoriteReducer,
  deleteFavoriteReducer,
} from "./reducers/companyReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userReset: userResetReducer,
  userActivate: userActivateReducer,
  userChange: userConfirmResetReducer,
  listCom: listCompaniesReducer,
  listFav: listFavoritesReducer,
  addFav: addFavoriteReducer,
  deleteFav: deleteFavoriteReducer,
});

const userInfoFromStorage = localStorage.getItem("lmUserInfo")
  ? JSON.parse(localStorage.getItem("lmUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
