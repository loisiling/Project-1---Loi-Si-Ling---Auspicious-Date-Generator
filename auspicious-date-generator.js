/* This js file generates the list of personal aupicious & inauspicious dates for May 2022 */

let dateInput = document.getElementById("birthdate");
let yearOfBirth;
let yearOf2022 = "tiger"

const date = new Date();

//Function to render Calendar
const renderCalendar = () => {

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1

    date.setMonth(4);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];

    document.querySelector('.date p').innerHTML = new Date().toDateString()

    let days = ""

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class = "previousDay"> ${prevLastDay - x + 1} </div>`
    }

    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class = "today" id="day${i}">${i}</div>`;
        } else {
            days += `<div id="day${i}" >${i}</div>`;
        }
    }
    monthDays.innerHTML = days;

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="nextDate"> ${j} </div>`;
        monthDays.innerHTML = days;
    }
}


//When DOB is inputted, the year of birth is saved and used for further processing
dateInput.addEventListener("input", () => {
    let dateString = dateInput.value.toString();
    yearOfBirth = dateString.substring(0, 4);
    console.log(yearOfBirth);
})

//When submit button is pressed, aupicious/inauspicious dates are generated 
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {

    // 1) Create array list containing kvp of animal/day pairing in May 2022
    let monthAnimal = [
        { day: "1", animal: "tiger" }, { day: "2", animal: "rabbit" }, { day: "3", animal: "dragon" }, { day: "4", animal: "snake" },
        { day: "5", animal: "horse" }, { day: "6", animal: "goat" }, { day: "7", animal: "monkey" }, { day: "8", animal: "rooster" },
        { day: "9", animal: "dog" }, { day: "10", animal: "pig" }, { day: "11", animal: "rat" }, { day: "12", animal: "ox" },
        { day: "13", animal: "tiger" }, { day: "14", animal: "rabbit" }, { day: "15", animal: "dragon" }, { day: "16", animal: "snake" },
        { day: "17", animal: "horse" }, { day: "18", animal: "goat" }, { day: "19", animal: "monkey" }, { day: "20", animal: "rooster" },
        { day: "21", animal: "dog" }, { day: "22", animal: "pig" }, { day: "23", animal: "rat" }, { day: "24", animal: "ox" },
        { day: "25", animal: "tiger" }, { day: "26", animal: "rabbit" }, { day: "27", animal: "dragon" }, { day: "28", animal: "snake" },
        { day: "29", animal: "horse" }, { day: "30", animal: "goat" }, { day: "31", animal: "monkey" }
    ];

    // 2) Create array list containing kvp of animals and year. (Every 12 years = 1 animal)
    let yearBornMappedToAnimal = [];
    let birthYear = 1922; //Dog
    let listOf12Animals = ["dog", "pig", "rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster"];
    let animalIndex = 0;
    for (i = 0; i < 2022; i++) {
        animalIndex = i % listOf12Animals.length;
        const animal = listOf12Animals[animalIndex];
        const obj = { birthYear, animal };
        yearBornMappedToAnimal.push(obj);
        birthYear = birthYear + 1;
        animalIndex = animalIndex + 1;
    };

    // 3) Create array list containing key value pair of animal - animal clashes
    let animalAnimalClash = [
        { animal1: "rat", animal2: "horse" }, { animal1: "horse", animal2: "rat" }, { animal1: "ox", animal2: "goat" }, { animal1: "goat", animal2: "ox" },
        { animal1: "tiger", animal2: "monkey" }, { animal1: "monkey", animal2: "tiger" }, { animal1: "rabbit", animal2: "rooster" }, { animal1: "rooster", animal2: "rabbit" },
        { animal1: "dragon", animal2: "dog" }, { animal1: "dog", animal2: "dragon" }, { animal1: "snake", animal2: "pig" }, { animal1: "pig", animal2: "snake" }

    ];
    // 4) Create array list of 3 killings mapping
    let threeKillings = [
        { killing: "water", animals: ["dragon", "monkey", "rat"] },
        { killing: "fire", animals: ["dog", "tiger", "horse"] },
        { killing: "wood", animals: ["goat", "pig", "rabbit"] },
        { killing: "metal", animals: ["snake", "ox", "rooster"] }
    ];


    // 5) Create array list of 10 ferocious and big disaster days (Will skip as not present in May)

    // 6) Create array list of 4 Seperating Days (Will skip as not present in May)
    let fourSeparatingDays = ["03-20", "06-20", "09-22", "12-21"];

    // 7) Create array list of 4 Extinct Days
    let fourExtinctDays = ["02-03", "05-05", "08-08", "11-07"];

    // 8) After DOB is inputted, generate animal based on DOB. 
    let mapping = yearBornMappedToAnimal.filter((x) => {
        return x.birthYear == yearOfBirth;
    })
    let animalBasedOnDOB = mapping[0].animal;

    // 9) Identify general bad dates to avoid: 
    // 9.1 - Year Breaker Days -> Put in another list dates whereby the animal sign of the current year clashes with the day
    let clashObject = animalAnimalClash.filter((x) => {
        return x.animal1 == yearOf2022;
    })
    let animalClash = clashObject[0].animal2

    let yearBreakerDaysArray = monthAnimal.filter((x) => {
        return x.animal == animalClash
    })

    //console.log(yearBreakerDaysArray);

    // 9.2 - Month Breaker Days -> Put in another list days whereby the animal sign of the current month clashes with the animal sign of the current day
    //From 1st-4th May - Month branch is Dragon
    //From 5th-31st May - Month branch is Snake

    let clashObjectDragon = animalAnimalClash.filter((x) => {
        return x.animal1 == "dragon";
    })

    let animalClashDragon = clashObject[0].animal2

    let dragonClashes = monthAnimal.filter((x) => {
        return x.animal == animalClashDragon
    })

    let dragonClashesMay = dragonClashes.filter((x) => {
        return parseInt(x.day) <= 4
    })

    //console.log(dragonClashesMay);

    //dragonClashesMay

    let clashObjectSnake = animalAnimalClash.filter((y) => {
        return y.animal1 == "snake";
    })

    let animalClashSnake = clashObjectSnake[0].animal2

    let snakeClashes = monthAnimal.filter((x) => {
        return x.animal == animalClashSnake
    })

    let snakeClashesMay = snakeClashes.filter((x) => {
        return parseInt(x.day) > 4
    })

    // console.log(snakeClashesMay);
    //snakeClashesMay

    // 9.3 - Three Killing Days (Year) -> Put in another list clashing days based on the animal of the year

    const threeKillingsFunction = (inputtedAnimal) => {

        let threeKillingsAnimal = threeKillings.filter((x) => {
            return x.animals.includes(inputtedAnimal);
        });

        let conflictingThreeKillings = null;

        if (threeKillingsAnimal[0].killing == "fire") {
            conflictingThreeKillings = ["pig", "rat", "ox"];
        } else if (threeKillingsAnimal[0].killing == "water") {
            conflictingThreeKillings = ["snake", "horse", "goat"]
        } else if (threeKillingsAnimal[0].killing == "metal") {
            conflictingThreeKillings = ["tiger", "rabbit", "dragon"]
        } else if (threeKillingsAnimal[0].killing == "wood") {
            conflictingThreeKillings = ["monkey", "rooster", "dog"]
        }
        const conflictingThreeKillingsDays = monthAnimal.filter((x) => {
            return (x.animal == conflictingThreeKillings[0] ||
                x.animal == conflictingThreeKillings[1] ||
                x.animal == conflictingThreeKillings[2])
        })

        return conflictingThreeKillingsDays;
    }

    let yearlyThreeKillings = threeKillingsFunction(yearOf2022)
    // console.log(yearlyThreeKillings);

    // 9.4 - Three Killing Days (Month) -> Put in another list clashing days based on the animal of the month
    //From 1st-4th May - Month branch is Dragon
    //From 5th-31st May - Month branch is Snake

    let dragonThreeKillings = threeKillingsFunction("dragon").filter((x) => {
        return parseInt(x.day) <= 4;
    })

    let snakeThreeKillings = threeKillingsFunction("snake").filter((x) => {
        return parseInt(x.day) > 4;
    });

    // console.log(dragonThreeKillings);
    // console.log(snakeThreeKillings);

    // 9.5 - 10 Ferocious and Big Disaster Days (Will skip as not present in May)

    // 9.6 - Put in another list Four Separating Days (Will skip as not present in May)

    // 9.7 - Put in another list Four Extinct Days "05-05"

    let extinctDayMay = monthAnimal.filter((x) => {
        return x.day == "5"
    })

    // console.log(extinctDayMay);

    // 9.8 - Put in another list all days that clash with DOB animal
    let personalDateAnimalClash = animalAnimalClash.filter((x) => {
        return x.animal1 == animalBasedOnDOB
    })

    let personalDateClashes = monthAnimal.filter((x) => {
        return x.animal == personalDateAnimalClash[0].animal2
    })

    // console.log(personalDateClashes);

    // 9.9 - Identify Success Days based on chart and put in list
    //From 1st-4th May - Month branch is Dragon, corresponding success day is rat
    //From 5th-31st May - Month branch is Snake, corresponding success day is ox

    let successDaysMay = monthAnimal.filter((x) => {
        return ((x.animal == "rat" && parseInt(x.day) <= 4) || (x.animal == "ox" && parseInt(x.day) > 4))
    })

    // 9.10 - Identify Receive Days based on chart and put in list
    //From 1st-4th May - Month branch is Dragon, corresponding receive day is ox
    //From 5th-31st May - Month branch is Snake, corresponding success day is tiger

    let receiveDaysMay = monthAnimal.filter((x) => {
        return ((x.animal == "ox" && parseInt(x.day) <= 4) || (x.animal == "tiger" && parseInt(x.day) > 4))
    })

    // 10) Compile the list to generate the results 

    let combinedBadDays = [...yearBreakerDaysArray, ...dragonClashesMay, ...snakeClashesMay, ...yearlyThreeKillings,
    ...dragonThreeKillings, ...snakeThreeKillings, ...extinctDayMay, ...personalDateClashes];

    //To remove duplicates:
    let combinedBadDaysWithDuplicatesRemoved = [];
    combinedBadDays.forEach((x) => {
        if (!combinedBadDaysWithDuplicatesRemoved.includes(x)) {
            combinedBadDaysWithDuplicatesRemoved.push(x)
        }
    })


    let finalBadDays = combinedBadDaysWithDuplicatesRemoved.sort((a, b) => { return a.day - b.day });
    console.log(finalBadDays);

    let combinedGoodDays = [...successDaysMay, ...receiveDaysMay]
    let combinedGoodDaysWithDuplicatesRemoved = [];
    combinedGoodDays.forEach((x) => {
        if (!combinedGoodDaysWithDuplicatesRemoved.includes(x)) {
            combinedGoodDaysWithDuplicatesRemoved.push(x);
        }
    })
    let intermediateGoodDays = combinedGoodDaysWithDuplicatesRemoved.sort((a, b) => { return a.day - b.day });
    // console.log(intermediateGoodDays);

    let finalGoodDays = [];
    intermediateGoodDays.forEach((x) => {
        if (!finalBadDays.includes(x)) {
            finalGoodDays.push(x);
        }
    })
    console.log(finalGoodDays);

    let averageDays = [];
    monthAnimal.forEach((x) => {
        if (!finalBadDays.includes(x) && !finalGoodDays.includes(x)) {
            averageDays.push(x);
        }
    })
    console.log(averageDays);

    //Convert final days to string format

    let stringFinalBadDays = finalBadDays.map((x) => {
        return ` May ${x.day} 2022 `;
    })

    let stringFinalGoodDays = finalGoodDays.map((x) => {
        return ` May ${x.day} 2022 `;
    })

    let stringAverageDays = averageDays.map((x) => {
        return ` May ${x.day} 2022 `;
    })

    document.getElementById("inauspicious").disabled = false;
    document.getElementById("auspicious").disabled = false;
    document.getElementById("others").disabled = false;
    document.getElementById("inauspicious").checked = true;

    document.getElementById("resultsHere").innerHTML = stringFinalBadDays;

    //Add event listeners to radio button - Not sure why it has to be inside submit
    document.getElementById("inauspicious").addEventListener("click", () => {
        document.getElementById("resultsHere").innerHTML = stringFinalBadDays;
    })

    document.getElementById("auspicious").addEventListener("click", () => {
        document.getElementById("resultsHere").innerHTML = stringFinalGoodDays;
    })

    document.getElementById("others").addEventListener("click", () => {
        document.getElementById("resultsHere").innerHTML = stringAverageDays;
    })

    renderCalendar()

    finalBadDays.forEach(element => {
        let id = 'day'+element.day.toString();
        document.getElementById(id).style.backgroundColor = "black"
    });

    finalGoodDays.forEach(element => {
        let id = 'day'+element.day.toString();
        document.getElementById(id).style.backgroundColor = "red"
    })

    averageDays.forEach(element => {
        let id = 'day'+element.day.toString();
        document.getElementById(id).style.backgroundColor = "grey"
    })

})

window.addEventListener('load', () => {
    renderCalendar()
})


// document.querySelector('.prev').addEventListener('click', () => {
//     date.setMonth(date.getMonth() - 1);
//     renderCalendar();
// })

// document.querySelector('.next').addEventListener('click', () => {
//     date.setMonth(date.getMonth() + 1);
//     renderCalendar();
// })