# TSOA Starter Kit

A starter kit based on [tsoa](https://tsoa-community.github.io/docs/) framework, express js and typescript.

To run the project do

    npm install
    npm start

To run the app in development mode

    npm run dev

after `npm install`

To build the app do

    npm run build

The app listen on port `3000` but can be changed by PORT environment variable

## Database creation

DB scripts are given in **database** sub folder (`schema.sql`). You have to execute the db script explicitly. 
Starter Kit also provides test api routes that rely on mongodb

## Further Development

The models the application use, are in **models** sub directory. The db entities and field names follow name with underscore naming convention (`snake_case`), eg. `user_id`, in db, while the models in the application, use corresponding `camelCase` names, eg. `userId`.

The SqlBuilder and Mapper utils have options to automatically convert `snake_case` to `camelCase` and vis versa.

## NOTES

This project is configured to use nodejs version 16 and above.