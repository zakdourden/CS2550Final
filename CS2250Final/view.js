function genarateHeader(columns) {
    var jsCalandar = document.getElementById("jsCalandar");
    var table = document.createElement("table");
    table.setAttribute("id", "calandarTable");
    var tr = document.createElement("tr");

    for (let i = 0; i < columns; i++) {
        var th = document.createElement("th");
        switch (i) {
            case 0:
                var text = document.createTextNode("Sunday");
                th.append(text);
                break;
            case 1:
                var text = document.createTextNode("Monday");
                th.append(text);
                break;
            case 2:
                var text = document.createTextNode("Tuesday");
                th.append(text);
                break;
            case 3:
                var text = document.createTextNode("Wednesday");
                th.append(text);
                break;
            case 4:
                var text = document.createTextNode("Thursday");
                th.append(text);
                break;
            case 5:
                var text = document.createTextNode("Friday");
                th.append(text);
                break;
            case 6:
                var text = document.createTextNode("Saturday");
                th.append(text);
                break;
            default:
                var text = document.createTextNode("ERROR ERROR ERROR ERROR!!!");
                th.append(text);
                break;
        }

        tr.appendChild(th);
        table.appendChild(tr);
    }

    jsCalandar.appendChild(table);
}

function displayMonthName() {
    var monthName = document.getElementById("monthName");
    var name = getMonthName();
    var displayRealMonthName = document.createTextNode(name);
    monthName.appendChild(displayRealMonthName);
}

function displayYear() {
    var monthName = document.getElementById("year");
    var name = getYear();
    var displayYearName = document.createTextNode(name);
    monthName.appendChild(displayYearName);
}

function generateMonth() {
    var rows = getRows();
    var columns = getColumns();
    genarateHeader(columns);
    displayMonthName();
    displayYear();
    var table = document.getElementById("calandarTable");
    var dayCounter = 1;
    var numberOfDays = getNumDays();
    var firstDayOfTheMonth = getStartDay();
    for (let i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (let x = 0; x < columns; x++) {
            var td = document.createElement("td");
            td.id = dayCounter;

            if (x >= firstDayOfTheMonth && i == 0 || i > 0 && dayCounter <= numberOfDays) {
                var numOfDay = document.createTextNode(dayCounter.toString());
                td.appendChild(numOfDay);
                var eventContent = eventCount(dayCounter);
                var eventNode = document.createTextNode(eventContent);
                var br = document.createElement("br");
                var br2 = document.createElement("br");
                td.appendChild(br);
                td.appendChild(br2);
                td.appendChild(eventNode);
                dayCounter++;
            }
            tr.appendChild(td);


        }
        table.appendChild(tr);
    }
    editCalandarDay();
    //loadEvents();
}

function closeWindow() {
    dayView.style.visibility = "hidden";
}

function editCalandarDay() {
    //Gathered all required elements for editing cells

    var table = document.getElementById("calandarTable");
    var calandarDay = document.getElementsByTagName("td");
    var dayView = document.getElementById("dayView");
    var header = document.getElementById("day");
    var arrayEvent = JSON.parse(localStorage.getItem("array"));
    var jsonContent = document.getElementById("jsonContent");

    //loop through all the td tags in the table
    for (let i = 0; i < calandarDay.length; i++) {
        calandarDay[i].onclick = function() {
            var col = this.cellIndex;
            var row = this.parentNode.rowIndex;
            var stringCollector = ""
            var eventFill = 0;

            var cell = table.rows[row].cells[col];
            loadEvents(cell);
            header.innerHTML = "Events for " + getJustMonthName() + " " + cell.textContent;
            dayView.style.visibility = "visible";

            //the form (for lack of a better term that appears when overlay is brought up)
            var button = document.getElementById("eButton").onclick = function() {
                var day = calandarDay[i].id;
                var month = getJustMonthName();
                var year = getYear();
                var eventName = document.getElementById("eventName").value;
                var eventStart = document.getElementById("eventStart").value;
                var eventType = document.getElementById("eventType").value;
                var eventDuration = document.getElementById("eventDuration").value;
                var eventDesc = document.getElementById("eventDesc").value;

                createEvent(day, month, year, eventName, eventStart, eventDuration, eventType, eventDesc);

                dayView.style.visibility = "hidden";
                window.location.reload();


            }
        }

    }
}


function previousMonth() {
    localStorage.month = Number(localStorage.month) - 1;
    if (localStorage.month < 0) {
        localStorage.month = 11;
    }
    window.location.reload();
    console.log(localStorage.month);
}

function nextMonth() {
    localStorage.month = Number(localStorage.month) + 1;
    if (localStorage.month > 11) {
        localStorage.month = 0;
    }
    window.location.reload();
    console.log(localStorage.month);
}

function clearEvents() {
    alert("All calandar events and local storage will now be cleared!");
    localStorage.clear();
    window.location.reload();
}