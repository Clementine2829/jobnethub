import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  getJobsAPI,
  getJobByIdAPI,
  getRelatedJobsAPI,
  getCompanyJobsAPI,
  getJobByIdAdminAPI,
  getApplyForAJobAPI,
} from "./apiConstants";

export async function getJobs(action = "", page = 1) {
  const url = getJobsAPI + action + "&page=" + page;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getJobById(jobId, token, admin = false) {
  const url = admin
    ? `${getJobByIdAdminAPI}/${jobId}`
    : `${getJobByIdAPI}/${jobId}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      credentials: "include",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

// export async function applyForAJob(jobId) {
//   const url = getApplyForAJobAPI + jobId + "/apply";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}`,
//       credentials: "include",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return await response.json();
// }
export const applyForAJob = async (jobId) => {
  const url = `${getApplyForAJobAPI}${jobId}/apply`;
  try {
    const response = await axios.post(
      url,
      null, // No request payload in this example
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // Axios automatically parses JSON responses, so no need for response.json()
    return response.data;
  } catch (error) {
    // Axios automatically throws an error for non-2xx responses
    console.error("Network request failed:", error.message);
    throw new Error("Network response was not ok");
  }
};

export async function getRelatedJobs(categoryId) {
  const response = await fetch(getRelatedJobsAPI + "/" + categoryId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getCompanyJobs(companyId) {
  const response = await fetch(getCompanyJobsAPI + "/" + companyId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export const getJobApplications = async () => {
  try {
    const response = await axios.get(
      // getApplyForAJobAPI + "40896a558f798927270ccddf4703f44f3915a52fc2fe",
      getApplyForAJobAPI,
      {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching job applications: ${error.message}`);
  }
};
export default function DataFetcher({ fetchFunction, onDataFetched }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const jsonData = await fetchFunction();
        // Check if the component is still mounted before updating the state
        if (isMounted) {
          setData(jsonData);
          onDataFetched(jsonData); // Pass the fetched data to the callback
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [fetchFunction, onDataFetched]);

  return null;
}

// export default function DataFetcher({ fetchFunction, onDataFetched }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchFunction()
//       .then((jsonData) => {
//         setData(jsonData);
//         onDataFetched(jsonData); // Pass the fetched data to the callback
//       })
//       .catch((error) =>
//       // {
//       //   // do things with error
//       // })
//       console.error('Error fetching data: ', error));
//   }, [fetchFunction, onDataFetched]);

//   return null;
// }
