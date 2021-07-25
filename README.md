# IsThatCovidIA

This is a simple demo application to detect your COVID-19 case by inputs you provide to the application itself.<br />
For demo purposes, we use the provided **fake_dataset.json** file. 
So, to be able to use it truly, you have to provide your own a **true dataset.json** file respecting the same format as provided in `workspace/backend/src/_artifacts/fake_dataset.json`. 

## Installation

PS: 
- Use the node package manager [npm](https://nodejs.org/en/download/) with **node**.
- Do not forget to install [node-mongoDB driver](https://mongodb.github.io/node-mongodb-native/). 


To install frontend applications:

```bash
cd workspace/front
npm install
```

To install backend applications:

```bash
cd workspace/backend
npm install
```
## Usage

```
# Run mongodb first
- windows: mongod.exe
- linux: sudo systemctl start mongod or  sudo service mongodb start

# Run front
cd workspace/front
npm run serve

# Run backend
cd workspace/backend
npm start
```

## Screenshots

![Home Page](screenshots/1.PNG?raw=true "Title")
![Home Page Get Result](screenshots/2.PNG?raw=true "Title")
![About Us Page](screenshots/3.PNG?raw=true "Title")

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author

[Sohaieb Azaiez](https://www.linkedin.com/in/azsoh/)
