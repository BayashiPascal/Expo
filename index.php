<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="CSS/animate.min.css" rel="stylesheet">
    <link href="CSS/expo.css" rel="stylesheet">
    <script charset="UTF-8" src="JS/jquery.min.js"></script>
    <script charset="UTF-8" src="JS/expo.js"></script>
  </head>
  <title>
    Title of your presentation
  </title>
  <body>

    <div id="header">
      Header of the pages
    </div>

   <div id="toc"><div id="tocContent"></div></div>

   <div id="pages">

      <div class="page pageTitle" data-title="Title of this page (optional)">
        Content of the page
      </div>

      <div class="page">
        Content of another page
      </div>

   </div>

    <div id="status">
    </div>

    <div id="footer">
      Footer of the pages
    </div>

   </body>
  <script>
    window.onload = function() {
      BodyOnLoad('<?php echo $_GET["page"]; ?>');
    }
  </script> 
</html>
