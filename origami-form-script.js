/* =============================================
   Origami Form - YouTube Buttons Injector
   ============================================= */

(function () {
  var youtubeLinks = [
    { label: "ערוץ ראשי", url: "https://www.youtube.com/@YourChannel" },
    { label: "הדרכות", url: "https://www.youtube.com/playlist?list=PLACEHOLDER" },
    { label: "וידאו לדוגמה", url: "https://www.youtube.com/watch?v=PLACEHOLDER" },
  ];

  var ytIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>';

  function injectButtons() {
    if (document.getElementById("yt-buttons-bar")) return;

    var bar = document.createElement("div");
    bar.id = "yt-buttons-bar";

    youtubeLinks.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "yt-btn";
      a.innerHTML = ytIcon + link.label;
      bar.appendChild(a);
    });

    var target =
      document.querySelector(".activity-form") ||
      document.querySelector(".form-container") ||
      document.querySelector("[class*='form-wrap']") ||
      document.querySelector("[class*='activity-wrap']") ||
      document.body;

    target.insertBefore(bar, target.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectButtons);
  } else {
    injectButtons();
  }
})();
