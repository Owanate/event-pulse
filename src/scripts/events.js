import $ from "jquery";

$(".nav-toggle").on("click", () => {
  $(".navbar").toggleClass("navbar--visible");
});

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
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = dateObj.getDay();
  let month = months[dateObj.getMonth()];
  let date = dateObj.getDate();
  return `${month} ${date} | ${days[day]}`;
}

// let apiUrls = {
//   tab1: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=family&apikey=${Apikey}&size=6`,
//   tab2: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=fairs%20festivals&apikey=${Apikey}&size=6`,
//   tab3: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=film&apikey=${Apikey}&size=6`,
//   tab4: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=food%20drink&apikey=${Apikey}&size=6`,
//   tab5: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports&apikey=${Apikey}&size=6`,
//   tab6: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=theatre&apikey=${Apikey}&size=6`,
// };

function showTabContent() {
  $(".tab-link").click(function () {
    let tabId = $(this).attr("id");
    $(".tab-link").attr("aria-selected", "false").attr("tabindex", "-1");
    $(this).attr("aria-selected", "true").attr("tabindex", "0");
    $(".tab-panel").attr("hidden", true).attr("tabindex", "-1");
    $(`#${tabId.replace("tab", "panel")}`)
      .removeAttr("hidden")
      .attr("tabindex", "0");
  });
}

function getEvents(event, wrapper) {
  $.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${event}&apikey=LRdxrCLIL0c60Ckh4XHfuZkTAUHk3IfO&size=6`,
    (response) => {
      $.each(response._embedded.events, (index, data) => {
        let card = `
                <li class="event-card">
                <img src="${data.images[0].url}" alt=""
                />
                <div class="image-overlay flex">
                  <p class="date">${formatDate(data.dates.start.localDate)}</p>
                  <h3><a href="">${data.name}</a></h3>
                </div>
              </li>
            `;
        $(wrapper).append(card);
      });
    }
  );
}

$(
  showTabContent(),
  getEvents("family", "#art-grid"),
  getEvents("fairs%20festival", "#fair-grid"),
  getEvents("film", "#film-grid"),
  getEvents("food%20drink", "#food-grid"),
  getEvents("sports", "#sport-grid"),
  getEvents("theatre", "#theatre-grid")
);
