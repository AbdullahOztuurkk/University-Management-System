# University Management System
This project has been developed based on the Sivas Cumhuriyet University management system.

## Used Technologies
**Server** : NodeJS, Express, Prisma ORM

**Database** : Postresql


## Prisma ORM

#### Migrations implementation (Dev)

Before implement the migrations, you need to create a database that named same with given name to `DB_URL=...<DB_NAME>`. Then, you can run command on below 
```cli
npx prisma migrate dev
```

## User password which added manually to db

There is not a registry controller because of only admin can manipulate users. So, you might need a test user and we are friendly developers therefore we put a test password below of text for you.

```JSON
"pwd" : "1234",
"pwdHash" : "$2a$10$cVooIe/7i/8mZ6LwfQR/3.cG.TUqUUaz5w6QEwvearyTvmkINfTqu",
"pwdSalt" : "$2a$10$cVooIe/7i/8mZ6LwfQR/3."
```

## Installation

```bash
    # Install All Dependencies
    npm install
    
    # Run in Dev Mode
    npm run dev
```

  
