import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styleFindEmployees from "./FindEmployees.module.css";
import Employees from "./Employees";

const FindEmployees = () => {
  return (
    <>
      <Header />

      <div className={`row`}>
        <div className={`col-sm-1`}></div>
        <div className={`col-sm-10 ${styleFindEmployees.data_container}`}>
          <div className={`${styleFindEmployees.sub_container}`}>
            <label for="search_employee" style={{ fontSize: "24px" }}>
              Search our database for potential an employee
            </label>
            <br />
            <input
              type="text"
              className={`${styleFindEmployees.search_employee}`}
            />
            <button className={`${styleFindEmployees.search_employee_btn}`}>
              <span className="fas fa-search"></span> Search
            </button>
            <br />
            <span
              className={`err ${styleFindEmployees.err_search_employee}`}
            ></span>
          </div>
          <div className={`${styleFindEmployees.sub_container}`}>
            <div className={`${styleFindEmployees.inner_container}`}>
              <div className={`${styleFindEmployees.inner_header}`}>
                <p>People who are on the lookout for jobs</p>
              </div>
              <div className={`${styleFindEmployees.inner_header}`}>
                <select>
                  <option value="name">Name</option>
                  <option value="school">Complted High School</option>
                  <option value="tertiary">Complted Tertiary</option>
                  <option value="profile">Profile completed</option>
                </select>
                <span>
                  <span className="fas fa-filter"></span>
                </span>
              </div>
            </div>
            <div className={`${styleFindEmployees.inner_container}`}>
              <table>
                <colgroup>
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                  <col span="1" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Completed High School</th>
                    <th>Completed Tertiary</th>
                    <th>Documents</th>
                    <th>Resume Complete</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                  {/* {jobApplications.map((employee, index) => (
                    <Employees key={index} employee={employee} />
                  ))} */}

                  <tr>
                    <td>1</td>
                    <td>Clementine Mamo</td>
                    <td>clementine@mail.com</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a href={`./resume`} target="_blank">
                        View CV
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>John Doe</td>
                    <td>0712344532</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a href={`./resume`} target="_blank">
                        View CV
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob Smith</td>
                    <td>smith.bobe@gmail.com</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <a href={`./resume`} target="_blank">
                        View CV
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>

      <Footer />
    </>
  );
};

export default FindEmployees;
