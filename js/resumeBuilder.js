// resumeBuilder.js

// This contains data objects specific to my bio, skills and projects 
// Added extra features:
//	** use of the tipped.js library to add additional information on each skill
//	** added links for each project image

var bio = {
	"name" : "Lorraine Figueroa",
	"role" : "Software Engineer",
	"welcomeMessage" : "Java Developer, Learning Web Development!",
	"biopic" : "images/avatar03.jpg",
	"contacts" : {
		"mobile" : "555-555-5555",
		"email" : "nyguerrillagirl@brainycode.com",
		"github" : "nyguerrillagirl",
		"twitter" : "@nyguerrillagirl",
		"location" : "Philadelphia"
	},
	"skills" : ["Java", "C++", "Spring Framework", "Oracle", "HTML", "CSS", "JavaScript",  "R", "SDL"],
	/* Added to 'show' more information when someone hovers over a skill */
	"skillsInfo" : ["Over 10 years experience building Java Applications and Network Tools",
					"Over 20 years experience in C and C++ applications (video game samples)",
					"Over 4 years experience with STS and Spring Web Application Tools",
					"Over 15 years experience with Oracle Database Development (SQL, SQLPlus, SQLDeveloper)",
					"Knowledge with building HTML-based web pages and applications",
					"Knowledge in using CSS to enhance web pages with style",
					"Knowledge building web applications with JavaScript and popular libraries",
					"R Programming for Statistical Analysis of Data",
					"Simple DirectMedia Library (SDL) video game applications"],
	"attachInfoTips" :  function () {
			for (var i=0; i < bio.skillsInfo.length; i++) {
 				Tipped.create('.skillsInfo' +i, bio.skillsInfo[i], { position: 'topleft' });
			}	


	},
	"display" : function() {
		// Display the name and title
		var formattedName = HTMLheaderName.replace("%data%", "Lorraine Figueroa");
		var formattedRole = HTMLheaderRole.replace("%data%", "Software Engineer");

		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);
		// Display the various contact information
		if (bio.contacts) {
			// append contacts to the top
			for (contactIterator in bio.contacts) {
				var contactInfo = contactIterator + " " + bio.contacts[contactIterator];
				// topContacts
				contactInfo = HTMLcontactGeneric.replace("%contact%", contactIterator);
				contactInfo = contactInfo.replace("%data%", bio.contacts[contactIterator]);
				$("#footerContacts").append(contactInfo);
			}

			// append contacts to the footer
			for (contactIterator in bio.contacts) {
				var contactInfo = contactIterator + " " + bio.contacts[contactIterator];
				contactInfo = HTMLcontactGeneric.replace("%contact%", contactIterator);
				contactInfo = contactInfo.replace("%data%", bio.contacts[contactIterator]);
				$("").append(contactInfo);
			}

		}
		// Display my image and Welcome message
	    if (bio.biopic) {
			$("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
		}
		$("#header").append(HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage));

		if (bio.skills && (bio.skills.length > 0)) {
			// append the skills to the page
			$("#header").append(HTMLskillsStart);
			for (var i=0; i < bio.skills.length; i++) {
				var skillElement = HTMLskills.replace("%data%", bio.skills[i]);
				// attach class to be used to associate skill info tip after page loads
				var classSkillsInfo = "skillsInfo" + i;
				skillElement = skillElement.replace("%info%", classSkillsInfo);
				$("#skills").append(skillElement);
			}	

		}

	}
};



