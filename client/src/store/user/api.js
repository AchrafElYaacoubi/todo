import axios from 'axios';
import {  getApiBaseUrl  } from'../../utils/api';
import axiosInstance from '../../utils/axiosInstance';

const BASE_URL = getApiBaseUrl();

export function userLogin(data) {
    return axios.post(`${BASE_URL}/login`, data);
}

export function userSignup(data) {
    return axios.post(`${BASE_URL}/signup`, data);
}
