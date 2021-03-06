// (day === holidayday && month === holidaymonth && year === holidayyear) {



const getHoliday = async () => {
  try {
    let optionYear = document.querySelector('#select-year')

    let year = optionYear.value

    let getdata = await axios.get(`https://calendarific.com/api/v2/holidays?&api_key=88e220d28b06a18d0148ed2a3bf3c6d5cebdb2aa&country=US&year=${year}`)
    let holidays = getdata.data.response.holidays

    getValue(holidays)

  } catch (error) {
    console.log(error)
  }

}
console.log(getHoliday())

function getValue(holidays) {
  holidays.forEach(holiday => {
    let name = holiday.name

    let fulldate = holiday.date.iso
    let year = holiday.date.datetime.year
    let month = holiday.date.datetime.month
    let day = holiday.date.datetime.day
    let description = holiday.description
    let getDay = document.querySelectorAll("td")
    let getYear = document.querySelector("#select-year").value
    let getMonth = document.querySelector("#select-month").value
    for (let i = 0; i < getDay.length; i++) {
      let eachtd = getDay[i]
      let text = getDay[i].textContent
   
      if (  getYear === year && getMonth === month) {
    getDay += name
      }
    }

  })
}
let today = new Date()
let currentYear = today.getFullYear(); //2021
let currentDay = today.getDay() //tuesday the calendar starts sunday=0
let currentDate = today.getDate() //26
let currentMonth = today.getMonth() + 1 //month start index 0; 
//console.log(today, currentYear, currentDate, currentDay, currentMonth)
//add option to pick up a year
let optionYear = document.querySelector('#select-year')
for (let i = 2025; i >= 2000; i--) {
  let option = document.createElement("option")
  option.value = i;
  option.innerText = i;
  optionYear.append(option)
}
let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
//add options to pick up a month
let optionMonth = document.querySelector('#select-month')
for (let i = 0; i < months.length; i++) {
  let option = document.createElement('option')
  option.value = months[i]
  option.innerText = months[i]
  optionMonth.append(option)
}

let body = document.querySelector("body")
let headerColor = document.querySelector(".display-header")

function changeBody(month) {
  switch (month) {
    case 1:
    case 2:
    case 3:
      body.style.backgroundImage = "linear-gradient(to top, white, pink)";
      headerColor.style.color = "rgb(250, 60, 205)"
      break;
    case 4:
    case 5:
    case 6:
      body.style.backgroundImage = "linear-gradient(to top, blue, rgb(102,255,178))";
      headerColor.style.color = "rgb(25, 250, 250)"
      break;
    case 7:
    case 8:
    case 9:
      body.style.backgroundImage = "linear-gradient(to top, yellow, orange)";
      headerColor.style.color = "rgb(230, 100, 100)"
      break;
    default:
      body.style.backgroundImage = "linear-gradient(to top, red, rgb(153,255,51))";
      headerColor.style.color = "rgb(250, 20, 10)"
  }
}

//enable options
let form = document.querySelector("#year-month-submission")
form.addEventListener('change', (e) => {
  e.preventDefault();
  let selectYear = document.querySelector("#select-year").value
  console.log(selectYear)
  let selectMonth = document.querySelector("#select-month").value
  let monthIndex = months.indexOf(selectMonth) + 1
  getHoliday()
  createCalendar(selectYear, monthIndex)

})




//clear calendar each time;
const clearCalendar = () => {
  let calendarBody = document.querySelector('#calendar-body')
  while (calendarBody.lastChild) {
    calendarBody.removeChild(calendarBody.lastChild)
  }
}

// display month,year above the calender
function displayMonthYear(year, month) {
  let showHeader = document.querySelector(".display-header")
  let selectYear = document.querySelector("#select-year")
  let selectMonth = document.querySelector("#select-month")
  selectYear.value = year;
  selectMonth.value = months[month - 1]
  showHeader.innerText = `${months[month-1]} ${year}` //arr starts with index 0
  return showHeader
}

function showIt() {
  getHoliday()

}
//create a calendar body 
function createCalendar(year, month) {
  //where the first of month start in the week
  let firstDayofMonth = new Date(year, month - 1, 1).getDay() //weeks starts index=0 and sunday=0 
  let monthTest = new Date(year, month, 1).getMonth() // here month index start 1;
  console.log(monthTest)
  // console.log(firstDayofMonth)
  let totalDaysinMonth = new Date(year, month, 0).getDate()
  console.log(totalDaysinMonth)
  changeBody(month)
  getHoliday()
  displayMonthYear(year, month)

  clearCalendar()

  let day = 1; //everymonth start day=1
  //loop to create row/data 
  let calendarBody = document.querySelector('#calendar-body')
  for (let i = 0; i < 7; i++) {
    let tr = document.createElement("tr") //create row
    tr.setAttribute("class", "calendar-row")
    for (let z = 0; z < 7; z++) { //seven days a week
      //on the first row, indicate first day of month start in week
      //empty html element
      if (i === 0 && z < firstDayofMonth) {
        let td = document.createElement("td")
        td.innerText = ""
        tr.append(td) ////each row should have data with empty date
      } else {
        if (day > totalDaysinMonth) { //loop stop when reach to total days
          break;
        }
        let td = document.createElement("td")
        //highlight today;
        if (day === currentDate && month === currentMonth && year === currentYear) {
          td.setAttribute("class", "itstoday")
        }
        td.innerText = day;
        tr.append(td)

        day++; //increment day
      }
    }
    calendarBody.append(tr) //insert row into calendar body
  }
  return calendarBody;
}

createCalendar(currentYear, currentMonth)