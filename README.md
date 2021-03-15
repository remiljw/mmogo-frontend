# Mmogo Frontend
- This is the front end of the Mmogo assessment, you should follow this set up only if you have followed the set up at https://github.com/remiljw/mmogo

- For some reasons the deployed app at https://mmogo-webapp.netlify.app/ returns 404 when trying to add favorites and the app at https://mmogo-frontend.vercel.app/request returns 405 when trying to do the same. Best to run on your local machine.
## Setup
- Clone this repo
- cd into the cloned repo
- run `npm install` to install dependencies
- Go the actions folder and change the `const url` in both files on line 18 and 25 respectively  to the port of the backend server. i.e: `http://localhost:8000` 
- Set the proxy variable in package.json to the port of the backend server as in the preceeding step.
- run `npm start`
- You are good to go. Test the app.
