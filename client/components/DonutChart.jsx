import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import getCategories from '../../both/getCategories.js';

function _randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
};

var DoughnutChart = require("react-chartjs").Doughnut;

function filterByCatLab(obj, cat, lab) {
  if (obj[cat] == lab) {
    return true;
  } else {
    return false;
  }
};

export default class DonutChart extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "goal",
    }
  }

  changeCat() {
    var cat = this.refs.category.value;
    this.setState({category: cat})
  }

  render() {
    var bucket = this.props.bucket;
    var cat = this.state.category;
    var ents = this.props.ents;

    var labels = getCategories(bucket)[cat];

    console.log(ents);

    var colors = labels.map(() => {return _randomColor()});

    function numLab(lab) {
      arr = ents.filter((obj) => {return obj[cat] == lab});
      return arr.length;
    };

    function labToSlice(lab) {
      return {
        value: numLab(lab),
        color: _randomColor(),
        highlight: _randomColor(),
        label: lab
      }
    };

    var chartData = labels.map((lab) => {return labToSlice(lab)});

    var chartOptions = {
        animation: true,
        responsive: true
    }

    console.log(chartData);

    if(ents.length) {
      if(bucket == 'startup') {
        return (
          <div>
            <DoughnutChart data={chartData} options={chartOptions}/>
            <select ref="category" onChange={this.changeCat.bind(this)}>
              <option value="goal">Goal</option>
              <option value="lob">LOB</option>
              <option value="stage">Stage</option>
            </select>
          </div>
        )
      }
      else {
        return (
          <div>
            <DoughnutChart data={chartData} options={chartOptions}/>
            <select ref="category" onChange={this.changeCat.bind(this)}>
              <option value="goal">Goal</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
        )
      }
    }
    else {
      return (
        <div className="no-entities-chart">No Entities in this bucket!</div>
      )
    }
  }
}