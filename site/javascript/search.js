var isSearchOpen = false;
const logo = $(".logo");
$(document).ready(function (event) {
  $(".search").click(function () {
    activeSearch();
  });
  $(".form").click(function () {
    if ($(".search-bar").hasClass("search-bar-active")) {
      removeSearch();
    }
  });
  getDataHome();
});

logo.click(function () {
  clearPage();
  $(".full-slider-box").show();
  getDataHome();
});

document.getElementById("f-search").addEventListener("click", function (event) {
  event.preventDefault();
  var text = $("#f-name").val();
  var wilaya = $("#f-wilaya").val();
  var low = $("#f-min-price").val();
  var high = $("#f-max-price").val();
  var data = {
    name: text,
    wilaya: wilaya,
    low: low,
    high: high,
  };
  $.ajax({
    url: "backend/php/search.php",
    type: "POST",
    dataType: "json",
    data: data,
    success: function (data) {
      clearPage();
      data.forEach(function (full) {
        displayDataa(full);
      });
    },
  }).done(function () {
    removeSearch();
  });
});

function getDataHome() {
  $.ajax({
    method: "GET",
    url: "backend/php/random.php",
    dataType: "json",
    success: function (data) {
      data.forEach(function (item) {
        displayDataa(item);
      });
    },
  }).done(function (data) {
    let title = `<h4>Smart phones </h4>`;
    $(".categoryy").append(title);
  });
}

function displayDataa(full) {
  product = ` <a href="#">
      <article class="producte-home" id=${full.id} >
      <div class="hd">
      <span>-14%</span>
      </div>
      <img src="${full.img1}" alt="product">
      <div class="info">
      <h6>${full.title}</h6>
      <strong>${full.price} DA</strong>
      </div>
      </article>
      </a> `;
  $(".product-container").append(product);
  eventHandler(full.id);
}

function eventHandler(id) {
  $(`#${id}`).click(function (event) {
    event.preventDefault();
    let start = id;
    var params = "name=" + start;
    $.ajax({
      url: "backend/php/appendhtml.php",
      type: "POST",
      dataType: "json",
      data: params,
      success: function (data) {
        appendNew(data[0]);
      },
    }).done(function () {});
  });
}

function showImage() {
  $(".product-to-diplay ").hide();
  $(" .pictures-container").css({
    display: "grid",
  });
  isPictureDisplayerOpen = !isPictureDisplayerOpen;
}

function hideImage() {
  $(".product-to-diplay ").show();
  $(" .pictures-container").css({
    display: "none",
  });
  isPictureDisplayerOpen = !isPictureDisplayerOpen;
}

function hideFull() {
  $(".form").empty();
  $(".form").removeClass("form-only");
}

function activeSearch() {
  isSearchOpen = true;
  $(".search-bar").addClass("search-bar-active");
  $(".form").addClass("form-only");
}

function removeSearch() {
  isSearchOpen = false;
  $(".search-bar").removeClass("search-bar-active");
  $(".form").removeClass("form-only");
}

function appendNew(data) {
  let element = `
    <div class="big-container">
      <div class="close-fun" id="clox">
        <i class="fas fa-times"></i>
      </div>
      <div class="details-txt">
        <span class="text importantt" id="pr-name">${data.title} </span>
        <span class="text importantt" id="pr-price">
          Price :
          <span>${data.price} DA</span>
          <span id="state"> [ ${data.stateSell} ] </span>
        </span>

        <span class="text importantt" id="pr-wilaya">
          Wilaya :
          <span>${data.place} ${data.wilaya} </span>
          <span id="exact">  </span>
        </span>

        <span class="text importantt" id="pr-phone">
          Phone :
          <span>${data.phonePost}</span>
        </span>

      <!--   <a href="#">
          <a class="text less-important d-b" id="pr-category"
          ${data.category}
          </a>
        </a> -->

        <span id="pr-post" class="d-b text less-important">
          Posted on :
          <span>${data.hourPost}</span>
        </span>

        <span class="d-b text less-important text" id="pr-condition">
          Condition : <span>Used - fair</span>
        </span>

        <span id="pr-details" class="d-b less-important"> Details : </span>

        <p id="pr-desc">
          ${data.descreption}
        </p>

        <span id="seller-zone " class="text"> Seller information : </span>
        <div class="seller-container">
          <div class="first-row">
            <div class="profile-pic">
              <img src="${data.img1}" alt="" height="60" />
            </div>
            <div class="info-basic">
              <span id="name-pr" class="text"> Sara Aoufi </span>
              <span id="user-name-pr" class="d-b"> @Sara_tech12 </span>
            </div>
          </div>
          <div class="second-row">
              <div class="s-c">
                    <div class="borders"></div>
                    <span id="social"> Social network </span>
                    <div class="borders"></div>
              </div>

            <div class="social-media-container">
              <div class="item">
                <img src="images/facebook.svg" alt="">
              </div>

              <div class="item">
                <img src="images/instagram.svg" alt="">
              </div>

              <div class="item">
                <img src="images/youtube.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="image-container">
        <div class="previous mod">
          <i class="fas fa-chevron-left"></i>
        </div>

        <img src="${data.img1}" alt="" srcset="" />

        <div class="next mod">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      
    </div>

    `;
  $(".form").append(element);
  $(".form").addClass("form-only");
  $("#clox").click(function () {
    hideFull();
  });
}

function clearPage() {
  $(".product-container").html("");
  $(".full-slider-box").hide();
}
