result = [];
const seriesList = document.querySelector(".series-list");
const items = seriesList.querySelectorAll(".item");
const titlesLink = seriesList.querySelectorAll(".title-link");
const imgsLink = seriesList.querySelectorAll(".img-link");
const imgs = seriesList.querySelectorAll("img");
let data_i = 0;
let pag_i = 1;
let imgIndex = 35;
let pag_arr = [1, 2, 3, 4, 5];

let prev_pag = 1;

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    for (var i in json) result.push([json[i]]);
    const titles = Object.values(result[0][0]);
    console.log(titles);
    const descriptions = Object.values(result[1][0]);
    const genres = Object.values(result[2][0]);
    let pagination_btns = document.querySelectorAll(".pagination li");
    let pagination_btnsLink = document.querySelectorAll(".pagination li a");
    for (let i = 0; i < pag_arr.length; i++) {
      pagination_btnsLink[i + 2].textContent = pag_arr[i];
    }

    for (let i = 0; i < 34; i++) {
      imgs[i].src = `images/series_images/img${imgIndex + i}.png`;
      titlesLink[i].innerHTML = titles[i + 34];
    }
    const displayPagination = function () {
      for (let i = 0; i < pagination_btns.length; i++) {
        pagination_btns[i].addEventListener("click", function () {
          let pag = pagination_btns[i].textContent;

          if (pag === ">") pag = Number(prev_pag) + 1;
          if (pag === "<") pag = Number(prev_pag) - 1;

          prev_pag = pag;
          data_i = (pag - 1) * 34 + 34;
          imgIndex = (pag - 1) * 34 + 35;
          const pagBtnsL = pagination_btns.length;
          let pax = Number(pag) + 2 - pag_arr[pag_arr.length - 1];
          let pax2 = pag_arr[pag_arr.length - 1] - Number(pag) - 2;

          pagination_btns[0].classList.remove("remove-hid");
          pagination_btns[1].classList.remove("remove-hid");

          if (pag > 1) {
            pagination_btns[0].classList.add("remove-hid");
            pagination_btns[1].classList.add("remove-hid");
          }

          if (pag < Math.floor(titles.length / 34)) {
            pagination_btns[pagBtnsL - 1].classList.add("remove-hid");
            pagination_btns[pagBtnsL - 2].classList.add("remove-hid");
          }

          for (let i = 0; i < pax2; i++) {
            if (pag_arr[0] === 1) break;
            for (let j = 0; j < pag_arr.length; j++) {
              pag_arr[j] -= 1;
            }
          }

          for (let i = 0; i < pax; i++) {
            for (let j = 0; j < pag_arr.length; j++) {
              pag_arr[j] += 1;
            }
          }
          for (let i = 0; i < pag_arr.length; i++) {
            pagination_btnsLink[i + 2].textContent = pag_arr[i];
          }

          for (let i = 2; i < 4; i++) {
            if (pag_arr[pag_arr.length - 1] > 5) break;
            pagination_btns[Number(pag) + i].classList.add("remove-hid");
          }

          for (let k = 0; k < 34; k++) {
            imgs[k].src = `images/series_images/img${imgIndex + k}.png`;
            titlesLink[k].innerHTML = titles[data_i + k];
          }
        });
      }
    };
    displayPagination();
    fetch("recomendetaion_system.json")
      .then((response) => response.json())
      .then((json) => {
        const anime = "Mushoku Tensei: Jobless Reincarnation Part 2";
        // 509
        const arr = [];

        result.push([json]);
        for (let i = 0; i < titles.length - 1; i++) {
          if (titles[i] === anime) {
            const reco_system = Object.values(result[3][0][i]);
            // for (var p in reco_system) {
            //   arr.push(reco_system[p]);
            // }
            for (const [index, element] of reco_system.entries()) {
              arr.push([index, element]);
            }
            arr
              .sort(function (a, b) {
                return a[1] - b[1];
              })
              .reverse();
            console.log(arr);
          }
        }
      });
  });

// displaying first 34 items and pagination will be displayed 1 2 3 > >>
// event listener on page list
// data i will be set to page num then (i * 34 + 34) imgs will be (i * 34 + 69)
// for loop for items and imgs, displayed until prev_i > i * 34 + 34 imgs same but + 69
// clicked page num will check if its greater than 1 if true display 2 left arrows, same for right arrows

// create var i - 1 and var len(items) - i then create a for loop of 0 to each of the vars and take elements from arr of the 2 left nums and from arr of the 2 right nums ## better version of below

// clicked page will check if its (page num - 2 >= 0) if true display 2 left pages if not check for (page num - 1 >= 0) if true display 1 left page if not non left display pages same with right just (page num + 2 <= len(items))

// the i will be set to clicked page if not work try other method of keeping i remembered
