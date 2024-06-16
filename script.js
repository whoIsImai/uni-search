let ListOfCountrie = document.querySelector(".disp-country");
let results = document.querySelector(".results");
let countrySearch = document.querySelector(".txtSearch");
const country_Url = "https://api.first.org/data/v1/countries";

async function GetCountries() {
    try {
        const Response = await fetch(country_Url);
        if(!Response.ok){
            throw new Error("Could not get Countries");
        }
        const jsonData = await Response.json()
        for (const country in jsonData.data) {
            if (jsonData.data.hasOwnProperty(country)) {
               var mcountry = jsonData.data[country]
                ListOfCountrie.innerHTML += `<h4>${mcountry.country}</h4><h4>,  </h4>  `   
            }
        }
    } catch (error) {
        ListOfCountrie.innerHTML = "<h4>Could not get countries</h4>"
    }
}
GetCountries();

async function GetUniversities() {
    try {
    let word = countrySearch.value;
    const Uni_Url = `http://universities.hipolabs.com/search?country=${word}`;
        const Resp = await fetch(Uni_Url);
        if (!Resp.ok) {
            throw new Error("Invalid Search")
        }
        const jsonData = await Resp.json();
        jsonData.forEach(Uni => {
           results.innerHTML += `<div style="border: 1px Solid black;
                                    width: fit-content;
                                    margin: 0.5em;
                                    padding: 1.5em;
                                    display: Inline-Block;">
           <h3 style="text-align:Center; margin-top:0px;">${Uni.name}</h3><br>
           <label><b>Website :</b>
          <a href=${Uni.web_pages} target="_blank"> ${Uni.web_pages}<a/>
          </label><br>
          <label><b>Domain</b> : ${Uni.domains}</label><br>
          <label><b>Country :</b> ${Uni.country}</label><br>
          <label><b>Alpha two code :</b> ${Uni.alpha_two_code}</label>
           </div>
           `
        });

    } catch (error) {
       results.innerHTML = `Could not get universities ${error}`
    }
}

