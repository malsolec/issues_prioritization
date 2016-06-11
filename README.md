###About:
App for people to vote on priority of issues from github. The idea is to let non-technical people take part in Open Source project.

##You need:
- npm  
- mongoDb - https://docs.mongodb.com/manual/installation/

##First steps:

- Clone repo : 
```
git clone https://github.com/malsolec/issues_prioritization.git
```
- Install dependencies: 
```
npm install
```
- Install plugin: 
```
npm install mongoose-auto-increment
```
- Go to public folder and install ngDragable plugin https://github.com/fatlinesofcode/ngDraggable : 
```
bower install ngDraggable
```
- Run mongodb: mongod.exe
- Run app from project directory: 
```
node server.js
```
### To see how it works now:

Go on localhost:8080,

- [ ] Click **Add** button  
- [ ] Set github repository on: **issues_prioritization**
- [ ] Set github owner name on: **malsolec** 

and you will see issues from my repo:)

### If you would like to join the project it is open.
You can see first idea of this app in [doc](https://github.com/malsolec/issues_prioritization/blob/master/doc/idea.pdf) folder on repo. 

