import http from './httpServices'
import {
    apiUrl
} from '../config.json'
import decode from "jwt-decode";

const jwtToken = "token"

export function getCurrentUser() {
    try {
        const user = decode(localStorage.getItem(jwtToken));
        return user
    } catch (error) {
        return null
    }
}

export function loginWithJwt(token) {
    localStorage.setItem(jwtToken, token)
}

export function removeToken() {
    localStorage.removeItem("token");
}

function getUrl(endpoint) {
    return `${apiUrl}auth/${endpoint}`
}

export async function login(data) {
    return await http.post(getUrl("signin"), data)
}

export async function register(data) {
    return await http.post(getUrl("create-user"), data)
}

export function getJwt() {
    return localStorage.getItem("token")
}

export default {
    login,
    register,
    loginWithJwt,
    getCurrentUser
}