

var padding = { top: 20, right: 50, bottom: 0, left: 0 },
    w = 550 - padding.left - padding.right,
    h = 550 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();

//randomNumbers = getRandomNumbers();

var data = [
    { "label": "Mac & Cheese", "value": 1, "question": "What is Kraft known for?" }, // padding
    { "label": "Green Bean Casserole", "value": 2, "question": "What dish do you put fried onion on top of?" }, //font-family
    { "label": "Spaghetti", "value": 3, "question": "What dish is a Cajun class?" }, //color
    { "label": "Chicken Pot Pie", "value": 4, "question": "What dish is a New Iberia 'must-have'?" }, //font-weight
    { "label": "Crawfish Ettoufee", "value": 5, "question": "What do New Iberia Cajuns like to eat?" }, //font-size
    { "label": "Jambalaya", "value": 6, "question": "What did Mike bring to Friendsgiving?" }, //background-color
    { "label": "Piggy in the Blanket", "value": 7, "question": "What Jesus turned water into?" }, //nesting
    { "label": "Pepper Jelly Meatballs", "value": 8, "question": "What is it when you smash bread up and pour lots of condensed milk on it?" }, //bottom
    { "label": "Spring rolls", "value": 9, "question": "What are Richard's sausage and Trappey's beans together called?" }, //sans-serif
    { "label": "Ham & Cheese Sliders", "value": 10, "question": "What is Cafe Du Monde known for?" }
];



var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("fill", "")
    .attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");

var vis = container
    .append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
    .attr("text-anchor", "end")
    .text(function (d, i) {
        return data[i].label;
    });
container.on("click", spin);
function spin(d) {

    container.on("click", null);
    //all slices have been seen, all done
    console.log("OldPick: " + oldpick.length, "Data label: " + data.length);

    if (oldpick.length == data.length) {
        console.log("done");
        container.on("click", null);

        return;
    }

    var ps = 360 / data.length,
        pieslice = Math.round(1440 / data.length),
        rng = Math.floor((Math.random() * 1440) + 360);

    rotation = (Math.round(rng / ps) * ps);

    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? (picked % data.length) : picked;
    if (oldpick.indexOf(picked) !== -1) {
        d3.select(this).call(spin);
        return;
    } else {
        oldpick.push(picked);
    }
    rotation += 90 - Math.round(ps / 2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function () {
            //mark question as seen
            d3.select(".slice:nth-child(" + (picked + 1) + ") path")

            //populate question
            d3.select("#question h1")
                .text(data[picked].question);
            oldrotation = rotation;

            /* Get the result value from object "data" */
            console.log(data[picked].label)
            alert(`Yay! You got ${data[picked].label}!`);
            /* Comment the below line for restrict spin to sngle time */
            container.on("click", spin);
        });
}
//make arrow
svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
    .style({ "fill-opacity=.8;": "" });



//draw spin circle
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ "fill": "white", "cursor": "pointer" });
//spin text
container.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({ "font-weight": "bold", "font-size": "30px" });


function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}








const baseURL = `https://potluck-capstone-daravy.herokuapp.com/guests`


const form = document.querySelector('#rsvp')
const firstNameInput = document.querySelector('#firstName')
const lastNameInput = document.querySelector('#lastName')
const phoneInput = document.querySelector('#phoneNumber')
const dishSelectedInput = document.querySelector('#dishSelected')
const guestList = document.querySelector('#guest-list')

function handleSubmit(e) {
    e.preventDefault()

    if (firstNameInput.value < 1) {
        alert('You must enter your first name.')
        return
    }

    //let userRSVP = document.querySelector('input[class="submit"]:clicked').value
    let body = {
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        phonenumber: phoneInput.value,
        dishselected: dishSelectedInput.value

    }
    console.log(body)

    axios.post('https://potluck-capstone-daravy.herokuapp.com/guests', body)
        .then(() => {
            firstNameInput.value = ''
            lastNameInput.value = ''
            phoneInput.value = ''
            dishSelectedInput.value = '',
                //document.querySelector('#submit') = clicked
                alert(`Thank you for your RSVP!`)

        })

}
/*
let defaultObject = {
    firstName: "Mj",
    lastName: "DeRouen",
    phoneNumber: "(444) 343-3221",
    dishSelected: "Mac and Cheese"
}


function getGuests() {
    axios.get('https://potluck-capstone-daravy.herokuapp.com/guests')//http://localhost:4000/guests
        .then(res => {
            console.log(res.data)
            const guest = res.data
            //debugger
            const { firstname, lastname, phonenumber, dishselected } = guest;

            firstNameInput.value = firstname
            lastNameInput.value = lastname
            phoneInput.value = phonenumber
            dishSelectedInput.value = dishselected

        })




}
*/

function deleteCard(id) {
    axios.delete(`https://potluck-capstone-daravy.herokuapp.com/guests/${id}`)
        .then(() => getGuests())
        .catch(err => console.log(err))
}

function getGuests() {
    guestList.innerHTML = ''

    axios.get('https://potluck-capstone-daravy.herokuapp.com/guests/')
        .then(res => {
            res.data.forEach(elem => {
                let guestCard = `<div class="guest-card">
                    <h2>${elem.firstname} ${elem.lastname}</h2>
                    <h3> ${elem.dishselected}</h3>
                    <button onclick="deleteCard(${elem['guest_id']})">Delete</button>
                    </div>
                `

                guestList.innerHTML += guestCard
            })
        })
}


function addToList() {
    //get value from input
    var value = document.getElementById("inputTextGrocery").value;
    //alert that the text box is empty
    if (value === "") {
        alert('To add an item, type its name into the box')
    }
    else {
        //create a list item element
        var li = document.createElement("li");
        var textNode = document.createTextNode(value);
        //append value to list item
        li.appendChild(textNode);
        document.getElementById("list").appendChild(li);
        li.className = "item";
        //add an X to each list item
        var close = document.createElement("SPAN");
        var closeNode = document.createTextNode("X");
        close.appendChild(closeNode);
        li.appendChild(close);
        close.className = "close";
    };
};

//have X remove list item on click
document.addEventListener("click", function (event) {
    if (event.target.className == "close")
        event.target.parentElement.style.display = "none";
});

//when an li is clicked toggle class which either adds or removes linethrough
document.addEventListener("click", function (event) {
    if (event.target.tagName == "LI")
        event.target.classList.toggle("check");
});





getGuests()
form.addEventListener('submit', handleSubmit)
form.reset()






