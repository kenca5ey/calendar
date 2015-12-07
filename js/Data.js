var Data = (function() {
  'use strict';


  var Data = function() {
    this.dates = {};
    this.currentDate = new Date();
    this.todayDate = this.currentDate.getDate();
    this.year = this.currentDate.getFullYear();
    this.month = this.currentDate.getMonth();
    this.daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.savedRecords = {};
    this.numSavedRecords = 0;


    this.init();

   
  };


  Data.prototype.init = function() {
    this.setMonthData(this.year, this.month);
    this.createBoardConf(42);
  };

  Data.prototype.setMonthData = function(year, month) {
    this.endOfLastMonth = new Date(year, month, 0);
    this.daysInLastMonth = this.endOfLastMonth.getDate();
    this.lastDayOfLastMonth = this.endOfLastMonth.getDay();
    if (this.lastDayOfLastMonth === 0) this.lastDayOfLastMonth = 7;
    this.endOfThisMonth = new Date(year, month + 1, 0);
    this.daysInThisMonth = this.endOfThisMonth.getDate();

    this.endOfNextMonth = new Date(year, month + 2, 0);
  };

  Data.prototype.refreshData = function(timeslot, direction) {
    if (timeslot === "year") {
      if (direction === "up") {
        this.year++;
        this.setMonthData(this.year, this.month);
        this.createBoardConf(42);
      } else {
        this.year--;
        this.setMonthData(this.year, this.month);
        this.createBoardConf(42);
      }
    } else {
      if (direction === "up") {
        this.month++;
        if (this.month > 11) {
          this.month = 0;
          this.year++;
        }
        this.setMonthData(this.year, this.month);
        this.createBoardConf(42);
      } else {
        this.month--;
        if (this.month < 0) {
          this.month = 11;
          this.year--;
        }
        this.setMonthData(this.year, this.month);
        this.createBoardConf(42);
      }
    }
  };

  Data.prototype.createBoardConf = function(num) {
    this.boardConf = {};
    this.boardConf.num = num;
    var i,j;
    j=0;
    var nextMonthLoops = num - this.lastDayOfLastMonth - this.daysInThisMonth;
    
    this.boardConf.yearTitleText = this.year;
    this.boardConf.monthTitleText = this.monthsOfYear[this.month];

    this.lastMonthDatesAppearing = {};
    this.thisMonthDatesAppearing = {};
    this.nextMonthDatesAppearing = {};
    this.visibleDates = {};
    this.setSurroundingMonthData();


    for (i = 0; i < this.lastDayOfLastMonth; i++) {
      this.visibleDates[j] = {
        "date": this.daysInLastMonth - this.lastDayOfLastMonth + i + 1,
        "month": this.lastMonth,
        "year": this.lastMonthsYear,
        "cellIndex": j,
        "recordExists": false,
        "color": "#34495e"
      };
      
      if ((this.lastMonthsYear.toString() + this.lastMonth.toString() + (this.daysInLastMonth - this.lastDayOfLastMonth + i + 1).toString()) in this.savedRecords) {
        this.visibleDates[j].recordExists = true;
      } 
      j +=1;
    }
    for (i = 0; i < this.daysInThisMonth; i++) {
      this.visibleDates[j] = {
        "date": i + 1,
        "month": this.month,
        "year": this.year,
        "cellIndex": j,
        "recordExists": false,
        "color": "#3498db"
      };
      
      if ((this.year.toString() + this.month.toString() + (i + 1).toString()) in this.savedRecords) {
        this.visibleDates[j].recordExists = true;
      }
      j += 1;
    }

    for (i = 0; i < nextMonthLoops; i++) {
      this.visibleDates[j] = {
          "date": i + 1,
          "month": this.nextMonth,
          "year": this.nextMonthsYear,
        "cellIndex": j,
        "recordExists": false,
        "color": "#34495e"
      };
       if ((this.nextMonthsYear.toString() + this.nextMonth.toString() + (i + 1).toString()) in this.savedRecords) {
        this.visibleDates[j].recordExists = true;
      } 
      j +=1;
    }


  };

  Data.prototype.setSurroundingMonthData = function() {
    if (this.month + 1 > 11) {
      this.nextMonth = 0;
      this.nextMonthsYear = this.year + 1;
    } else {
      this.nextMonth = this.month + 1;
      this.nextMonthsYear = this.year;
    }
    if (this.month - 1 < 0) {
      this.lastMonth = 11;
      this.lastMonthsYear = this.year - 1;
    } else {
      this.lastMonth = this.month - 1;
      this.lastMonthsYear = this.year;
    }
  };

  Data.prototype.addSavedRecord = function(record) {
    if (!this.savedRecords[record.year.toString() + record.month.toString() + record.date.toString()]) this.savedRecords[record.year.toString() + record.month.toString() + record.date.toString()] = {};
    this.savedRecords[record.year.toString() + record.month.toString() + record.date.toString()] = record;
    PubSub.trigger('recordadded', [record]);
    this.numSavedRecords += 1;
  };



  return Data;

})(Data || {});