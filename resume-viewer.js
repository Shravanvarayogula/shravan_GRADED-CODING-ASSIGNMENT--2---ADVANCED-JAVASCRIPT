var i = 0;
var size = 0;

var previous = document.getElementById('previous-item');
var next = document.getElementById('next-item');
var resume = document.getElementById('resume-container');
var error = document.getElementById('error');


async function searchValue (s) {
 var searchkey = document.getElementById('search').value
 if (s === 'next') {
    i++;
 }
 if (s === 'previous') {
    i--;
 }

 await fetch('http://localhost:3000/resume/') 
            .then( response => response.json())
            .then (valueSet => {
                findSize(valueSet);
                if(searchkey.length == 0){
                    controller();
                    updatePage(valueSet);
                }
                else {
                    var valueSet = Object.values(valueSet).filter( value => {
                        return value.basics.AppliedFor.toLowerCase() == searchkey.toLowerCase();

                    });
                    findSize(valueSet);
                    controller();
                    if(size > -1) {
                        updatePage(valueSet);
                    }

                }

            })
            .catch(error => console.log(error.message));

}


const controller = function (){
    if(size == -1) {
        previous.style.visibility = 'hidden';
        next.style.visibility = 'hidden';
        resume.style.display = 'none';
        error.style.display = "flex";
        error.style.flexDirection = "row";
        error.style.justifyContent= "space-evenly";        
    }
    else if (size == 1) {
        previous.style.visibility = 'hidden';
        next.style.visibility = 'hidden';
        resume.style.display = 'block';
        error.style.display = "none";
    }

    else if (size > 0 ) {
        error.style.display = "none";
        if ( i == 0 ) {
        previous.style.visibility = 'hidden';
        next.style.visibility = 'visible';
        resume.style.display = 'block';
        }
        else if ( i == size) {
            previous.style.visibility = 'visible';
            next.style.visibility = 'hidden';
            resume.style.display = 'block';
        }
        else {
            previous.style.visibility = 'visible';
            next.style.visibility = 'visible';
            resume.style.display = 'block';
        }

        }

    }

const findSize = function (value) {
    size = Object.keys(value).length -1;
}

const updatePage = function (value) {
    header(value[i]);
    sidebar(value[i]);
    mainpage(value[i]);
    projects(value[i]);
    education(value[i]);
    internship(value[i]);
    acheivements(value[i]);
}

const header = function(value) {
    var headerelementupdate = `
        <div> 
            <h3 id="name"> ${value.basics.name} </h3> 
            <h4 id="designation"> Application For ${value.basics.AppliedFor} </h4> 
        </div> 
        <i class="fas fa-user" style="font-size: 90px; margin-right : 10%"> </i> 
    `
    document.getElementById('resume-header').innerHTML = headerelementupdate;
}

const sidebar = function(value) {
    var techSkills = "",hobbies = "";

    value.skills.keywords.map ( (items) => {techSkills += `<li> ${items}</li>`} );
    value.interests.hobbies.map((items) => {hobbies += `<li> ${items}</li>`});

    var sidebarelementupdate = `
    <!-- 1. Contact --> 
    <article class="objective-1">
    <h4 class="titles"> Personal Information </h4> 
    <ul class="details-list"> 
    <li>  ${value.basics.phone}</li> 
    <li>  ${value.basics.email}</li> 
    <li> <a href =${value.basics.profiles.url} target = "blank"> Linked In </a> </li> 
    </ul>
    </article>
    <!-- 2. Tech Skills --> 
    <article class="objective-1">
    <h4 class="titles"> Tech Skills </h4> 
    <ul class="details-list"> 
     ${techSkills}
    </ul>
    </article>

    <!-- 3. Hobbies --> 
    <article class="objective-1">
    <h4 class="titles"> Hobbies </h4> 
    <ul class="details-list"> 
     ${hobbies}
    </ul>
    </article> `
    document.getElementById('resume-left-info').innerHTML = sidebarelementupdate;
}

const mainpage = function(value) {
    var ele = ``
    var props = Object.getOwnPropertyNames(value.work);
    var vals = Object.values(value.work);
    vals.map((item, index) => {
        ele += `<p> <b> ${props[index]}: </b> ${item} </p>`
    })    
    document.getElementById('workExpDates').innerHTML = ele;
}

const projects = function(value) {
    var ele =` <p> <b> ${value.projects.name} </b> : ${value.projects.description} `
    document.getElementById('projects').innerHTML = ele;

}

const education = function(value) {
    var ele =``;
    var props = Object.values(value.education)
    var eduvals = ["UG","PG","High School"]
    eduvals.map((items,index) => {
        var names = Object.values(items);
        ele +=`<li> <b> ${eduvals[index]} </b>:`
        names.map((element) => {ele += `${element}, `})
        
        if(ele.endsWith(',')) {
            ele = ele.slice(0,-2);
        }
        ele +=`</li>`

    })
    document.getElementById('education').innerHTML = ele;

}

const  internship = function(value) {
    var ele = ``
    var props = Object.getOwnPropertyNames(value.Internship);
    var vals = Object.values(value.Internship);
    vals.map((item, index) => {
        ele += `<li> <b> ${props[index]}: </b> ${item} </li> `
    })    
    document.getElementById('internship').innerHTML = ele;
}


const acheivements = function(value) {
    var ele = ``;
    value.achievements.Summary.map((item) => { ele += `<li> ${item} </li> `}) ;
    document.getElementById('acheivements').innerHTML = ele
}