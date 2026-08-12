document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Reveal-on-scroll is progressive enhancement only: .reveal elements are
  // visible by default (see CSS). We only "arm" the hidden/animated state
  // here, after confirming IntersectionObserver can actually reveal them again.
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    reveals.forEach(function (el) { el.classList.add("reveal-armed"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // contact form: no backend yet -> mailto fallback
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value;
      var email = form.querySelector("#email").value;
      var message = form.querySelector("#message").value;
      var subject = encodeURIComponent("Pesan dari website — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:srek.terpadu@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
});
