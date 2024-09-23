# Kucing PAW Adoption Service Documentation

![Cat](./manja-vitolic-gKXKBY-C-Dk-unsplash.jpg)

Welcome to the Kucing PAW Adoption Service! This online service provides an easier way for customers of and employees at Kucing PAW Adoption Center, with our key features such as:
- Easily manage your beloved cats in our online database (powered by MongoDB).
- Find cats to adopt, give them a loving forever home :3
- Browse a catalog of our top services rated 5/5 by every cats, ever. 

You can also use this service for your own animal adoption service! More on deploying your own instance of Kucing PAW services in the next sections.

## Dependencies

This project depends on:
- Node.js and Express.js for Backend and Middleware services
- Mongoose and MongoDB for database communication
- Next.js and Tailwind for everything Frontend
- npm to manage node packages
- Git for version controlling

## Deploy Your Own Kucing PAW

To deploy your own instance of the Kucing PAW services, start by installing all the dependencies:

```bash
npm install express dotenv body-parser cookie-parser cors mongoose jsonwebtoken morgan
```

and clone our public repository (using HTTPS):

```bash
git clone https://github.com/fabian4819/cat-service-paw.git
```

(or SSH):

```bash
git clone git@github.com:fabian4819/cat-service-paw.git
```

## Folder Structure

To customize your Kucing PAW instance, you can start from the folder structure to see how the project is managed.

.env \
index.js \
src \
├── controllers \
├── models \
└── routes 

Context:
- The `index.js` page is the main page. Here, you can customize the port of your web service.
- You should specify your own `.env` file to store the path to your mongoDB cluster.
- `models` is the folder for all of your models (tables in the MongoDB database). You should work on this first before going to other folders.
- `controllers` is the folder for all of your CRUD functions. You should work on this after making your models.
- `routes` is the folder for all of your endpoints. You should work on this after you have created your models and your controllers.

## API Endpoints

We have created a CRUD + sorting + search by keyword functionality for all the models as a template for your own Kucing PAW instance. The default URL for the development environment is in the local machine with port 5000. Here are the details for the Cat model, every model basically has the same endpoints thus you only need to change `cat` to `[model_name]`:

| Business Case                                               | URL                                     | Method | Arguments              |
|-------------------------------------------------------------|-----------------------------------------|--------|------------------------|
| Add a new cat                                               | localhost:5000/cat/create               | POST   | -                      |
| Get all existing cats in the database                       | localhost:5000/cat/read                 | GET    | -                      |
| Update cat's data                                           | localhost:5000/cat/update/:id           | PUT    | id                     |
| Delete a cat :(                                             | localhost:5000/cat/delete/:id           | DELETE | id                     |
| Sort cats by field ascendingly or descendingly              | localhost:5000/cat/sort?sortBy=[field]&SortOrder=[desc]          | GET | field, desc                     |
| Search by keyword                                           | localhost:5000/cat/search?keyword=[keyword]          | GET | keyword                     |

## Credits

Made by:
- 22/496484/TK/54400 Bagas Pujangkoro
- 22/505501/TK/55319 Habib Fabian Fahles
- 22/492727/TK/53940 Rama Sulaiman Nurcahyo
- 22/496725/TK/54440 Wulan Tiarahayu
- 22/496507/TK/54405 Fidelya Fredelina