# A Employee Performance Review System

### General steps to follow while creating a project are

### Description and Features
 - Admin view
 - - Add/remove/update/view employees
 - - Add/update/view performance reviews
 - - Assign employees to participate in another employee's performance review
 - Employee view
 - - List of performance review requiring feedback
 - - Submit feedback
 - Make 1 login for admin and employee
 - An employee can register, only admin can make an employee an admin


### Tech Stack
 - NodeJS,ExpressJS,MongDB,EJS,JavaScript,HTML,CSS


 - Data
	- MongoDB
        - Models/Collections
            - Users
            - PerformanceData

### For Admin user
    -Create account with email "admin@admin.com"

 
- Functions used in controllers(in code)
    - In Users Controller
        - SignIn,SignUp -> Is used for either login or to signup a user
        - create -> Is used for creating a user/employee
        - login -> when user logins it displays dashboard page/home page
        - destroySession -> to terminate the session/signout
        - add_review[For admin] -> this is to give reviews and get all the respective reviews of a user[For admin]
        - updateUser[For admin] -> to update the employee/user details
        - deleteuser[For admin] -> to delete the employee

    - In Home Controller
        - all
            -For Admins-> it displays all the users/employees available with all the features available for admins.
            -For Employees ->it displays reviews to be given and reviews the user has got.
        - assign_work[For admin] -> this is to display for giving/assigning tasks to employees.
        - create[For Admin] -> this is used to create an task for the employee.
        - update[For Admin and Employees] -> this is used to update review by admins and submit reviws by employee
        - addEmployes[For Admin] -> this is to create a new employee details.