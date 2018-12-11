d3.json('data/africa.geo.json').then((geojson) => {

          // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
          mapboxgl.accessToken = 'pk.eyJ1IjoiYnNha2JhciIsImEiOiJjam14em1hNmQweHZlM3FwbHVtbmQ5eXdoIn0.XgXo8yf68EhBjNTZ6nXhpg';
          // https://www.mapbox.com/mapbox-gl-js/api/#map
          let map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/bsakbar/cjpiw7sr14mx72sq8n940y70a',
              center: [15.319,29.721], // 6.513,19.669
              zoom: 3,
              pitch: 100,
              bearing: 50,
              interactive: false
          });

          let container = map.getCanvasContainer()
          let svg = d3.select(container).append("svg")


        let transform = d3.geoTransform({point: projectPoint}); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
      // #091116 < dark navy / #0a141c < navy / #f93d3d < red
        let featureElement = svg.selectAll("path")
          .data(geojson.features)
          .enter()
              .append("path")
              .attr("d", d3.geoPath().projection(transform))
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 0.5)
              .attr("stroke-opacity", 0.5)
              .attr("fill", "#0a141c")
              .attr("fill-opacity", 0.9)
              .on('mouseover', function(d) {
                  // console.log(d);
                  d3.select(this).attr("fill", "#f93d3d", 0);
                  d3.select("#hover")
                      .text(d.properties.name);
                  d3.select('#hover').attr("fill-opacity", 1);
              })
              .on('click', function(d) {
                  d3.select("#click")
                      .text(document.getElementById("country_textbox").value = d.properties.name);
              })

              .on('mouseout', function() {
                  d3.select(this).attr("fill", "#0a141c", 0);
                  d3.select('#hover').attr("fill-opacity", 0);
              })
              .on('mousemove', function(d) {
                  d3.select("#hover")
                      .attr('x', function() { return d3.mouse(this)[0] + 20; })
                      .attr('y', function() { return d3.mouse(this)[1] + 10; });
              });


          svg.append("text")
              .attr('id', 'hover')
              .style('fill','#ffffff');

          function update() {
              featureElement.attr("d", path);
          }

          map.on("viewreset", update)
          map.on("movestart", function(){
          svg.classed("hidden", true);
        });
          map.on("rotate", function(){
          svg.classed("hidden", true);
        });
          map.on("moveend", function(){
          update();
          svg.classed("hidden", false);
        })

          update()
        function projectPoint(lon, lat) {
              let point = map.project(new mapboxgl.LngLat(lon, lat));
          this.stream.point(point.x, point.y);
        }

      });


var current_region = "Eastern Africa"

function regional_map(region){
  current_region = region
  // console.log(current_region)
  document.getElementById("map").style.display = "none"
  document.getElementById("map2").style.display = "block"
  var evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
  // console.log(current_region)
}

d3.json('data/africa.geo.json').then((geojson) => {

          // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
          mapboxgl.accessToken = 'pk.eyJ1IjoiYnNha2JhciIsImEiOiJjam14em1hNmQweHZlM3FwbHVtbmQ5eXdoIn0.XgXo8yf68EhBjNTZ6nXhpg';
          // https://www.mapbox.com/mapbox-gl-js/api/#map
          let map = new mapboxgl.Map({
              container: 'map2',
              style: 'mapbox://styles/bsakbar/cjpiw7sr14mx72sq8n940y70a',
              center: [15.319,29.721], // 6.513,19.669
              zoom: 3,
              pitch: 100,
              bearing: 50,
              interactive: false
          });

          let container = map.getCanvasContainer()
          let svg = d3.select(container).append("svg")

        // console.log(current_region)
        let transform = d3.geoTransform({point: projectPoint}); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
      // #091116 < dark navy / #0a141c < navy / #f93d3d < red
        let featureElement = svg.selectAll("path")
          .data(geojson.features)
          .enter()
              .append("path")
              .attr("d", d3.geoPath().projection(transform))
              .attr("stroke", "#f93d3d")
              .attr("stroke-width", 0.6)
              // .attr("stroke-opacity", 0.5)
              .attr("stroke-opacity", function(d) {
                      if (d.properties.subregion == current_region) { return 0.5 }
                      else 	{ return 0 }
                    ;})
              .attr("fill", "#0a141c")
              .attr("fill-opacity", 0.9)
              .on('mouseover', function(d) {
                  // console.log(d);
                  d3.select(this).attr("fill", "#f93d3d", 0);
                  d3.select("#hover")
                      .text(d.properties.name);
                  d3.select('#hover').attr("fill-opacity", 1);
              })
              .on('click', function(d) {
                  d3.select("#click")
                      .text(document.getElementById("country_textbox").value = d.properties.name);
              })

              .on('mouseout', function() {
                  d3.select(this).attr("fill", "#0a141c", 0);
                  d3.select('#hover').attr("fill-opacity", 0);
              })
              .on('mousemove', function(d) {
                  d3.select("#hover")
                      .attr('x', function() { return d3.mouse(this)[0] + 20; })
                      .attr('y', function() { return d3.mouse(this)[1] + 10; });
              });


          svg.append("text")
              .attr('id', 'hover')
              .style('fill','#ffffff');

          function update() {
              featureElement.attr("d", path);
          }

          map.on("viewreset", update)
          map.on("movestart", function(){
          svg.classed("hidden", true);
        });
          map.on("rotate", function(){
          svg.classed("hidden", true);
        });
          map.on("moveend", function(){
          update();
          svg.classed("hidden", false);
        })

          update()
        function projectPoint(lon, lat) {
              let point = map.project(new mapboxgl.LngLat(lon, lat));
          this.stream.point(point.x, point.y);
        }

      });

