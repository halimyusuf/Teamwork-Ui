import http from "./httpServices"
import {
    apiUrl
} from "../config.json"


export function getAllPosts() {
    return http.get(`${apiUrl}feeds`)
}

// ARTICLES
export function getArticles() {
    return http.get(`${apiUrl}articles`)
}

export function getArticle(id) {
    return http.get(`${apiUrl}articles/${id}`)
}

export function saveArticle(article) {
    if (article.id) {
        const articleClone = {
            ...article
        }
        delete articleClone.id
        return http.patch(`${apiUrl}articles/${article.id}`, articleClone)
    }
    return http.post(`${apiUrl}articles`, article)
}

export function deleteArticle(id) {
    return http.delete(`${apiUrl}articles/${id}`)
}

// SPAM
export function reportArticleSpam(id) {
    return http.patch(`${apiUrl}articles/${id}/spam`)
}

export function reportGifSpam(id) {
    return http.patch(`${apiUrl}gifs/${id}/spam`)
}


// GIF
export function getGifs() {
    return http.get(`${apiUrl}gifs`)
}
export function getGif(id) {
    return http.get(`${apiUrl}gifs/${id}`)
}

export function postGif(data) {
    return http.post(`${apiUrl}gifs`, data)
}

export function deleteGif(id) {
    return http.delete(`${apiUrl}gifs/${id}`)
}

// COMMENT
export function articleComment(id, data) {
    return http.post(`${apiUrl}articles/${id}/comment`, data)
}

export function gifComment(id, data) {
    return http.post(`${apiUrl}gifs/${id}/comment`, data)
}