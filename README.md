# Ticket Management System

A simple RESTful API for managing support tickets using Node.js, Express, and MongoDB. This system allows users to create, read, update, and delete tickets.

## Features
- Create new tickets
- Retrieve all tickets
- Retrieve a ticket by ID
- Update a ticket by ID
- Delete a ticket by ID










Installation

Follow the steps below to set up and run the Ticket Management System on your local machine.

1. Clone the Repository
First, clone the repository to your local machine using Git. If you don't have Git installed, you can download it from here.


Go to  terminal =>
git clone https://github.com/yourusername/ticket-management-system.git

2. Navigate to the Project Directory
Change your current directory to the project's root directory.


Go to  terminal =>

cd ticket-management-system

3. Install Dependencies
Install the required Node.js packages using npm.


Go to  terminal =>

npm install
This command reads the package.json file and installs all listed dependencies into a node_modules folder.

4. Configure Environment Variables (Optional)
By default, the application connects to a MongoDB instance running on mongodb://localhost:27017/ticket_management. If you wish to customize the MongoDB connection string or other configurations, you can use environment variables.

Create a .env File:

In the root directory of the project, create a file named .env and add below variables in .env file


PORT=3000
MONGODB_URI=mongodb://localhost:27017/ticket_management


5. Start MongoDB


Ensure that MongoDB is installed and running on your local machine.

Using MongoDB Community Edition:

Start MongoDB using the following command:


Go to  terminal =>

mongod
This will start the MongoDB server on the default port 27017.


6. Run the Application
Start the Node.js server using npm.

Go to  terminal =>

npm install
npm start 




"# ticket-management-system" 