// function updateData() {
    // Get the data again
//     d3.json('data/africa.geo.json').then((geojson) => {
//       // var svg = d3.select("map");
//       // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
//       mapboxgl.accessToken = 'pk.eyJ1IjoiYnNha2JhciIsImEiOiJjam14em1hNmQweHZlM3FwbHVtbmQ5eXdoIn0.XgXo8yf68EhBjNTZ6nXhpg';
//       // https://www.mapbox.com/mapbox-gl-js/api/#map
//       let map = new mapboxgl.Map({
//           container: 'map',
//           style: 'mapbox://styles/bsakbar/cjpiw7sr14mx72sq8n940y70a',
//           center: [15.319,29.721], // 6.513,19.669
//           zoom: 3,
//           pitch: 100,
//           bearing: 50,
//           interactive: false
//       });
//
//       let container = map.getCanvasContainer()
//       let svg = d3.select(container).append("svg")
//
//       let transform = d3.geoTransform({point: projectPoint}); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
//       let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
//       // #091116 < dark navy / #0a141c < navy / #f93d3d < red
//
//       let featureElement = svg.selectAll("path")
//         .data(geojson.features)
//         .enter()
//             .append("path")
//             // .attr("d", d3.geoPath().projection(transform))
//             .attr("stroke", "#f93d3d")
//             .attr("stroke-width", 0.5)
//             .attr("stroke-opacity", 0.5)
//             .attr("fill", "#0a141c")
//             .attr("fill-opacity", 0.9)
//             .style("fill", function(d) {
//                     if (d.properties.subregion == "Northern Africa") { return "red" }
//                     else 	{ return "black" }
//                   ;})
//         function projectPoint(lon, lat) {
//               let point = map.project(new mapboxgl.LngLat(lon, lat));
//           this.stream.point(point.x, point.y);
//         }
//       });
// }

var electricity_data = [];
d3.csv("data/access_electricity_data.csv", function(data) {
    electricity_data.push(data)
});
var primary_education = [];
d3.csv("data/Education/Countries/Primary_Countries_prc.csv", function(data) {
    primary_education.push(data)
});
var secondary_education = [];
d3.csv("data/Education/Countries/Secondary_Countries_prc.csv", function(data) {
    secondary_education.push(data)
});
var population = [];
d3.csv("data/Population.csv", function(data) {
    population.push(data)
});
var landarea = [];
d3.csv("data/Land_Area.csv", function(data) {
    landarea.push(data)
});


function electricity_tab() {
  var elements = document.getElementsByClassName("education-tab");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("electricity-tab");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }
}

function education_tab() {
  var elements = document.getElementsByClassName("education-tab");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }

  var elements = document.getElementsByClassName("electricity-tab");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }
}

function right_arrow() {
  var elements = document.getElementsByClassName("right-arrow");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }
}

function left_arrow() {
  var elements = document.getElementsByClassName("right-arrow");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }

  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }
}

