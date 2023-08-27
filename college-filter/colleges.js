// I've included both the universities full names and their nicknames
// use the nicknames for this assignment.  I've included the full names
// so those who aren't familiar with Bay Area universities will know
// what the names of the universities actually are.
document.getElementById("updateButton").addEventListener("click", filterUnis);

window.onload = function () {
  document.getElementById("dontcare").checked = true;
  let numUnis = univArray.length;
  let includedUniversities = new Array(numUnis).fill(true);
  displayUnis(includedUniversities);
};

function filterUnis() {
  let numUnis = univArray.length;
  let includedUniversities = new Array(numUnis).fill(true);
  let uniType = document.getElementById("searchSpecifications").elements["classification"].value;
  let maxTuition = +document.getElementById("maxTuition").value;
  let maxSAT = +document.getElementById("maxSAT").value;
  let minSAT = +document.getElementById("minSAT").value;
  let sortByTuition = false;
  let sortByMaxSAT = false;
  let sortByMinSAT = false;
  let sortByType = true;
  if (maxTuition && maxTuition > 0) {
    sortByTuition = true;
  }
  if (maxSAT && maxSAT > 0) {
    sortByMaxSAT = true;
  }
  if (minSAT && minSAT > 0) {
    sortByMinSAT = true;
  }
  if (uniType == "dontcare") {
    sortByType = false;
  }
  for (let i = 0; i < numUnis; i++) {
    let currUni = univArray[i];
    let addUni = true;
    if (sortByTuition && currUni.tuition > maxTuition) {
      addUni = false;
    }
    if (sortByMaxSAT && currUni.SATh > maxSAT) {
      addUni = false;
    }
    if (sortByMinSAT && currUni.SATl < minSAT) {
      addUni = false;
    }
    if (sortByType && currUni.ownership != uniType) {
      addUni = false;
    }
    if (!addUni) {
      includedUniversities[i] = false;
    }
  }
  displayUnis(includedUniversities);
}

function displayUnis(includedUniversities) {
	let table = document.getElementById("table").children[0];
	numRows = table.children.length;
    for (let i = 1; i < numRows; i++) {
		table.removeChild(table.children[1]);
	  }
	let numIncludedUnis = 0;
	includedUniversities.map(included => numIncludedUnis += included);
	let addedUnis = 0;
	for (let i = 0; i < includedUniversities.length; i++) {
		if (includedUniversities[i]) {
			addedUnis += 1;
			let row = table.insertRow()
			let cell1 = row.insertCell();
			let cell2 = row.insertCell();
			let cell3 = row.insertCell();
			let cell4 = row.insertCell();
			cell1.innerHTML = univArray[i].nickname;
			cell1.setAttribute("class", "nameCol");
			cell2.innerHTML = univArray[i].SATh;
			cell2.setAttribute("class", "SATCol");
			cell3.innerHTML = univArray[i].SATl;
			cell3.setAttribute("class", "SATCol");
			cell4.innerHTML = formatPrice(univArray[i].tuition);
			cell4.setAttribute("class", "tuitionCol");
			if (addedUnis == numIncludedUnis) {
				row.setAttribute("id", "lastRow")
			}
			if (addedUnis % 2 == 0) {
				row.setAttribute("class", "oddRows")
			}
		}
		
	}
}

// Make 1234 look like $1,234.00
function formatPrice(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
}






var univArray = new Array(
  {
    name: "Stanford University",
    nickname: "Stanford",
    ownership: "private",
    SATh: 1570,
    SATl: 1380,
    tuition: 44757,
  },
  {
    name: "University of California, Berkeley",
    nickname: "UC Berkeley",
    ownership: "public",
    SATh: 1500,
    SATl: 1250,
    tuition: 13844,
  },
  {
    name: "University of California, Santa Cruz",
    nickname: "UC Santa Cruz",
    ownership: "public",
    SATh: 1280,
    SATl: 1000,
    tuition: 13398,
  },
  {
    name: "San Francisco State University",
    nickname: "SFSU",
    ownership: "public",
    SATh: 1110,
    SATl: 880,
    tuition: 6468,
  },
  {
    name: "San Jose State University",
    nickname: "SJSU",
    ownership: "public",
    SATh: 1160,
    SATl: 880,
    tuition: 9496,
  },
  {
    name: "Sonoma State University",
    nickname: "Sonoma State",
    ownership: "public",
    SATh: 1090,
    SATl: 880,
    tuition: 7276,
  },
  {
    name: "California State University, East Bay",
    nickname: "CalState East Bay",
    ownership: "public",
    SATh: 1010,
    SATl: 800,
    tuition: 6550,
    room: 6435,
  },
  {
    name: "University of San Francisco",
    nickname: "USF",
    ownership: "private",
    SATh: 1270,
    SATl: 1070,
    tuition: 41450,
  },
  {
    name: "Santa Clara University",
    nickname: "SCU",
    ownership: "private",
    SATh: 1380,
    SATl: 1190,
    tuition: 43812,
  },
  {
    name: "Mills College",
    nickname: "Mills College",
    ownership: "private",
    SATh: 1250,
    SATl: 1040,
    tuition: 42918,
  }
);
