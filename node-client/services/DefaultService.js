/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* list institutions
*
* institutionsSearchPostRequest InstitutionsSearchPostRequest 
* returns _institutions_search_post_200_response
* */
const institutionsSearchPOST = ({ institutionsSearchPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        institutionsSearchPostRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  institutionsSearchPOST,
};
