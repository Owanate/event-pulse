import $ from "jquery";

$(".nav-toggle").on("click", () => {
  $(".navbar").toggleClass("navbar--visible");
});

const Apikey = "LRdxrCLIL0c60Ckh4XHfuZkTAUHk3IfO";

function formatDate(dateString) {
  let dateObj = new Date(dateString);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dateObj.getDay();
  let month = months[dateObj.getMonth()];
  let date = dateObj.getDate();
  return `${days[day]}, ${month} ${date}`;
}

function featuredEvents() {
  try {
    $.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=BE&apikey=${Apikey}&size=6`,
      (details) => {
        $.each(details._embedded.events, (index, data) => {
          let card = `
            <li class="card flex">
              <img src="${data.images[0].url}" alt=""/>
              <div class="details flex">
                <h3><a href="${data.url}" target="_blank">${data.name}</a></h3>
                <p class="date">${formatDate(data.dates.start.localDate)}</p>
                <p class="venue">${data._embedded.venues[0].name}</p>
              </div>
            </li>
          `;
          $("#featured-events").append(card);
        });
      }
    );
  } catch (error) {
    console.error("Fetch", error);
  }
}

function attractions() {
  try {
    $.get(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?classificationName=museum&apikey=${Apikey}&size=3`,
      (details) => {
        $.each(details._embedded.attractions, (index, data) => {
          let card = `
            <li class="card flex">
              <img src="${data.images[0].url}" alt=""/>
              <div class="details flex">
                <h3><a href="">${data.name}</a></h3>
                <p class="date">${data.classifications[0].segment.name}</p>
              </div>
            </li>
          `;
          $("#attractions-grid").append(card);
        });
      }
    );
  } catch (error) {
    console.error("Fetch", error);
  }
}

$(featuredEvents(), attractions());
