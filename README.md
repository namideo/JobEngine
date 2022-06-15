# JobVerse - A universe of Jobs
JobVerse is a MERN application which provides a platform for posting and applying for Jobs. This application features two different roles: Employer and Job Seeker. This allows employers to Post jobs and Edit positions while helping job seekers Apply for positions. A User with access can benefit from these features dependng on their roles.

This application is full stack which uses MERN (MongoDB, ExpressJS, ReactJS, NodeJs) with Semantic UI, GraphQL, Authetication module(JWT), and Mongoose ODDM for database. The application was deployed using Heroku.

Features of the application include
* The application loads with a Unique Application Name, a Navigation bar with links to "Explore Jobs" and "Login/SignUp", and a search form to key in words to find job results.
* With an on click search, it displays jobs linked with the keyword.
* Authetication will not be required to view a list of Jobs, but to proceed futher, a user must login in order to complete the next steps.
* A user can go to the Navbar to "Login" if they already have an account or "SignUp" if they are a new user.
* In the SignUp form, a user must select if he/she is an Employer or a Job Seeker, then provide deatils and sign up.
* As a Job Seeker, when I log in to the application, there is an option to view job details in the Search Results. 
* When the user selects the "Details" button they are taken to the Job Page which provides them with a description of the position and a list of details such as Salary Range, Desired Skills, Required Experience, as well as an option to "Apply".
* When selecting the "Apply" button the user is prompted with an application form which requires contact information, a section for any additional notes or questions to the employer, and a tentative joining date.
* Upon submitting the application form, the user is taken to the Dashboard where they can view jobs he/she has applied for.
* As an Employer, a user can log in to Post a new job opening, View applicants for a job he/she has posted, Edit the number of open positions available, or Delete the post once the position is filled.
* By selecting "Post a Job" in the NavBar, an employer can fill the job requirement details and Post the Job in the Portal.
* On posting the Job, employer will be taken to the daahboard which is displayed with Jobs emplyer has posted.
* An Employer can also view the number of applications recieved for a specified job in the Dashboard.
* From here an Employer can view details of the applicant by clicking on the "Details" button on the Dashboard.
* During the Job Opening intake process, an employer can update the Open Positions field for the job within the dashboard.
* On closing the position, an employer is able to Delete the Job Posting from the site.


## Mock-Up

The following image is the application screen shot:

![Screen shot shows the application mock up](./Assets/JobVerse.PNG)

## Application Deployed Url

Below is link for application deployed using Heroku

[The JobVerse](https://jobverse.herokuapp.com/)




