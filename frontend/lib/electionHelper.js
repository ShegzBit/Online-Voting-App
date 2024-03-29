import axios from "axios";

const getElections = async (id) => {
  try {
    const res = await axios.get(
      `https://pollmaster.me/api/v1/admin/${id}/election`
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
      "https://pollmaster.me/api/v1/create_election",
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
    const res = await axios.get(`https://pollmaster.me/api/v1/election/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const updateElection = async (admin_id, election_id, data) => {
  try {
    const res = await axios.put(
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}`,
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
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/candidate/${candidate_id}`,
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
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/candidate/${candidate_id}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const deleteElection = async (admin_id, election_id) => {
  try {
    const res = await axios.delete(
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const addCandidateImage = async (data) => {
  try {
    const res = await axios.post(
      `https://api.shuttersync.live/api/photo`,
      data,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        }
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
}


const endElection = async (admin_id, election_id) => {
  try {
    const res = await axios.put(
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/end`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }

}

const deleteVoter = async (admin_id, election_id, data) => {
  try {
    const res = await axios.delete(
      `https://pollmaster.me/api/v1/admin/${admin_id}/election/${election_id}/voters_id`, {
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )

      return res.data
  } catch (e) {
    console.log(e);
    throw Error(e)
  }
}

const getVoters = async (id) => {
  try {
    const res = await axios.get(`https://pollmaster.me/api/v1/election/${id}/voters`);
    return res.data
  } catch(e) {
    console.log(e);
    throw Error(e)
  }
}

const vote = async (electionId, data) => {
  try {
    const res = await axios.post(`https://pollmaster.me/api/v1/election/${electionId}/vote`, data);
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }

}

const getResults = async (id) => {
  try {
    const res = await axios.get(`https://pollmaster.me/api/v1/election/${id}/result`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }

}
export {
  getElections,
  createElection,
  getElection,
  updateElection,
  updateCandidate,
  deleteCandidate,
  deleteElection,
  addCandidateImage,
  endElection,
  deleteVoter,
  getVoters,
  vote,
  getResults
};
