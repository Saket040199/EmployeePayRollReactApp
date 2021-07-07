import React from 'react';
import './employee-list.css';
import deleteIcon from '../../assets/icons/delete_black_24dp.svg';
import editIcon from '../../assets/icons/edit_black_24dp.svg';
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -2.png';
import profile3 from '../../assets/profile-images/Ellipse -3.png';
import profile4 from '../../assets/profile-images/Ellipse 1.png';
import { withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';

const EmployeeList = (props) => {

    const edit = (id) => {
        console.log(id);
        props.history.push(`payroll-form/${id}`);
    }

    const remove = (id) => {        
        new EmployeeService().deleteEmployee(id).then(responseText => {
        console.log(responseText);
        window.location.reload();
        //this.props.history.push("/home");
        }).catch(error => {
         // alert("Error occurred while deleting the Employee!!!"+error);
        })
       
    }
    return (
        <table id="display" className="table">
            <tbody>

                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray.map((employee) => (
                        <tr key={employee.employeePayrollId}>
                            <td><img src={handleProfilePicture(employee.profile)} alt="" /></td>
                            <td>{employee.name}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.department &&
                                  employee.department.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                            <td> ₹ {employee.salary}</td>
                            <td>{stringifyDate(employee.startDate)}</td>
                            <td><img className="deleteIcon" src={deleteIcon} onClick={() => remove(employee.employeePayrollId)} alt="delete" />
                                <img  className="editIcon" src={editIcon} onClick={() => edit(employee.employeePayrollId)} alt="edit" /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const profiles = ["../../assets/profile/Ellipse -1.png", "../../assets/profile/Ellipse -2.png",
    "../../assets/profile/Ellipse -3.png", "../../assets/profile/Ellipse 1.png"];

const handleProfilePicture = (profilePicturePath) => {
    let index;
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i] === profilePicturePath) {
            index = i;
        }
    }
    switch (index) {
        case 0: return profile1;
        case 1: return profile2;
        case 2: return profile3;
        case 3: return profile4;
        default: return null;

    }
}

export default withRouter(EmployeeList);
