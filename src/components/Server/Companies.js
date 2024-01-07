import axios from "axios";
import { getCompaniesAIP } from "./apiConstants";

export async function getCompanies(token) {
  try {
    const response = await axios.get(getCompaniesAIP, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching job applications: ${error.message}`);
  }
}