var education = {
	"schools" : [
		{
			"name" : "City College of New York",
			"location" : "NYC",
			"degree" : "BS",
			"majors": "Computer Science",
			"dates" : "1987",
			"url" : "http://www.ccny.cuny.edu/"
		},
		{
			"name" : "City College of New York",
			"location" : "NYC",
			"degree" : "MS",
			"majors": "Computer Science",
			"dates" : "1989",
			"url" : "http://www.ccny.cuny.edu/"
		}
	],
	"onlineCourses" : [	{
			"school" : "Coursera",
			"title": "The Data Scientist’s Toolbox",
			"date" : "12/2014",
			"url" : "https://www.coursera.org/"
		},{
			"school" : "Coursera",
			"title": "R Programming",
			"date" : "1/2015",
			"url" : "https://www.coursera.org/"
		},
		{
			"school" : "Udacity",
			"title": "HTML and CSS",
			"date" : "01/2015",
			"url" : "https://www.udacity.com/"
		},
		{
			"school" : "Udacity",
			"title": "Git and GitHub",
			"date" : "1/2015",
			"url" : "https://www.udacity.com/"
		},
		{
			"school" : "Udacity",
			"title": "JavaScript Basics",
			"date" : "1/2015",
			"url" : "https://www.udacity.com/"
		},
		{
			"school" : "Udacity",
			"title": "Intro to jQuery",
			"date" : "1/2015",
			"url" : "https://www.udacity.com/"
		}
	],
	"display" : function() {
		// display formal education information
		if (education.schools && education.schools.length > 0) {
			for (school in education.schools) {
				// add an education entry div element
				$("#education").append(HTMLschoolStart);
				var edLine1 = HTMLschoolName.replace("%data%", education.schools[school].name) + 
									HTMLschoolDegree.replace("%data%", education.schools[school].degree)
				$(".education-entry").last().append(edLine1);
				$(".education-entry").last().append(HTMLschoolDates.replace("%data%", education.schools[school].dates));
				$(".education-entry").last().append(HTMLschoolLocation.replace("%data%", education.schools[school].location));
				$(".education-entry").last().append(HTMLschoolMajor.replace("%data%", education.schools[school].majors));
			}
		}

		// display online education information
		if (education.onlineCourses && education.onlineCourses.length > 0) {
			$("#education").append(HTMLonlineClasses);
			for (school in education.onlineCourses) {
				// add an education entry div element
				$("#education").append(HTMLschoolStart);
				var edLine1 = HTMLonlineTitle.replace("%data%", education.onlineCourses[school].title) + 
								HTMLonlineSchool.replace("%data%", education.onlineCourses[school].school);
				$(".education-entry").last().append(edLine1);
				$(".education-entry").last().append(HTMLonlineDates.replace("%data%", education.onlineCourses[school].date));
				$(".education-entry").last().append(HTMLonlineURL.replace("%data%", education.onlineCourses[school].url));
			}

		}


	}
};

var work = {
	"jobs" : [{
		"employer" : "AT&T",
		"title" : "Principal Member of Technical Staff",
		"location" : "Middletown, NJ",
		"dates" : "11/1995 - Present",
		"description" : "Lead Developer for the Enterprise IP Management Tools"
	},
	 {
		"employer" : "Brainycode",
		"title" : "Software Engineer",
		"location" : "Philadelphia, PA",
		"dates" : "1/2010 - Present",
		"description" : "Managing/Hosting web site to teach kids how to code"
	 },
	 {
		"employer" : "Ocean County College",
		"title" : "Computer Studies Lecturer",
		"location" : "Toms River, NJ",
		"dates" : "9/2000 - 6/2009",
		"description" : "Taught courses on Assembly Language, C++, Java, and Game Design."
	 }],
	 "display" : function () {
		// Output all the jobs in our work object
		for (jobIterator in work.jobs) {
			//alert("processing a job: " + work.jobs[jobIterator].employer);
			$("#workExperience").append(HTMLworkStart);
			var jobEmployer = HTMLworkEmployer.replace("%data%", work.jobs[jobIterator].employer);
			var jobTitle = HTMLworkTitle.replace("%data%", work.jobs[jobIterator].title);
			$(".work-entry:last").append(jobEmployer + jobTitle);
			$(".work-entry:last").append(HTMLworkLocation.replace("%data%",  work.jobs[jobIterator].location));
			$(".work-entry:last").append(HTMLworkDates.replace("%data%",  work.jobs[jobIterator].dates));
			$(".work-entry:last").append(HTMLworkDescription.replace("%data%",  work.jobs[jobIterator].description));

		}
	}
};




