# The Dungeoneers Toolkit Api

The Dungeoneer's Toolkit

## Project-Live

https://the-dungeoneers-toolkit.now.sh

- Make sure to click "Use Demo Account"

## App Summary

This app's primary function is to track your character sheets and let you roll dice to help you play games online.

- Sign in
- Navigate the Character Library, select a cahracter
- View the character stats/data
- Edit your character's information
- Use the dice roller, which takes your class and stats into account when it rolls!

## Technology

- Main technologies are React and CSS.
- Other technologies used: Jest- Testing, React-minimal-pie-chart, fortawesome for icons

## API Endpoints

### /characters

#### GET - requires jwt auth, will fetch all characters in the db

Objectkey/vals:
{
id: character.id,
name: character.name,
level: character.level,
role: character.role,
hp: character.hp,
strength: character.strength,
dexterity: character.dexterity,
constitution: character.constitution,
intelligence: character.intelligence,
wisdom: character.wisdom,
charisma: character.charisma,
imageURL: character.imageURL,
}

### /characters/id

#### GET - requires jwt auth, will fetch a single character in the db

Objectkey/vals:
{
id: character.id,
name: character.name
level: character.level
etc..

}

#### PATCH- requires jwt authorization, allows a user to update character info

Objectkey/vals:
{
id: character.id,
name: new name
level: new level
etc..

}

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone the-dungeoneers-toolkit NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm run migrate:test` & `npm test`

Migrate the migrations `npm run migrate`

Organize the code `npm run prettier`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch, and run a migration on the production.
