import React, { Component } from 'react';
import { Row, Col, Panel, FormControl, ControlLabel, Button, FormGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../stylesheets/form.css';
import '../../stylesheets/querybox.css';

class QueryBox extends Component {
  state = {startDate: moment(), endDate: moment(new Date()).add(1,'days'), minPeople:3, maxPeople:5};

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
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  render() {
    return(
      <Panel id="QueryPanel">
        <Form horizontal className="queryForm">
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Dates
            </Col>
            <Col sm={6}>
              <DatePicker name="startDate" selected={this.state.startDate}
                onChange={this.handleChangeStart.bind(this)}/>
              to
              <DatePicker name="endDate" selected={this.state.endDate}
                onChange={this.handleChangeEnd.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Gender
            </Col>
            <Col sm={6}>
              <FormControl componentClass="select" placeholder="select">
                <option value="other">N/A</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Themes
            </Col>
            <Col sm={6}>
              <FormControl componentClass="select">
                <option value="other">N/A</option>
                <option value="M">Adventure</option>
                <option value="F">Business</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={6}>
              <Button type="submit">
                Search
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default QueryBox;
