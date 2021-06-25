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
        "randomLength": 4, //how long should random urls be?
        "key": "v3uSzCuahqA7v22i" //https://www.random.org/strings/?num=1&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
    }
    ```
    and edit them to your needs (also remove the comments).
6. `npx sequelize-cli db:migrate`
7. `npm start`

## Setting up extension

### Chrome
(will do once extension is reviewed)

### Firefox
1. [Download the add-on](https://github.com/OceanUwU/selfhosted-quickshortener/releases/download/v1.1.0/quickshortener-1.1.0-fx.xpi)
2. Right click the extension icon in the top right of firefox
3. Click "Manage Extension"
4. Choose the "Options" tab
5. Fill in the options and click save
6. Go to the page of any link you want to shorten and click the extension icon to shorten it
