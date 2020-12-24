
let BASE_URL = "";
if(process.env.REACT_APP_SERVER_ENVIORNMENT==='dev'){
    BASE_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;
}
else{
    BASE_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;
}

module.exports = BASE_URL;

// BASE_URL = "http://13.233.56.140/api"