var projects= {
	"projects" : [ {
		"title" : "Nanodegree in Front-End Web Development",
		"dates" : "12/2014 - Present",
		"description" : "Taking a series of courses to learn tools and technology for web development",
		"images" : [
			{	src: "images/HTML5_Logo_512.png",
			   	link:  "http://en.wikipedia.org/wiki/HTML5",
			   	alt: "HTML5 Logo"}, 
			{	src: "images/css3-logo.png",
				link: "http://www.w3schools.com/css/css3_intro.asp",
				alt: "CSS3 Logo"}, 
			{	src: "images/javascript-logo-png.png",
				link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
				alt: "JavaScript Logo"}, 
			{	src: "images/bootstrap.png",
				link: "http://getbootstrap.com/",
				alt: "Bootstrap Logo"}, 
			{	src: "images/git-logo.png",
				link: "http://git-scm.com/",
				alt: "Git Logo" }, 
			{	src: "images/GitHub.jpg",
				link: "https://github.com/",
				alt: "GitHub Logo" }
		]
	},
	{
		"title" : "John Hopkins University Data Science",
		"dates" : "12/2014 - Present",
		"description" : "Taking a series of courses learning tools and technology for Data Science",
		"images" : [
			{ 	src: "images/bloomberg.small.horizontal.blue-Coursera.png",
				link: "https://www.coursera.org/specialization/jhudatascience/1",
				alt: "Coursera Data Science Logo"}, 
			{	src: "images/R-Programming.png",
				link: "http://www.r-project.org/",
				alt: "R Programming Logo"}
		]
	},
	{
		"title" : "Exploring Mini-Languages to Teach kids how to code",
		"dates" : "06/2014 - Present",
		"description" : "Hosting Talks on Learning to Make Games using Java, Scratch, Alice, Kodu, Karel The Robot",
		"images" : [{ 	src:"images/JavaLogo.png",
						link: "https://www.java.com/en/",
						alt: "Java Logo"}, 
					{	src:"images/ScratchBlogLogo.jpg",
						link: "http://scratch.mit.edu/",
						alt: "Scratch Programming Logo"}, 
					{	src: "images/alice3_logo.png",
						link: "http://www.alice.org/index.php",
						alt: "Alice 3 Logog"}, 
					{	src: "images/kodu2.jpg",
						link: "http://www.kodugamelab.com/",
						alt: "Kodu Logo"}, 
					{ 	src: "images/KarelLogo.jpg",
						link: "http://en.wikipedia.org/wiki/Karel_%28programming_language%29",
						alt: "Karel the Robot Logo"}]
	}
	],
	"display" : function() {
				for (projectIterator in projects.projects) {
					$("#projects").append(HTMLprojectStart);
					var projectTitle = HTMLprojectTitle.replace("%data%", projects.projects[projectIterator].title);
					var projectDates = HTMLprojectDates.replace("%data%", projects.projects[projectIterator].dates);
					var projectDescription = HTMLprojectDescription.replace("%data%", projects.projects[projectIterator].description);
					$(".project-entry:last").append(projectTitle);
					$(".project-entry:last").append(projectDates);
					$(".project-entry:last").append(projectDescription);	
					// process each image associated with this project (extra: attach web link and alt attribute)
					for (imageIterator in projects.projects[projectIterator].images) {
						var aProjectImage = HTMLprojectImage.replace("%data%", projects.projects[projectIterator].images[imageIterator].src);
						aProjectImage = aProjectImage.replace("%link%", projects.projects[projectIterator].images[imageIterator].link);
						aProjectImage = aProjectImage.replace("%altTag%", projects.projects[projectIterator].images[imageIterator].alt);						
						$(".project-entry:last").append(aProjectImage);
					}
				}
			}
};

function displayResumeInformation() {
	// Populate page with RESUME information - HERE
	bio.display();
	work.display();
	projects.display();
	education.display();
	$("#mapDiv").append(googleMap);
}

displayResumeInformation();

