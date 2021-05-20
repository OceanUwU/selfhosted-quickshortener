`cd server`
`npm ci`
create `server/cfg.json`:
```json
{
    "port": 8469,
    "host": "http://localhost/",
    "randomLength": 4, //how long should random urls be?
    "key": "v3uSzCuahqA7v22i" //https://www.random.org/strings/?num=16&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
}
```
`npx sequelize-cli db:migrate`
`npm start`
(instructions for setting up extension here)