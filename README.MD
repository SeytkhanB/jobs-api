#### Project Setup

In order to spin up the project, in the root create .env with four variables, with your own values.

PORT
MONGO_URI
JWT_SECRET_KEY
JWT_LIFETIME

After that run this command

```bash
npm install && npm start
```

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
