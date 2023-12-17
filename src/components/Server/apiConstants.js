const baseURL = "http://127.0.0.1:5001/api/v1";
// jobs
const jobsBaseURL = baseURL + "/jobs";
export const getJobsAPI = jobsBaseURL + "?action=";
export const getJobByIdAPI = jobsBaseURL;
export const getJobByIdAdminAPI = jobsBaseURL + "/admin";
export const getRelatedJobsAPI = jobsBaseURL + "/related/";
export const getCompanyJobsAPI = jobsBaseURL + "/company/";
// users
const usersBaseURL = baseURL + "/users";
export const loginAPI = usersBaseURL + "/login";
export const refreshAPI = usersBaseURL + "/login";
export const signupAPI = usersBaseURL + "/signup";
export const profileAPI = usersBaseURL + "/profile";
export const forgotPasswordAPI = usersBaseURL + "/forgot-passwpord";
