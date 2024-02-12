import axios from 'axios';

const getElections = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/election')
        return res.data
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

/**
 * @param {object} data
 * returns a new election
 * @returns {object} election
 */
const createElection = async (data) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/create_election', data)
        return res.data
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

const getElection = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/election/${id}`)
        return res.data;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

export { getElections, createElection, getElection }
