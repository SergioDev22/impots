## INSTALLATION

- #### Etape 1 :

  Cloner tout d'abord la repository contenant cet API
  `https://github.com/SergioDev22/impots.git`

- #### Etape 2 :

  Entrer dans le dossier BackEnd et installer alors les dépandances nécessaires
  `npm install`

- #### Etape 3 :

  Exporter le fichier `database.sql` pour créer la base de données dans votre propre logiciel de gestion de base de données.
  **RECOMMANDE:** `HeidiSQL: https://www.heidisql.com/`

- #### Etape 4 :

  Creer votre propre fichier `.env` à partir du fichier `.env.template` pour la configuration des variables d'environnement nécessaires

- #### Etape 5 :
  Il est le temps de demmarer notre application à l'aide du commande `nodemon server.js`

## DOCUMENTATIONS

- ### Utilisateurs

#### Registration et login

<details>
<summary>Inscription ou Registration</summary>

- <details>
  <summary>Request</summary>

  **NB** : Pour prendre en compte le PDC de l'utilsateur,
  Il faut envoyer les données en `multipart/form-data`
  avec le champ de la photo nommé "pdc"

  ```http
  POST <host>:<port>/api/user/subscribe
  formdata(
    "nom": string | required,
    "prenom": string | required,
    "cin": string | required,
    "adresse": string | NOT required,
    "username": string | required,
    "password": string | required,
    phone : string | required
    "pdc": file | NOT required,
  )
  ```

  Sinon, Envoyer tout simplement les données en `json`

  ```http
  POST <host>:<port>/api/v1/user/register
  {
    "nom": string | required,
    "prenom": string | required,
    "cin": string | required,
    "adresse": string | NOT required,
    "username": string | required,
    "password": string | required,
    phone : string | required
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {
        "message": "User registered successfully!",
        "data": {
            "id": <id>,
            "nom": <nom de l'utilisateur> ,
            "prenom": <prénom de l'utilisateur>,
            "cin": <numero cin de l'utilisateur>,
            "phone": <numero de téléphone de l'utilisateur>,
            "adresse": <adresse de l'utilisateur>,
            "pdcUrl": <Url de pdc de l'utilisateur>,
            "token": <token>
        }
    }
  ```

    </details>

  </details>

<details>
<summary>Connexion ou login </summary>

- <details>
  <summary>Request</summary>

  ```http
  POST <host>:<port>/api/user/login
  {
    "username": string | required,
    "password": string | required,
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {

        "message": "User logged in successfully!",
        "data": {
            "id": <id>,
            "nom": <nom de l'utilisateur> ,
            "prenom": <prénom de l'utilisateur>,
            "cin": <numero cin de l'utilisateur>,
            "phone": <numero de téléphone de l'utilisateur>,
            "adresse": <adresse de l'utilisateur>,
            "pdcUrl": <Url de pdc de l'utilisateur>,
            "token": <token>
        }
    }
  ```

    </details>

  </details>