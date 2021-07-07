
import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -2.png';
import profile3 from '../../assets/profile-images/Ellipse -3.png';
import profile4 from '../../assets/profile-images/Ellipse 1.png';
import './payroll-form.scss';
import { Link, withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';


    const initialState = {
        name: '',
        profile: '',
        gender: '',
        department: [],
        salary: 400000,
        day: '1',
        month: 'Jan',
        year: '2021',
        startDate: new Date ("1 Jan 2021"),
        notes: '',

        id: '',
        isUpdate: false,
        isError: false,

        error: {
            department: '',
            name: '',
            gender: '',
            salary:'',
            profile: '',
            startDate: ''
        },
        valid: {
            department: '',
            name: '',
            gender: '',
            profile: '',
            startDate: ''
          }
    }

    class PayrollForm extends React.Component{

        constructor(props) {
            super(props)
            this.state = {
              name: '',
              profile: '',
              gender: '',
              department: [],    
              salary: 400000,
              day: '1',
              month: 'Jan',
              year: '2020',
              startDate: new Date("1 Jan 2021"),
              notes: '',
        
              id: '',      
              isUpdate: false,
              isError: false,
        
              error: {
                department: '',
                name: '',
                gender: '',
                profile: '',
                startDate: ''    
              },
              valid: {
                department: '',
                name: '',
                gender: '',
                profile: '',
                startDate: ''
              }
            }
            this.nameChangeHandler = this.nameChangeHandler.bind(this);
            this.profileChangeHandler = this.profileChangeHandler.bind(this);
            this.genderChangeHandler = this.genderChangeHandler.bind(this);
            this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
            this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
            this.dayChangeHandler = this.dayChangeHandler.bind(this);
            this.monthChangeHandler = this.monthChangeHandler.bind(this);
            this.yearChangeHandler = this.yearChangeHandler.bind(this);
            this.notesChangeHandler = this.notesChangeHandler.bind(this);
        }
        nameChangeHandler = (event) => {
            this.setState({name: event.target.value});
            this.checkName(event.target.value);
          }
          profileChangeHandler = (event) => {
            this.setState({profile: event.target.value});
            this.checkProfilePicture(event.target.value);
          }
          genderChangeHandler = (event) => {
            this.setState({gender: event.target.value});
            this.checkGender(event.target.value);
          }
          departmentChangeHandler = async (event) => {
            {if(event.target.checked) {
              await this.setState({department: this.state.department.concat(event.target.value)});
            }
            if (!event.target.checked) {
              let index = 0;
              let array = this.state.department;
              for (let i = 0; i < array.length; i++) {
                  if (array[i] === event.target.value) {
                      index = i;
                  }
              }
              array.splice(index, 1);
              await this.setState({ department: array });
            }}
            this.checkDepartment(this.state.department);
          }
          salaryChangeHandler = (event) => {
            this.setState({salary: event.target.value});    
          }
          dayChangeHandler = (event) => {
            this.setState({day: event.target.value});
            this.setStartDate(event.target.value, this.state.month, this.state.year);
          }
          monthChangeHandler = (event) => {
            this.setState({month: event.target.value});
            this.setStartDate(this.state.day, event.target.value, this.state.year);
          }
          yearChangeHandler = (event) => {
            this.setState({year: event.target.value});
            this.setStartDate(this.state.day, this.state.month, event.target.value);
          }
          notesChangeHandler = (event) => {
            this.setState({notes: event.target.value});
          }
          
          setStartDate = (day, month, year) => {
            let startDateValue = new Date(`${day} ${month} ${year}`);
            this.setState({startDate: startDateValue});
            this.checkStartDate(startDateValue);
          }
        
          initializeMessage = (field, errorMessage, validMessage) => {
            this.setState(previousState => ({
              error: {
                ...previousState.error,
                [field]: errorMessage
              }
            }));
            this.setState(previousState => ({
              valid: {
                ...previousState.valid,
                [field]: validMessage
              }
            }));
          }
          checkName = (nameValue) => {
            if(nameValue.length === 0) {
              this.initializeMessage('name', '');
            } else {
              const NAME_REGEX = RegExp("^[A-Z]{1}[a-zA-Z//s]{2,}$");
              if(NAME_REGEX.test(nameValue)) {
                this.initializeMessage('name', '');
              } else {
                this.initializeMessage('name', 'Name is Invalid!');
              }
            }
          }
          checkProfilePicture = (profilePictureValue) => {
            if(profilePictureValue.length === 0) {
              this.initializeMessage('profile', 'Profile Picture cannot be Blank!');
            } else {
              this.initializeMessage('profile', '');
            }
          }
          checkStartDate = (startDateValue) => {
            let now = new Date();
            let difference = Math.abs(now.getTime() - startDateValue.getTime());
            if (startDateValue > now) {
                this.initializeMessage('startDate', 'Start Date is a Futute Date!');
            } else {
                this.initializeMessage('startDate', '');
            }
        }
          checkDepartment = (departmentValue) => {
            if(departmentValue.length === 0) {
              this.initializeMessage('department', 'Employee must belong to atleast one Department!');
            } else {
              this.initializeMessage('department', '');
            }
          }
          checkGender = (genderValue) => {
            if(genderValue.length === 0) {
              this.initializeMessage('gender', 'Gender is a Required Field!');
            } else {
              this.initializeMessage('gender', '');
            }
          }
          checkGlobalError = () =>{
            if(this.state.error.name.length === 0 && this.state.error.department.length === 0 && this.state.error.gender.length === 0 
              && this.state.error.profile.length === 0 && this.state.error.startDate.length === 0) {
                this.setState({isError: false});
              } else {
                this.setState({isError: true});
              }
          }
        
          checkValidations = async () => {
            await this.checkName(this.state.name);
            await this.checkProfilePicture(this.state.profile);
            await this.checkStartDate(this.state.startDate);
            await this.checkDepartment(this.state.department);
            await this.checkGender(this.state.gender);
            await this.checkGlobalError();
            return (this.state.isError);
          }

     save = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        saveOperation: {         
          if(await this.checkValidations()) {
            let errorLog = JSON.stringify(this.state.error);
            alert("Error Occured while Submitting the Form ==> ERROR LOG : " + errorLog);
            break saveOperation;
          }
          let object = {
            id: this.state.id,
            name: this.state.name,
            profile: this.state.profile,
            gender: this.state.gender,
            department: this.state.department,
            salary: this.state.salary,
            startDate: this.state.startDate,
            note: this.state.note
          }
          new EmployeeService().addEmployee(object)
          .then(data => {
              console.log("DATA ADDED SUCCESSFULLY");
              alert("Employee Added Successfully!!!\n" + JSON.stringify(data))
              this.props.history.push("home");
          }).catch(error => {
            alert("Error while adding Employee!!!\nError : " + error);
          })
          this.reset();
        
        }
    }
      reset = () => {
        this.setState({ ...initialState });
     }
 render(){
    return (
    <div className="body">
    <div className="form-content">
    <form className="form" action="#" onSubmit={this.save} onReset={this.reset}>
        <div className="form-head">
            Employee Payroll Form
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="name">Name</label>
            <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={this.nameChangeHandler}
                   placeholder="Your name..Please give a space between your name and sername" required />
                   <valid-message className="valid-name" htmlFor="name">{this.state.valid.name}</valid-message>
                   <error-output className="error-text-output" htmlFor="name">{this.state.error.name}</error-output>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="profile">Profile image</label>
            <div className="profile-radio-content">
                <label>
                    <input type="radio" id="profile1" name="profile"
                           value='../../assets/profile-images/Ellipse -1.png'
                           checked={this.state.profile === '../../assets/profile-images/Ellipse -1.png'} onChange={this.profileChangeHandler} required />
                    <img className="profile" id="image1" src={profile1} />
                </label>
                <label>
                    <input type="radio" id="profile2" name="profile"
                           value='../../assets/profile-images/Ellipse -2.png'
                           checked={this.state.profile === '../../assets/profile-images/Ellipse -2.png'} onChange={this.profileChangeHandler} required />
                    <img className="profile" id="image2" src={profile2} />
                </label>
                <label>
                    <input type="radio" id="profile3" name="profile"
                           value='../../assets/profile-images/Ellipse -3.png' checked={this.state.profile === '../../assets/profile-images/Ellipse -3.png'} onChange={this.profileChangeHandler} required />
                    <img className="profile" id="image3" src={profile3}/>
                </label>
                <label>
                    <input type="radio" id="profile4" name="profile"
                           value='../../assets/profile-images/Ellipse 1.png' checked={this.state.profile === '../../assets/profile-images/Ellipse 1.png'} onChange={this.profileChangeHandler} required/>
                    <img className="profile" id="image4" src={profile4}/>
                </label>
            </div>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="gender">Gender</label>
            <div>
                <input type="radio" id="male" name="gender" value= "male" onChange={this.genderChangeHandler}/>
                <label className="text" htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" onChange={this.genderChangeHandler}/>
                <label className="text" htmlFor="female">Female</label>
            </div>
            <valid-message className="valid-gender" htmlFor="gender">{this.state.valid.gender}</valid-message>
            <error-output className="gender-error" htmlFor="gender">{this.state.error.gender}</error-output>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="department">Department</label>
            <div>
                <input className="checkbox" type="checkbox" id="hr" name="department" onChange={this.departmentChangeHandler}  value="HR"/>
                <label className="text" htmlFor="hr">HR</label>
                <input className="checkbox" type="checkbox" id="sales" name="department" onChange={this.departmentChangeHandler} value="Sales"/>
                <label className="text" htmlFor="sales">Sales</label>
                <input className="checkbox" type="checkbox" id="finance" name="department" onChange={this.departmentChangeHandler}  value="Finance"/>
                <label className="text" htmlFor="finance">Finance</label>
                <input className="checkbox" type="checkbox" id="engineer" name="department" onChange={this.departmentChangeHandler}  value="Engineer"/>
                <label className="text" htmlFor="engineer">Engineer</label>
                <input className="checkbox" type="checkbox" id="others" name="department" onChange={this.departmentChangeHandler} value="Others"/>
                <label className="text" htmlFor="others">Others</label>
            </div>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="salary">Choose your salary</label>
            <input className="input" type="range" name="salary" id="salary" onChange={this.salaryChangeHandler}
                min="300000" max="500000" step="100"  value={this.state.salary}/>
            <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="startDate"> Start Date</label>
            <div>
                <select id="day" name="Day" value={this.state.day} onChange={this.dayChangeHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </select>
                <select id="month" name="Month" value={this.state.month} onChange={this.monthChangeHandler}>
                    <option value="Jan">January</option>
                    <option value="Feb">Febuary</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="Aug">August</option>
                    <option value="Sept">September</option>
                    <option value="Oct">October</option>
                    <option value="Nov">November</option>
                    <option value="Dec">December</option>
                </select>
                <select id="year" name="Year" value={this.state.year} onChange={this.yearChangeHandler}>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                </select>
            </div>
            <valid-message className="valid-startDate" htmlFor="startDate">{this.state.valid.startDate}</valid-message>
            <error-output className="startDate-error" htmlFor="startDate">{this.state.error.startDate}</error-output>
        </div>
        <div className="row-content">
            <label className="label text" htmlFor="notes">Notes</label>
            <textarea id="notes" className="input note" name="notes" value={this.state.notes} onChange={this.notesChangeHandler} placeholder="Write about yourself.."></textarea>
        </div>
        <div className="button-content">
            <Link to=''  id="cancelButton" className=" button cancelButton">Cancel</Link>
            <div className="submit-reset">
                <button type="submit" className="button submitButton"  id="submitButton">{this.state.isUpdate ? 'Update' : 'Submit'}</button>
                <button type="reset"  className="resetButton button">Reset</button>
            </div>
        </div>
    </form>
    </div>
    </div>
   );
 }

}

export default withRouter(PayrollForm);
