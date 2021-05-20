# QuickShortener

## Setting up server
1. clone this repository
2. navigate to the folder you just cloned into
3. `cd server`
4. `npm ci`
5. create `server/cfg.json` with the following contents:
    ```json
    {
        "port": 8469,
        "host": "https://links.example.com/",
        "randomLength": 4, //how long should random urls be?
        "key": "v3uSzCuahqA7v22i" //https://www.random.org/strings/?num=16&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
    }
    ```
    and edit them to your needs.
6. `npx sequelize-cli db:migrate`
7. `npm start`

## Setting up extension

### Chrome
(will do once extension is reviewed)

### Firefox
(will do once firefox extension is done)