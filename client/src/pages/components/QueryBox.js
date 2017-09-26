import React, { Component } from 'react';
import { Row, Col, Panel, FormControl, ControlLabel, Button, FormGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import '../../stylesheets/form.css';
import '../../stylesheets/querybox.css';

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === '') {
      delete obj[propName];
    }
    else if(Array.isArray(obj[propName]) && obj[propName].length == 0) {
      delete obj[propName];
    }
  }
}

class QueryBox extends Component {
  state = {startDate: moment(), endDate: moment(new Date()).add(1,'days'), gender:'', themes:[]};

  handleChangeStart(date) {
   this.setState({
     startDate: date
   });
  }
  handleChangeEnd(date) {
   this.setState({
     endDate: date
   });
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
  onSubmit(e) {
    e.preventDefault();
    var query = {
      location: this.props.location,
      gender: this.state.gender,
      themes: this.state.themes,
      startDate: this.state.startDate.toDate(),
      endDate: this.state.endDate.toDate()
    }
    clean(query);
    console.log(query);
    this.props.search(query);
  }

  render() {
    const themeOptions = [
      { value: 'adventure', label: 'Adventure'},
      { value: 'hiking', label: 'Hiking'}
    ]
    const genderOptions = [
      { value: '', label: '-'},
      { value: 'F', label: 'F'},
      { value: 'M', label: 'M' }
    ]

    return(
      <Panel id="QueryPanel">
        <Form horizontal className="queryForm">
          <FormGroup>
            <Row componentClass={ControlLabel}>
              <Col sm={12} id="datePickerLabel">
                Dates
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <DatePicker name="startDate" selected={this.state.startDate}
                  onChange={this.handleChangeStart.bind(this)}/>
                <span className="control-label">to</span>
                <DatePicker name="endDate" selected={this.state.endDate}
                  onChange={this.handleChangeEnd.bind(this)}/>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={3} componentClass={ControlLabel} id="genderPickerLabel">
                Gender
              </Col>
              <Col sm={9} id="genderPicker">
                <Select
                  name='gender'
                  value={this.state.gender}
                  options={genderOptions}
                  onChange={this.handleChangeGender.bind(this)}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={3} componentClass={ControlLabel} id="themePickerLabel">
                Themes
              </Col>
              <Col sm={9} id="themePicker">
                <Select
                  name='themes'
                  value={this.state.themes}
                  options={themeOptions}
                  onChange={this.handleChangeTheme.bind(this)}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={12}>
                <Button id="queryButton" type="submit" onClick={this.onSubmit.bind(this)}>
                  SEARCH
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default QueryBox;
