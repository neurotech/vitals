#!/usr/bin/env node
'use strict';
var got = require('got');
var chalk = require('chalk');
var Table = require('tty-table');

var promises = [];
var rows = [];
var header = [
  {
    value: 'System',
    headerColor: 'yellow',
    color: 'white',
    align: 'center',
    width: 15
  },
  {
    value: 'Status',
    headerColor: 'yellow',
    color: 'white',
    align: 'center',
    width: 15,
    formatter: function (value) {
      if (value === 'up') {
        return chalk.green(value);
      } else {
        return chalk.red(value);
      }
    }
  }
];

var systems = [
  {
    name: 'Edumate',
    url: process.env.EDUMATE_HOST + '/' + process.env.EDUMATE_PATH.toLowerCase()
  },
  {
    name: 'Exchange',
    url: process.env.CANVAS_API_DOMAIN
  }
];

systems.forEach(function (value, index) {
  promises.push(
    got(`https://${value.url}`)
      .then(data => {
        rows.push([value.name, 'up']);
      })
      .catch(error => {
        if (error) {
          rows.push([value.name, 'down']);
        }
      })
  );
});

Promise.all(promises)
  .then(values => {
    var results = Table(header, rows, {
      borderStyle: 1,
      paddingBottom: 0,
      headerAlign: 'center',
      align: 'center',
      color: 'white'
    });
    console.log(results.render());
  });
