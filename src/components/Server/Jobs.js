import React, { useEffect, useState } from 'react';
import { 
  getJobsAPI, 
  getJobByIdAPI, 
  getRelatedJobsAPI, 
  getCompanyJobsAPI 
} from './apiConstants';

export async function getJobs() {
  const response = await fetch(getJobsAPI);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function getJobById(jobId) {
  const url = `${getJobByIdAPI}/${jobId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function getRelatedJobs() {
  const response = await fetch(getRelatedJobsAPI);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function getCompanyJobs() {
  const response = await fetch(getCompanyJobsAPI);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export default function DataFetcher({ fetchFunction, onDataFetched }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFunction()
      .then((jsonData) => {
        setData(jsonData);
        onDataFetched(jsonData); // Pass the fetched data to the callback
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [fetchFunction, onDataFetched]);

  return null;
}
