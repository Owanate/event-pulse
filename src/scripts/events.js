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
  
  $("#categoriesSelect").change(function () {
    var selectedCategory = $(this).val();
    $(".tab-link").attr("aria-selected", "false").attr("tabindex", "-1");
    $(".tab-panel").attr("hidden", true).attr("tabindex", "-1");

    // Set the corresponding tab as selected
    $(`.tab-link[data-category="${selectedCategory}"]`)
      .attr("aria-selected", "true")
      .attr("tabindex", "0");

    // Show the corresponding tab-panel
    $(`.tab-panel[data-category="${selectedCategory}"]`)
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
  getEvents("family", "#family-grid"),
  getEvents("fairs%20festival", "#fair-grid"),
  getEvents("film", "#film-grid"),
  getEvents("food%20drink", "#food-grid"),
  getEvents("sports", "#sport-grid"),
  getEvents("theatre", "#theatre-grid")
);
