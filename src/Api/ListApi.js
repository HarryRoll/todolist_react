import axios from "axios";
import React from 'react'

const createListApi = async(payload) => {
    try {
        const result = await axios.post(`https://todo.api.devcode.gethired.id/todo-items`, payload)
        return result
    } catch (error) {
        return await error.message
    }    
}


const editListApi = async(payload) => {
    try {
        const result = await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${payload.id}`, payload)
        return result
    } catch (error) {
        return await error.message
    }    
}

const deleteListApi = async(id) => {
    try {
        const result = await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
        return result
    } catch (error) {
        return await error.message
    }    
} 

export default {createListApi, deleteListApi, editListApi}