// populating svg with country related data happens here!
function submit_arrow() {
  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("right-arrow");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var country = country_match(document.getElementById("country_textbox").value)
  if (country){

    var country_electricity, country_population, country_landarea;
    var country_education = [];
    for (let i=0; i<electricity_data.length; i++){
      if (country == electricity_data[i]["Country_Name"]){
        country_electricity = electricity_data[i]
      }
    }

    var school = false
    let schools = document.getElementsByName("school");
    for (var i=0; i<schools.length; i++){
       if (schools[i].checked == true){
         var school = schools[i].value
       }
    }
    if (!school){
      alert("Please select PRIMARY or SECONDARY education from the Education Tab")
      close_button()
      document.getElementById("country_textbox").value = country;
    } else {

      if(school == "PRIMARY"){
        for (let i=0; i<primary_education.length; i++){
          if (country == primary_education[i]["Country"]){
            country_education.push(primary_education[i])
          }
        }
      }else if(school == "SECONDARY"){
        for (let i=0; i<secondary_education.length; i++){
          if (country == secondary_education[i]["Country"]){
            country_education.push(secondary_education[i])
          }
        }
      }

      var year1 = parseInt(document.getElementById("YearRange1").value) + 2000;
      var year2 = parseInt(document.getElementById("YearRange2").value) + 2000;

      var gender = false
      let genders = document.getElementsByName("gender")
      for (var i=0; i<genders.length; i++){
         if (genders[i].checked == true){
           var gender = genders[i].value
         }
      }

      if (!gender){
      alert("Please select a Gender from the Education Tab")
      close_button()
      document.getElementById("country_textbox").value = country;
      } else {

        var this_gender, education_year1 = {}, education_year2 = {}

        for (let i=0; i<country_education.length; i++){
          this_gender = country_education[i]["Indicator"].split(",")[1].split(" ")[1]

          if(country_education[i]["Year"] == year1){
            education_year1[this_gender] = country_education[i]["Value"]
          }
          else if(country_education[i]["Year"] == year2){
            education_year2[this_gender] = country_education[i]["Value"]
          }
        }

        for (let i=0; i<population.length; i++){
          if (country == population[i]["Country Name"]){
            country_population = population[i]
          }
        }
        for (let i=0; i<landarea.length; i++){
          if (country == landarea[i]["Country Name"]){
            country_landarea = landarea[i]
          }
        }


        document.getElementById("country_title").innerHTML = country_electricity["Country_Name"]
        document.getElementById("country_desc").innerHTML = country_electricity["Country_Name"]

        document.getElementById("country_year1_main").innerHTML = year1
        document.getElementById("country_year2_main").innerHTML = year2
        document.getElementById("country_year1_bracket").innerHTML = year1
        document.getElementById("country_year2_bracket").innerHTML = year2
        document.getElementById("country_year1_desc").innerHTML = year1
        document.getElementById("country_year2_desc").innerHTML = year2

        // document.getElementById("region_bracket").innerHTML = region.toUpperCase()
        document.getElementById("school_bracket").innerHTML = school.toUpperCase() + " SCHOOL"
        document.getElementById("gender_bracket").innerHTML = gender.toUpperCase()

        var elec1 = parseFloat(country_electricity[year1]).toFixed(2)
        var elec2 = parseFloat(country_electricity[year2]).toFixed(2)
        var edu1m = parseFloat(education_year1['male']).toFixed(2)
        var edu2m = parseFloat(education_year2['male']).toFixed(2)
        var edu1f = parseFloat(education_year1['female']).toFixed(2)
        var edu2f = parseFloat(education_year2['female']).toFixed(2)
        if (isNaN(elec1)){ elec1 = "--" }
        if (isNaN(elec2)){ elec2 = "--" }
        if (isNaN(edu1m)){ edu1m = "--" }
        if (isNaN(edu2m)){ edu2m = "--" }
        if (isNaN(edu1f)){ edu1f = "--" }
        if (isNaN(edu2f)){ edu2f = "--" }
        // console.log(edu1m,edu2m,edu1f,edu2f)

        document.getElementById("year1_access_electricity").innerHTML = elec1 + "%"
        document.getElementById("year2_access_electricity").innerHTML = elec2 + "%"
        document.getElementById("year1_males").innerHTML = edu1m + "%"
        document.getElementById("year2_males").innerHTML = edu2m + "%"
        document.getElementById("year1_females").innerHTML = edu1f + "%"
        document.getElementById("year2_females").innerHTML = edu2f + "%"

        document.getElementById("year1_males_plot").setAttribute('d', "M447,681v-"+(edu1m/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(edu1m/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")
        document.getElementById("year1_females_plot").setAttribute('d', "M420,681v-"+(edu1f/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(edu1f/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")
        document.getElementById("year1_electricity_plot").setAttribute('d', "M394,681v-"+(elec1/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(elec1/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")
        document.getElementById("year2_males_plot").setAttribute('d', "M447,910v-"+(edu2m/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(edu2m/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")
        document.getElementById("year2_females_plot").setAttribute('d', "M420,910v-"+(edu2f/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(edu2f/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")
        document.getElementById("year2_electricity_plot").setAttribute('d', "M394,910v-"+(elec2/100*120)+"c2.3-2.3,3.7-3.7,6-6h11v"+(elec2/100*120)+"c-2.3,2.3-3.7,3.7-6,6h-11z")


        // Population
        var popyear1 = parseInt(country_population[year1])
        var popyear2 = parseInt(country_population[year2])
        var popyear1_d = "M1367.2,445.9v18l13,13h"+(popyear1/Math.max(popyear1,popyear2)*200)+"v-18l-13,-13Z"
        var popyear2_d = "M1367.2,485.2v18l13,13h"+(popyear2/Math.max(popyear1,popyear2)*200)+"v-18l-13,-13Z"

        document.getElementById("population_year1").innerHTML = year1
        document.getElementById("population_year1_value").innerHTML = popyear1.toLocaleString()
        document.getElementById("population_box_year1").setAttribute('d', popyear1_d)
        document.getElementById("population_year2").innerHTML = year2
        document.getElementById("population_year2_value").innerHTML = popyear2.toLocaleString()
        document.getElementById("population_box_year2").setAttribute('d', popyear2_d)

        var population_desc = "The population has incresed by "+parseInt(100*Math.abs(popyear1-popyear2)/Math.min(popyear1,popyear2))+"% in "+Math.abs(year1-year2)+" years"
        document.getElementById("population_desc").innerHTML = population_desc

        document.getElementById("landarea").innerHTML = parseInt(country_landarea[2017]).toLocaleString()
        document.getElementById("map").style.display = "none"
        document.getElementById("map2").style.display = "none"

        var elements = document.getElementsByClassName("country-svg");
        elements['country-map'].src="SVG/"+country_electricity["Country_Name"]+".svg"

        for (let i=0; i<elements.length; i++){
          elements[i].style.display = "block"
        }
      }
    }
  } else {
    alert("Please check Country Name and fill all Electrcity and Education inputs");
    close_button()
  }
}


// function error_handeling(country_electricity,education_year1,education_year2,school,gender,country_population,year1,year2){
//   if (){
//     alert("Please Check Country Name and Fill all Electrcity and Education Inputs");
//     close_button()
//     return false
//   } else if () {
//     alert("Please Check Country Name and Fill all Electrcity and Education Inputs");
//     close_button()
//     return false
//   } else if () {
//     alert("Please Check Country Name and Fill all Electrcity and Education Inputs");
//     close_button()
//     return false
//   } else if () {
//     alert("Please Check Country Name and Fill all Electrcity and Education Inputs");
//     close_button()
//     return false
//   } else if (country_population[year1] == NaN) {
//     alert("We don not have population data for "+year1);
//     close_button()
//     return false
//   } else if (country_population[year2] == NaN) {
//     alert("We don not have population data for "+year2);
//     close_button()
//     return false
//   } else {
//     return true;
//   }
// }


function close_button(){

  document.getElementById("map").style.display = "block"
  var evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);

  var elements = document.getElementsByClassName("country-svg");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  // resetting all buttons
  var elements = document.getElementsByClassName("radio");
  for (let i=0; i<elements.length; i++){
    elements[i].checked = false
  }
  document.getElementById("country_textbox").value = "";
  document.getElementById("YearRange1").value = "6";
  document.getElementById("YearRange2").value = "10";
  document.getElementById("YearRange").value = "5";

  document.getElementById('year1_slider_value').innerHTML = 2006
  document.getElementById("year1_slider_location").setAttribute('transform', "translate(287.107 624.906) rotate(-90)")
  document.getElementById('year2_slider_value').innerHTML = 2010
  document.getElementById("year2_slider_location").setAttribute('transform', "translate(396.643 624.906) rotate(-90)")

  right_arrow()
  electricity_tab()

}


function year1_slider(){
  var year = document.getElementById("YearRange1").value
  var newYear = 122.804 + 27.3839*year
  var location = "translate("+newYear+" 624.906) rotate(-90)"
  document.getElementById('year1_slider_value').innerHTML = (2000+Number(year)).toLocaleString().split(',').join('')
  document.getElementById("year1_slider_location").setAttribute('transform', location)
}

function year2_slider(){
  var year = document.getElementById("YearRange2").value
  var newYear = 122.804 + 27.3839*year
  var location = "translate("+newYear+" 624.906) rotate(-90)"
  document.getElementById('year2_slider_value').innerHTML = (2000+Number(year)).toLocaleString().split(',').join('')
  document.getElementById("year2_slider_location").setAttribute('transform', location)
}



// <!--Make sure the form has the autocomplete function switched off:-->
// <form autocomplete="off" action="/action_page.php">

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde","Central Arfrican Republic","Chad","Comoros","Democratic Republic of Congo","Congo","Cote d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Nauro","Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Swaziland","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
window.onload=function(){
    autocomplete(document.getElementById("country_textbox"), countries);
}


function country_match(country){
  for (let i=0; i<countries.length; i++){
    if (country == countries[i]){
      return electricity_data[i]["Country_Name"]
    }
  }
  for (let i=0; i<electricity_data.length; i++){
    if (country == electricity_data[i]["Country_Name"]){
      return country
    }
  }
  return false
}
