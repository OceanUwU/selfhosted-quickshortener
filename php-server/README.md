# alternative php server
## setup
from the `/php-server` directory:
1. create `cfg.php`:
    ```php
    <?php
    $random_length = 4;
    $key = "v3uSzCuahqA7v22i"; //https://www.random.org/strings/?num=1&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
    ```
2. copy `empty-data.db` and name the copy `data.db`