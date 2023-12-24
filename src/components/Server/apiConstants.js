export const appBaseURL = "https://localhost:3000/";
const serverBaseURL = "https://localhost:5001/api/v1";
// jobs
const jobsBaseURL = serverBaseURL + "/jobs";
export const getJobsAPI = jobsBaseURL + "?action=";
export const getJobByIdAPI = jobsBaseURL;
export const getJobByIdAdminAPI = jobsBaseURL + "/admin";
export const getRelatedJobsAPI = jobsBaseURL + "/related/";
export const getCompanyJobsAPI = jobsBaseURL + "/company/";
export const getApplyForAJobAPI = jobsBaseURL + "/applications";
// users
const usersBaseURL = serverBaseURL + "/users";
export const loginAPI = usersBaseURL + "/login";
export const refreshAPI = usersBaseURL + "/login";
export const signupAPI = usersBaseURL + "/signup";
export const profileAPI = usersBaseURL + "/profile";
export const forgotPasswordAPI = usersBaseURL + "/forgot-passwpord";

//contuct us
export const contactUs = usersBaseURL + "/contact-us";
