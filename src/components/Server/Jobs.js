import React, { useEffect, useState } from "react";

import {
  getJobsAPI,
  getJobByIdAPI,
  getRelatedJobsAPI,
  getCompanyJobsAPI,
  getJobByIdAdminAPI,
} from "./apiConstants";

export async function getJobs(action = "") {
  const response = await fetch(getJobsAPI + action);
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
