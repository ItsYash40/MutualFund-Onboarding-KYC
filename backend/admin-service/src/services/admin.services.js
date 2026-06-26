const axios =
require("../config/axios");


const getDashboardStats = async () => {

  const response = await axios.get(
    `${BASE_URL}/kyc-status`
  );

  const data = response.data;

  return {
    total: data.length,

    pending: data.filter(
      (k) => k.status === "PENDING"
    ).length,

    approved: data.filter(
      (k) => k.status === "APPROVED"
    ).length,

    rejected: data.filter(
      (k) => k.status === "REJECTED"
    ).length,
  };
};



const getPendingKyc = async () => {

  const response = await axios.get(
    `${BASE_URL}/kyc-status`
  );

  return response.data.filter(
    (kyc) => kyc.status === "PENDING"
  );
};

const getApprovedKyc = async () => {

  const response = await axios.get(
    `${BASE_URL}/kyc-status`
  );

  return response.data.filter(
    (kyc) => kyc.status === "APPROVED"
  );
};

const getRejectedKyc = async () => {

  const response = await axios.get(
    `${BASE_URL}/kyc-status`
  );

  return response.data.filter(
    (kyc) => kyc.status === "REJECTED"
  );
};

const searchUsers = async (
  searchText
) => {

  const response = await axios.get(
    `${BASE_URL}/kyc-status`
  );

  return response.data.filter(
    (user) =>
      user.fullName
        ?.toLowerCase()
        .includes(
          searchText.toLowerCase()
        )
  );
};

const getKycDetails = async (kycId) => {

  const response = await axios.get(
    `${BASE_URL}/${kycId}`
  );

  return response.data;
};

const approveKyc = async (kycId) => {

  const response = await axios.post(
    `${BASE_URL}/${kycId}/approve`
  );

  return response.data;
};

const rejectKyc = async (
  kycId,
  reason
) => {

  const response = await axios.post(
    `${BASE_URL}/${kycId}/reject`,
    {
      reason,
    }
  );

  return response.data;
};

module.exports = {
  getPendingKyc,
  getApprovedKyc,
  getRejectedKyc,
  getKycDetails,
  approveKyc,
  rejectKyc,
  getDashboardStats,
  searchUsers,
};