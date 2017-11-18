window.onload = function() {
  let script = document.createElement("script");
  script.src = "/node_modules/jquery/dist/jquery.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(function() {

    });
  };
  document.body.appendChild(script);
};
