import axios from "axios";

const getElections = async (id) => {
  try {
    const res = await axios.get(
      `https://api.pollmaster.me/api/v1/admin/${id}/election`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

/**
 * @param {object} data
 * returns a new election
 * @returns {object} election
 */
const createElection = async (data) => {
  try {
    const res = await axios.post(
      "https://api.pollmaster.me/api/v1/create_election",
      data
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const getElection = async (id) => {
  try {
    const res = await axios.get(`https://api.pollmaster.me/api/v1/election/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const updateElection = async (admin_id, election_id, data) => {
  try {
    const res = await axios.put(
      `https://api.pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}`,
      data
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const updateCandidate = async (admin_id, election_id, candidate_id, data) => {
  try {
    const res = await axios.put(
      `https://api.pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/candidate/${candidate_id}`,
      data
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const deleteCandidate = async (admin_id, election_id, candidate_id) => {
  try {
    const res = await axios.delete(
      `https://api.pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/candidate/${candidate_id}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
export {
  getElections,
  createElection,
  getElection,
  updateElection,
  updateCandidate,
  deleteCandidate,
};
