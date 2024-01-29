## Steps to Setup the Repo Locally

**Install the Dependecies**

```
    pnpm install
```

**create a .env file and copy .env.example to .env**

```
    cp .env.example .env
```

**Run this for getting the NEXTAUTH_SECRET**

```
   openssl rand -base64 32
```

**Start your Docker**

```
   docker compose up -d
```

**Start the Server**

```
   pnpm run dev
```
