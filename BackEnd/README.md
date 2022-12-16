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
  Pour que l'application fonctionne normale, il faut créer deux dossier `pdc` et `facture`
  sur la racine du projet pour que les échanges des fichiers sont pris en charge.
  ces dossiers sont mis en `.gitignore` pendant la phase du dévéloppement à cause de sa lourde volume

- #### Etape 6 :
  Il est le temps de demmarer notre application à l'aide du commande `nodemon server.js`

## DOCUMENTATIONS

- ### Utilisateur

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

<details>
  <summary>Modifier l'Utilisateur </summary>

- <details>
  <summary>Request</summary>

  **NB** : Pour la modification ici, on peut modifier tout les champs en même temps ou ce que vous voulez modifier selon le demande de l'utilisateur. Mais par contre si vous allez modifier le pdc de l'utilsateur, les données à envoyer est alors en forme `multipart/form-data` avec le nom du champ du photo `pdc`. Le `mot de passe` et l'`username` ne sont pas pris en charge ici pour la raison de sa sécurité spécifique .

  ```http
  PATCH <host>:<port>/api/user/update
  authorization : Bearer Token

  formdata(
    "nom": string ,
    "prenom": string ,
    "cin": string,
    "adresse": string ,
    phone : string
    "pdc": file ,
  )
  ```

  Sinon, Envoyer tout simplement les données en `json`

  ```http
  PATCH <host>:<port>/api/user/update
  authorization : Bearer Token

  {
    "nom": string ,
    "prenom": string,
    "cin": string,
    "adresse": string ,
    "password": string,
    "phone" : string
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  {
    "message": "User <userId> updated successfully!"
  }
  ```

    </details>

  </details>

  - ### Impots

<details>
<summary>Payer un impot </summary>

- <details>
  <summary>Request</summary>

  **NB** : Pour prendre en compte le facture de l'utilsateur,
  Il faut envoyer les données en `multipart/form-data`
  avec le champ de la photo de facture nommé "facture"

  ```http
  POST <host>:<port>/api/impot/
  authorization : Bearer token

  formdata(
    "mois": string | required, (janvier, février, ...)
    "annee": year | required (2022, 2023, ...)
    "facture": file | required,
  )
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  {
    "message": "Impot created successfully!",
    "data": {
      "id": 2,
      "mois": "janvier",
      "annee": "2022",
      "facture": "http://127.0.0.1:3000/facture/facture__astuce.png1671159557189.png"
    }
  }
  ```

    </details>

  </details>

<details>
<summary>Historique par Utilusateur </summary>

- <details>
  <summary>Request</summary>

  ```http
  GET <host>:<port>/api/impot/history
  authorization : Bearer token
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  {
    "message": "Impot history successfully!",
    "data": [
      {
        "id": 1,
        "date_ajout": "2022-12-16T02:42:03.000Z",
        "mois": "décembre",
        "annee": 2022,
        "facture": "http://127.0.0.1:3000/facture/facture__astuce.png1671158523867.png"
      },
      {
        "id": 2,
        "date_ajout": "2022-12-16T02:59:17.000Z",
        "mois": "janvier",
        "annee": 2022,
        "facture": "http://127.0.0.1:3000/facture/facture__astuce.png1671159557189.png"
      }
    ]
  }
  ```

    </details>

  </details>
