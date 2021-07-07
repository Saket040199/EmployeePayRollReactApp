import React from 'react';
import './home-page.css';
import addIcon from '../../assets/icons/add_white_24dp.svg';
import searchIcon from '../../assets/icons/search_black_24dp.svg';
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';
import EmployeeList from '../employee-list/employee-list';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allEmployeeArray:[],
            employeeArray: [],
        };
        this.employeeService = new EmployeeService();
    }



    componentDidMount() {
        this.employeeService.getAllEmployees()
            .then(responseData => {
                  this.setState({allEmployeeArray: responseData.data});
                this.setState({ employeeArray: responseData.data });
            }).catch(error => {
                console.log("Error while fetching Employee List\nError : " + JSON.stringify(error));
            })

    }


    search = async (event) => {
        let searchName = event.target.value;
        await this.setState({ employeeArray: this.state.allEmployeeArray });
        let employeeList = this.state.employeeArray;
        if (searchName.trim().length > 0)
            employeeList = employeeList.filter((employee) =>
                employee.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1);
        this.setState({ employeeArray: employeeList });
    }

  render() {
    return (
        <div className="body">
            <div className="main-content">
                <div className="header-content">
                    <div className="heading">
                        Employee Details 
                        <div className="emp-count">
                            {this.state.employeeArray.length}
                        </div>
                    </div>
                    <div className="search-box" onClick={this.openSearch}>
                        <input className={"search-input " + (this.state.searchExpand && "input-expand")}
                            onChange={this.search} type="text" placeholder="" />
                        <img className="search-icon" src={searchIcon} alt="Search Icon" />
                    </div>
                    <Link to="payroll-form" className="add-button">
                        <img src={addIcon} alt="Add Button" />Add User
                    </Link>
                </div>
                <div className="table-main">
                    <EmployeeList employeeArray={this.state.employeeArray} />
                </div>
            </div>
        </div>
    );
  }
}
export default HomePage;