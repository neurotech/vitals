'use strict';

var got = require('got');
var Table = require('cli-table');
var logSymbols = require('log-symbols');

var table = new Table({
  style: {
    head: ['yellow'],
    border: ['grey']
  }
});

var edumate = process.env.EDUMATE_HOST + '/' + process.env.EDUMATE_PATH.toLowerCase();
var exchange = process.env.CANVAS_API_DOMAIN;

var up = logSymbols.success;
var down = logSymbols.error;

Promise.all([
  // Edumate
  got.head(`https://${edumate}`)
    .then(data => {
      table.push({ 'Edumate': [up] });
    })
    .catch(error => {
      table.push({ 'Edumate': [down] });
    }),

  // Exchange
  got(`https://${exchange}`)
    .then(data => {
      table.push({ 'Exchange': [up] });
    })
    .catch(error => {
      table.push({ 'Exchange': [down] });
    })
]).then(function () {
  console.log(table.toString());
});
