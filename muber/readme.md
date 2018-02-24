App Diagram:
![app model](https://i.imgur.com/MXDkeXd.png)

Routes:
List of APIs
![list of APIs](https://i.imgur.com/gfmk4MG.png)

## Lecture 100
Chú ý ở HTTP POST request:
  - khi request gửi lên server, node ko ngay lập tức nhận hết toàn bộ data của request mà nó sẽ nhận từng gói data trong request một. Xem hình dưới:
  ![POST Request](https://i.imgur.com/EdAjSRZ.png)

-> dùng body-parser lib để handle việc này (là 1 middleware)

## Lecture 115
Setup environment
![Setup Dev and Test Environment](https://i.imgur.com/FX54hMZ.png)

## Lecture 116
![](https://i.imgur.com/KWOb5xM.png)

## Lecture 117 - Middleware
See diagram:
![Middleware](https://i.imgur.com/ZBLHn60.png)

Purpose:
- stand between requqest and reponse to modify request's data, process it and even error object