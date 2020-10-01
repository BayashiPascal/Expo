/* ============= index.js =========== */

// ------------ Global variables

var myExpo = {};

// ------------ Body.OnLoad handler

function BodyOnLoad() {
  try {
 
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    reqPage = urlParams.get('page');
 
    console.log("Requested page <" + reqPage + "> from URL");

    myExpo = new Expo();

    $("body").keydown(BodyKeyPressed);
 
    myExpo.HideAllPages();
    myExpo.CreateTOC();
    myExpo.ToggleTOC();
 
    page = parseInt(reqPage);
    if (isNaN(page)) {
      page = 1;
    }
    myExpo.MoveToPage(page - 1);

  } catch (err) {
    console.log("BodyOnLoad " + err.stack);
  }
}

// ------------ Keyboard events handler

function BodyKeyPressed(evt) {
  try {

    switch(evt.keyCode){
      case 37: // cursor left
        myExpo.MoveToPrevPage();
        evt.preventDefault();
        break;
      case 39: // cursor right
        myExpo.MoveToNextPage();
        evt.preventDefault();
        break;
      case 84: // T
        myExpo.ToggleTOC();
        evt.preventDefault();
        break;
      default:
        break;
    }
    
  } catch (err) {
    console.log("BodyKeyPress " + err.stack);
  }
}

// ------------ Expo class

function Expo() {
  try {

    this.curPage = -1;
    this.prevPage = -1;
    this.isUnderTransition = false;
    this.isTOCDisplayed = true;
    
  } catch (err) {
    console.log("Expo " + err.stack);
  }
}

Expo.prototype.GetNbPages = function(page) {
  try {

    return $("#pages .page").length;

  } catch (err) {
    console.log("Expo.GetNbPages " + err.stack);
  }
}

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

Expo.prototype.ShowPage = async function(page) {
  try {

    if (page == this.curPage) {
      return;
    }
    while (this.isUnderTransition) {
      await sleep(100);
    }
    this.isUnderTransition = true;
    this.prevPage = $("#pages .page")[this.curPage];
    if (this.curPage > page) {
      this.fadeOut = "animate__backOutRight";
      this.fadeIn = "animate__backInLeft";
    } else {
      this.fadeOut = "animate__backOutLeft";
      this.fadeIn = "animate__backInRight";
    }
    $("#status").html((page+1) + "/" + this.GetNbPages());
    this.curPage = page;
    if (this.prevPage) {
      this.prevPage.classList.add('animate__animated', this.fadeOut);
    }
    setTimeout(function() {
        if (myExpo.prevPage) {
          myExpo.prevPage.style.display = "none";
          myExpo.prevPage.classList.remove('animate__animated', myExpo.fadeOut);
        }
        console.log("Show page " + myExpo.curPage);
        curPage = $("#pages .page")[myExpo.curPage];
        curPage.style.display = "block";
        curPage.classList.add('animate__animated', myExpo.fadeIn);
        setTimeout(function() {
            curPage = $("#pages .page")[myExpo.curPage];
            curPage.classList.remove('animate__animated', myExpo.fadeIn);            
            myExpo.isUnderTransition = false;
          }, 1000);
      }, 1000);

  } catch (err) {
    console.log("Expo.ShowCurPage " + err.stack);
  }
}

Expo.prototype.MoveToPage = function(page) {
  try {

    console.log("Move to " + page);

    if (page >= 0 && page < this.GetNbPages()) {
      this.ShowPage(page);
    }

  } catch (err) {
    console.log("Expo.MoveToPage " + err.stack);
  }
}

Expo.prototype.MoveToPrevPage = function() {
  try {

    console.log("Prev");

    page = this.curPage - 1;
    if (page >= 0 && page < this.GetNbPages()) {
      this.ShowPage(page);
    }

  } catch (err) {
    console.log("Expo.MoveToPrevPage " + err.stack);
  }
}

Expo.prototype.MoveToNextPage = function() {
  try {

    console.log("Next");

    page = this.curPage + 1;
    if (page >= 0 && page < this.GetNbPages()) {
      this.ShowPage(page);
    }

  } catch (err) {
    console.log("Expo.MoveToNextPage " + err.stack);
  }
}

Expo.prototype.HideAllPages = function() {
  try {

    $(".page").css("display", "none");

  } catch (err) {
    console.log("Expo.HideAllPages " + err.stack);
  }
}

Expo.prototype.CreateTOC = function() {
  try {

    this.toc = document.createElement("ol");
    $(".page").each(function(index, page) {
        pageTitle = page.getAttribute("data-title");
        if (pageTitle) {
          a = document.createElement("a");
          a.href = "index.html?page=" + (index+1);
          a.innerHTML = pageTitle + " (p." + (index+1) + ")";
          a.className = "tocLink"; 
          li = document.createElement("li");
          li.append(a);
          myExpo.toc.append(li);
        }
      })
    $("#tocContent").append(this.toc);

  } catch (err) {
    console.log("Expo.CreateTOC " + err.stack);
  }
}

Expo.prototype.ToggleTOC = function() {
  try {

    if (this.isTOCDisplayed) {

      $("#toc").css("display", "none");
      $("#pages").css("display", "flex");
      $("#status").css("display", "block");
      this.isTOCDisplayed = false;

    } else {

      $("#toc").css("display", "block");
      $("#pages").css("display", "none");
      $("#status").css("display", "none");
      this.isTOCDisplayed = true;

    }

  } catch (err) {
    console.log("Expo.ToggleTOC " + err.stack);
  }
}

