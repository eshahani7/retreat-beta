import React, { Component } from 'react';
import { Button, FormGroup, Form, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import '../stylesheets/form.css';
import '../stylesheets/CreatePool.css';

import { createPool } from '../actions/poolActions.js';

import FormField from './components/FormField.js';
import SubmitBtn from './components/SubmitBtn.js';
import LoginControl from './components/LoginControl.js';

const Loading = require('react-loading-animation');

const mapStateToProps = (state ) => {
  return {
    creating: state.pool.creating,
    created: state.pool.created,
    createFailed: state.pool.createFailed
  }
}

function generateImage(){
  var imgUrl = "../../img/RoomPhotos/room";
  var num = Math.floor(Math.random() * (9)) + 1;
  imgUrl+= ( num + ".jpg");

  return imgUrl;
}

class CreatePool extends Component {
  state = {
    location:'',
    startDate: moment(),
    endDate: moment(new Date()).add(1,'days'),
    minPeople:'',
    goal:null,
    themes:[],
    gender:'',
    minAge:null,
    maxAge:null,
    image: generateImage()
  };

  //-----------------------EVENT HANDLERS----------------------//
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }
  handleChangeStart(date) {
    this.setState({
     startDate: date
    });
    console.log(this.state.startDate);
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    console.log(this.state.endDate);
  }
  handleChangeTheme(data) {
    console.log(data);
    var submittedThemes = [];
    for (var i = 0; i < data.length; i++){
      submittedThemes[i] = data[i].value;
      console.log(submittedThemes[i]);
    }
    this.setState({ themes: submittedThemes });
    console.log(this.state.themes);
  }
  handleChangeGender(data) {
    if(data == null){
      this.setState({gender: null});
    }
    else{
      this.setState({gender: data.value });
      console.log(this.state.gender);
    }
  }
  handleChangeLoc(data) {
    console.log(data);
    if(data == null){
      this.setState({location: null});
    }
    else{
      this.setState({location: data.value });
      console.log(this.state.location);
    }
  }

  //----------------------DISPATCH ACTION----------------------------//
  addNewPool(e) {
    e.preventDefault();
    var pool = this.state;
    pool.startDate = pool.startDate.toDate();
    console.log("Start Date: " + typeof pool.startDate + " " + pool.startDate);
    pool.endDate = pool.endDate.toDate();
    this.props.dispatch(createPool(pool));
    console.log(pool);
  }

  //----------------------REACT COMPONENTS---------------------------//
  render() {
    const locationOptions = [
      { value: 'Tokyo', label: 'Tokyo'},
      { value: 'Paris', label: 'Paris'},
      { value: 'Florence', label: 'Florence' }
    ];
    const themeOptions = [
      { value: 'Adventure', label: 'Adventure'},
      { value: 'Hiking', label: 'Hiking'}
    ];
    const genderOptions = [
      { value: 'F', label: 'F'},
      { value: 'M', label: 'M' }
    ];

    if(this.props.creating){
      return (
        <div className="CreatePool">
          <LoginControl/>
          <Row>
            <Col md={12} id="createPoolHeader">
              CREATE POOL
            </Col>
          </Row>
          <Form horizontal className="createPoolForm">
            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Location
              </Col>
              <Col sm={4}>
                <Select
                  name='location'
                  value={this.state.location}
                  options={locationOptions}
                  onChange={this.handleChangeLoc.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                From
              </Col>
              <Col sm={2}>
                <DatePicker name="startDate" selected={this.state.startDate}
                  onChange={this.handleChangeStart.bind(this)}/>
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                To
              </Col>
              <Col sm={2}>
                <DatePicker name="endDate" selected={this.state.endDate}
                  onChange={this.handleChangeEnd.bind(this)}/>
              </Col>
            </FormGroup>

            <FormField
              className= "createPoolField"
              title="Minimum travelers"
              type="number"
              holder="10"
              name="minPeople"
              change={this.handleChange.bind(this)}
            />

            <FormField
              className= "createPoolField"
              title="Goal: $"
              type="number"
              holder="300"
              name="goal"
              change={this.handleChange.bind(this)}
            />

            <Col sm={12} id="restrictionsHeader">
              RESTRICTIONS
            </Col>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Themes
              </Col>
              <Col sm={4}>
                <Select
                  name='themes'
                  value={this.state.themes}
                  options={themeOptions}
                  multi={true}
                  onChange={this.handleChangeTheme.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Gender
              </Col>
              <Col sm={4}>
                <Select
                  name='gender'
                  value={this.state.gender}
                  options={genderOptions}
                  onChange={this.handleChangeGender.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormField
              className= "createPoolField"
              title="Minimum Age"
              type="number"
              holder="18"
              name="minAge"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "createPoolField"
              title="Maximum Age"
              type="number"
              holder="25"
              name="maxAge"
              change={this.handleChange.bind(this)}
            />

            <SubmitBtn title="CREATE" id="createPoolButton" submit={this.addNewPool.bind(this)}/>
            <Loading/>
          </Form>
        </div>
      );
    }
    else if (this.props.created){
      return(
        <div className="CreatePool">
          <LoginControl/>
          <Row>
            <Col md={12} id="createPoolHeader">
              POOL CREATED!
            </Col>
          </Row>
        </div>
      );
    }
    else if (this.props.createFailed){
      <div className="CreatePool">
        <LoginControl/>
        <Row>
          <Col md={12} id="createPoolHeader">
            CREATE POOL FAILED. PLEASE TRY AGAIN
          </Col>
        </Row>
        <Form horizontal className="createPoolForm">
          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Location
            </Col>
            <Col sm={4}>
              <Select
                name='location'
                value={this.state.location}
                options={locationOptions}
                onChange={this.handleChangeLoc.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              From
            </Col>
            <Col sm={2}>
              <DatePicker name="startDate" selected={this.state.startDate}
                onChange={this.handleChangeStart.bind(this)}/>
            </Col>
            <Col componentClass={ControlLabel} sm={1}>
              To
            </Col>
            <Col sm={2}>
              <DatePicker name="endDate" selected={this.state.endDate}
                onChange={this.handleChangeEnd.bind(this)}/>
            </Col>
          </FormGroup>

          <FormField
            className= "createPoolField"
            title="Minimum travelers"
            type="number"
            holder="10"
            name="minPeople"
            change={this.handleChange.bind(this)}
          />

          <FormField
            className= "createPoolField"
            title="Goal: $"
            type="number"
            holder="300"
            name="goal"
            change={this.handleChange.bind(this)}
          />

          <Col sm={12} id="restrictionsHeader">
            RESTRICTIONS
          </Col>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Themes
            </Col>
            <Col sm={4}>
              <Select
                name='themes'
                value={this.state.themes}
                options={themeOptions}
                multi={true}
                onChange={this.handleChangeTheme.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Gender
            </Col>
            <Col sm={4}>
              <Select
                name='gender'
                value={this.state.gender}
                options={genderOptions}
                onChange={this.handleChangeGender.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormField
            className= "createPoolField"
            title="Minimum Age"
            type="number"
            holder="18"
            name="minAge"
            change={this.handleChange.bind(this)}
          />
          <FormField
            className= "createPoolField"
            title="Maximum Age"
            type="number"
            holder="25"
            name="maxAge"
            change={this.handleChange.bind(this)}
          />

          <SubmitBtn title="CREATE" id="createPoolButton" submit={this.addNewPool.bind(this)}/>
        </Form>
      </div>
    }
    else{
      return (
        <div className="CreatePool">
          <LoginControl/>
          <Row>
            <Col md={12} id="createPoolHeader">
              CREATE POOL
            </Col>
          </Row>
          <Form horizontal className="createPoolForm">
            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Location
              </Col>
              <Col sm={4}>
                <Select
                  name='location'
                  value={this.state.location}
                  options={locationOptions}
                  onChange={this.handleChangeLoc.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                From
              </Col>
              <Col sm={2}>
                <DatePicker name="startDate" selected={this.state.startDate}
                  onChange={this.handleChangeStart.bind(this)}/>
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                To
              </Col>
              <Col sm={2}>
                <DatePicker name="endDate" selected={this.state.endDate}
                  onChange={this.handleChangeEnd.bind(this)}/>
              </Col>
            </FormGroup>

            <FormField
              className= "createPoolField"
              title="Minimum travelers"
              type="number"
              holder="10"
              name="minPeople"
              change={this.handleChange.bind(this)}
            />

            <FormField
              className= "createPoolField"
              title="Goal: $"
              type="number"
              holder="300"
              name="goal"
              change={this.handleChange.bind(this)}
            />

            <Col sm={12} id="restrictionsHeader">
              RESTRICTIONS
            </Col>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Themes
              </Col>
              <Col sm={4}>
                <Select
                  name='themes'
                  value={this.state.themes}
                  options={themeOptions}
                  multi={true}
                  onChange={this.handleChangeTheme.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Gender
              </Col>
              <Col sm={4}>
                <Select
                  name='gender'
                  value={this.state.gender}
                  options={genderOptions}
                  onChange={this.handleChangeGender.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormField
              className= "createPoolField"
              title="Minimum Age"
              type="number"
              holder="18"
              name="minAge"
              change={this.handleChange.bind(this)}
            />
            <FormField
              className= "createPoolField"
              title="Maximum Age"
              type="number"
              holder="25"
              name="maxAge"
              change={this.handleChange.bind(this)}
            />

            <SubmitBtn title="CREATE" id="createPoolButton" submit={this.addNewPool.bind(this)}/>
          </Form>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(CreatePool);
