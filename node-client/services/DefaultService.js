/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* list institutions
*
* institutionsSearchPostRequest InstitutionsSearchPostRequest 
* pLAIDCLIENTID String  (optional)
* pLAIDSECRET String  (optional)
* returns _institutions_search_post_200_response
* */
const institutionsSearchPOST = ({ institutionsSearchPostRequest, pLAIDCLIENTID, pLAIDSECRET }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        institutionsSearchPostRequest,
        pLAIDCLIENTID,
        pLAIDSECRET,
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
