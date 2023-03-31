import axios from 'axios'


const getActivity = async() => {
    try {
        const result = await axios.get('https://todo.api.devcode.gethired.id/activity-groups')
        return result.data
    } catch (error) {
        return await error.message
    }
}

const getOneActivity = async(id) => {
    try {
        const result = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const newActivity = async(payload) => {
    try {
        const result = await axios.post('https://todo.api.devcode.gethired.id/activity-groups', payload)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const editActivity = async(payload) => {
    try {
        const result = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${payload.id}`, payload)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const deletedActivity = async(id) => {
    try {
        const result = await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

export default {getActivity,newActivity,deletedActivity,getOneActivity,editActivity}
