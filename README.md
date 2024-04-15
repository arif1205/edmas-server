# Edmas Server

**Introduction:**  
Edmas Server is a Node.js Express TypeScript project that serves as the backend for the Edmas application. This documentation provides instructions on how to set up and run the Edmas Server locally.

- **Host provider:** Render
- **Cloud provider:** Cloudinary
- **Database provider:** Railway app
  **Live:** https://edmas-server.onrender.com

### To Run locally:

**Prerequisites:**  
Node.js installed on your machine.  
Preferred version: `v21.6.1`  
To check version: `node -v`

If not installed, please download and install from Nodejs Download

pnpm package manager installed globally  
To install: `npm install -g pnpm`  
To check version: `pnpm -v`

Postgresql DB installed on your machine.  
Preferred version: `v16+`  
To check version: `psql -v`  
If not installed, please download and install from Postgresql Download

**Cloudinary:** Register an account in cloudinary to store the files. In your dashboard you will have your own api key and secrets. Save them in a place. Will need in later

#### Steps:

- Open the terminal: `cd Desktop` (May change according to os)
- Clone the Git Repository: `git clone ​​https://github.com/arif1205/edmas-server.git`
- Navigate to the Project Directory: `cd edmas-server`
- Install Dependencies using pnpm: `pnpm install` (make sure that pnpm installed globally)
- Update .env file: Create a .env file in the root of the project (edmas-server). And paste the inside of it.

```
CLOUD_NAME=<your cloudinary provider name>
CLOUD_API_KEY=<your cloudinary api key>
CLOUD_API_SECRET=<your cloudinary api secret>
DATABASE_URL=<Your local database url>
PORT=5454
JWT_SECRET=<any string as a password>
```

- Create an uploads folder in the root
- Start the Development Server: `pnpm dev` This command will start the development server and host it on port 5454.
