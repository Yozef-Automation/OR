(function () {
  function applyStyles(doc) {
    var style = doc.createElement("style");
    style.innerHTML = `
      * { font-family: 'Segoe UI', Arial, sans-serif !important; box-sizing: border-box; }

      body { background: #f0f4ff !important; padding: 16px !important; direction: rtl; }

      input[type="text"],
      input[type="email"],
      input[type="number"],
      input[type="tel"],
      input[type="url"],
      input[type="date"],
      input[type="datetime-local"],
      textarea,
      select {
        width: 100% !important;
        padding: 10px 14px !important;
        font-size: 14px !important;
        color: #111827 !important;
        background: #f9fafb !important;
        border: 1.5px solid #c7d2fe !important;
        border-radius: 8px !important;
        outline: none !important;
        transition: border-color 0.2s !important;
        margin-bottom: 4px !important;
      }

      input:focus, textarea:focus, select:focus {
        border-color: #4f46e5 !important;
        background: #fff !important;
        box-shadow: 0 0 0 3px rgba(79,70,229,0.12) !important;
      }

      label, [class*="label"] {
        font-size: 13px !important;
        font-weight: 600 !important;
        color: #374151 !important;
        display: block !important;
        margin-bottom: 4px !important;
      }

      button, input[type="submit"], input[type="button"] {
        padding: 10px 24px !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        border-radius: 8px !important;
        border: none !important;
        cursor: pointer !important;
      }

      input[type="submit"] {
        background: #4f46e5 !important;
        color: #fff !important;
      }

      input[type="submit"]:hover { background: #4338ca !important; }

      table { width: 100% !important; border-collapse: collapse !important; }
      th { background: #e0e7ff !important; color: #374151 !important; padding: 10px !important; text-align: right !important; }
      td { padding: 10px !important; border-bottom: 1px solid #e5e7eb !important; }
      tr:hover td { background: #f5f3ff !important; }

      /* Field 1485 */
      [id*="1485"], [name*="1485"], [data-id*="1485"] {
        border: 2px solid #6366f1 !important;
        background: #eef2ff !important;
      }

      /* Field 1351 */
      [id*="1351"], [name*="1351"], [data-id*="1351"] {
        border: 2px solid #10b981 !important;
        background: #ecfdf5 !important;
      }

      /* YouTube Buttons */
      #yt-buttons-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0 0 20px 0;
        direction: rtl;
      }

      .yt-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 10px 18px !important;
        background: #ff0000 !important;
        color: #fff !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        border-radius: 8px !important;
        border: none !important;
        cursor: pointer !important;
        text-decoration: none !important;
        box-shadow: 0 2px 8px rgba(255,0,0,0.25) !important;
        transition: background 0.2s, transform 0.15s !important;
      }

      .yt-btn:hover {
        background: #cc0000 !important;
        transform: translateY(-2px) !important;
      }
    `;
    doc.head.appendChild(style);
  }

  function addYouTubeButtons(doc) {
    if (doc.getElementById("yt-buttons-bar")) return;

    var links = [
      { label: "ערוץ ראשי", url: "https://www.youtube.com/@YourChannel" },
      { label: "הדרכות", url: "https://www.youtube.com/playlist?list=PLACEHOLDER" },
      { label: "וידאו לדוגמה", url: "https://www.youtube.com/watch?v=PLACEHOLDER" },
    ];

    var ytIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>';

    var bar = doc.createElement("div");
    bar.id = "yt-buttons-bar";

    links.forEach(function (link) {
      var a = doc.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "yt-btn";
      a.innerHTML = ytIcon + " " + link.label;
      bar.appendChild(a);
    });

    var target = doc.querySelector("form") || doc.querySelector("body");
    if (target) target.insertBefore(bar, target.firstChild);
  }

  function run(doc) {
    applyStyles(doc);
    addYouTubeButtons(doc);
  }

  // Try to apply inside iframe
  var iframes = document.querySelectorAll("iframe");
  iframes.forEach(function (iframe) {
    try {
      var iDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iDoc && iDoc.readyState === "complete") {
        run(iDoc);
      } else {
        iframe.addEventListener("load", function () {
          try { run(iframe.contentDocument || iframe.contentWindow.document); } catch (e) {}
        });
      }
    } catch (e) {}
  });

  // Also apply to current document (in case JS runs inside iframe context)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { run(document); });
  } else {
    run(document);
  }
})();
