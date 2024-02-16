import axios from 'axios'

const createUser = async (data) => {
    try {
        const res = await axios.post('http://api.pollmaster/api/v1/sign_up', data)
        return res.data
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

const signIn = async (data) => {
    try {
        const res = await axios.post('http://api.pollmaster/api/v1/sign_in', data)
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        return res.data
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

const logOut = (cb) => {
    localStorage.removeItem('user')
    cb()
}

const isAuthenticated = () => {
    const user = localStorage.getItem('user')
    if (!user) {
        return false
    }
    return true
}

const getUser = () => {
    
    return typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))
}

export {createUser, signIn, isAuthenticated, logOut, getUser};