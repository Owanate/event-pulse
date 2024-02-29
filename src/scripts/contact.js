import $ from "jquery";
import Swal from "sweetalert2";

$(".nav-toggle").on("click", () => {
  $(".navbar").toggleClass("navbar--visible");
});

$("#contact-form").on("submit", (e) => {
    e.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();
    const subject = $("#subject").val();
    const message = $("#message").val();

    if (name == "" || email == "" || subject == "" || message == "") {
      Swal.fire({
        title: "Try again",
        text: "Please Fill Required Fields",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Thank you for your feedback",
        text: "We'll get back to you soon!",
        icon: "success",
      });
      $("#contact-form")[0].reset();
    }
});