// the following events can be deleted and are only for default game state
var event1 = new event("4","July","2019","America Day", "Noon", "Holiday", "All Day", "my house", "The day to celebrate America");
var event2 = new event("19","July","2019","Nik's Birthday", "All Day", "Other", "All Day", "my house", "The day to celebrate Nik");
var event3 = new event("19","July","2019","Track Day", "3:00pm", "Other", "4 hours", "Race Track", "The day to Race");
var event4 = new event("5","July","2019","A counter day", "3:00pm", "Other", "4 hours", "NA", "The day to count");
var event5 = new event("5","July","2019","A counter day", "3:00pm", "Other", "4 hours", "NA", "The day to count");
var event6 = new event("5","July","2019","A counter day", "3:00pm", "Other", "4 hours", "NA", "The day to count");

if (localStorage.month == "undefined" || localStorage.month == "NaN" || localStorage.month == undefined) {
    localStorage.setItem("month", "6");
}

// set month according to local storage
var month = Number(localStorage.month);

var calandarJSON = loadLocalJSON();

//parse the JSON
function loadLocalJSON() {
    var jsonRequest = new XMLHttpRequest();
    jsonRequest.open("GET", "calandar.json", false);
    jsonRequest.send(null);

    var responseJSON = JSON.parse(jsonRequest.responseText);
    console.log(responseJSON);

    return responseJSON;
}

//The followng are functions to send out different attributes of parsed JSON
function getRows() {
    return calandarJSON.months[month].rows;
}

function getColumns() {
    return calandarJSON.months[month].columns;
}

function getNumDays() {
    return calandarJSON.months[month].days;
}

function getStartDay() {
    return calandarJSON.months[month].monthStart;
}

function getMonthName() {
    return "Month of: " + calandarJSON.months[month].name;
}

function getMonthIndex() {
    return month;
}

function getJustMonthName() {
    return calandarJSON.months[month].name;
}

function getEventCountTotal() {
    return calandarJSON.months[month].events.length;
}

function getYear() {
    return calandarJSON.calandarYear;
}

//Event constructor 
function event(day, month, year, name, startTime, type, duration, location, description) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.name = name;
    this.startTime = startTime;
    this.type = type;
    this.duration = duration;
    this.location = location;
    this.description = description;
    this.getEventName = function() {
        return "Event Name: " + this.name
    };
    this.toString = function() {
        return "Event Name: " + this.name + " " + "Event Start: " + this.startTime + " " + "Event Duration: " +
            this.duration, +" " + "Event Description: " + this.description;
    };
}

function createEvent(day, month, year, name, startTime, type, duration, location , description) {
    var calandarEvent = new event(day, month, year, name, startTime, type, duration, location ,description);
    EventArray(calandarEvent);
}

//This function has no purpose other than to show example calander days and can be deleted
function initializeExampleArray(){
    let eventArray = [];
    eventArray.push(event1);
    eventArray.push(event2);
    eventArray.push(event3);
    eventArray.push(event4);
    eventArray.push(event5);
    eventArray.push(event6);
    localStorage.setItem("array", JSON.stringify(eventArray));
}

//Used in the initilization of my event array in local storage
function EventArray(calandarEvent) {
    if (localStorage.array == "undefined" || localStorage.array == "NaN" || localStorage.array == undefined) {
        let eventArray = [];
        eventArray.push(calandarEvent);
        localStorage.setItem("array", JSON.stringify(eventArray));
    } else {
        let eventArray = JSON.parse(localStorage.getItem("array"));
        eventArray.push(calandarEvent);
        localStorage.setItem("array", JSON.stringify(eventArray));
    }
}

//This function returns the days that have events and sets their counters
function eventCount(dayCounter) {
    let numEventDate = 0;
    if (localStorage.getItem("array") === null) {
        return "";
    } else {
        let arrayEvent = JSON.parse(localStorage.getItem("array"));
        let ultDate = dayCounter + getJustMonthName() + getYear()
        for (let i = 0; i < arrayEvent.length; i++) {
            if (ultDate == arrayEvent[i].day + arrayEvent[i].month + arrayEvent[i].year) {
                numEventDate = numEventDate + 1;
            }
        }
        if (numEventDate == 1) {
            return " (" + numEventDate + " Event today!)";
        } else if (numEventDate > 1) {
            console.log(2);
            return " (" + numEventDate + " Events today!)";
        } else {
            return "";
        }

    }
}

//When the days are being created each cell id is compared with the event id in order to set the information pulled from
// the data
function loadEvents(cell) {

    let arrayEvent = JSON.parse(localStorage.getItem("array"));
    let jsonContent = document.getElementById("jsonContent");
    let stringCollector = ""
    let eventFill = 0;


    if (arrayEvent != null) {
        for (let i = 0; i < arrayEvent.length; i++) {
            console.log(getYear() + cell.id + getJustMonthName());
            console.log(arrayEvent[i].year + arrayEvent[i].day + arrayEvent[i].month);
            if (getYear() + cell.id + getJustMonthName() == arrayEvent[i].year + arrayEvent[i].day + arrayEvent[i].month) {
                eventFill = eventFill + 1;
                stringCollector += "<p>" + "Event Name: " + arrayEvent[i].name + "<br />" +
                    "Event Start Time: " + arrayEvent[i].startTime + "<br />" +
                    "Event Type: " + arrayEvent[i].type + "<br />" +
                    "Event Duration: " + arrayEvent[i].duration + "<br />" +
                    "Event Location: " + arrayEvent[i].location + "<br />"+
                    "Event Description: " + arrayEvent[i].description + "<br />" +
                    "</p>" +
                    "<br />";
            }

        }
        if (eventFill > 0) {
            jsonContent.innerHTML = stringCollector;
        } else if (eventFill == 0) {
            jsonContent.innerHTML = stringCollector;
        }
    }
}