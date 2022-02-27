# swe-foam

Instructions to run Project Locally

- The project is a monolith with the backend running on port 5002 and the front end on 3000. I have added a proxy the package.json to be able to run the front end and back end concurrently.
- To start the project in Development mode, run `npm run dev`. This spins up both the front end and back end.
- Installed packages can be found in the `package.json` file
- I have added a `.env.example` file to show the required keys for running the project.

Note

- I more or less completed the MVP. I was going to work on pagination but that seemed to be taking a while so I shelved it
- The API for fetching pictures has been structured to deliver 50 pictures per page. I had that setup before shelving the idea of pagination
- I am not too familiar with how AWS S3 works, but basically what I did what to seed the data from the S3 bucket to my mongodb and eventually do all the work with my seeded data. The script for seeding and deleting data can be found in `package.json`.
- Using dropdowns and radio buttons would help with keyboard navigation.
