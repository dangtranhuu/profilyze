const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');



exports.streak = async (req, res) => {
  try {
    const user = req.query['user'];
    const response = await axios.get(`https://streak-stats.demolab.com?user=${user}`);
    htmlString = response.data;
    // Phân tích chuỗi HTML bằng cheerio
    const $ = cheerio.load(htmlString);


    // Lấy thông tin về current streak
    const currentStreakInfo = $('g:contains("Current Streak")').next().find('text').text().trim();
    const currentStreakNumber = currentStreakInfo.match(/\d+/)[0];
    const currentStreakRange = $('g:contains("Current Streak")').next().next().find('text').text().trim();

    console.log(`Current Streaks: ${currentStreakNumber}`);

    // // Xây dựng đường dẫn tương đối đến tệp hình ảnh
    // const imagePath = path.join(__dirname, '..', 'assets', 'images', '3d-fire.png');

    // console.log(imagePath)
    // // Đọc dữ liệu base64 của hình ảnh từ tệp
    // const imageData = fs.readFileSync(imagePath, 'base64');
    const imageData = "https://github.com/theanishtar/count-viewer/blob/main/app/assets/images/3d-fire.png?raw=true";

    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20" role="img"
        aria-label="Streaks: 41">
        <title>Streaks: 41</title>
        <style>
          a:hover #llink {
            fill: url(#b);
            stroke: #ccc
          }

          a:hover #rlink {
            fill: #4183c4
          }
        </style>
        <linearGradient id="a" x2="0" y2="100%">
          <stop offset="0" stop-color="#fcfcfc" stop-opacity="0" />
          <stop offset="1" stop-opacity=".1" />
        </linearGradient>
        <linearGradient id="b" x2="0" y2="100%">
          <stop offset="0" stop-color="#ccc" stop-opacity=".1" />
          <stop offset="1" stop-opacity=".1" />
        </linearGradient>
        <g stroke="#d5d5d5">
          <rect stroke="none" fill="#fcfcfc" x="0.5" y="0.5" width="78" height="19" rx="2" />
          <rect x="84.5" y="0.5" width="21" height="19" rx="2" fill="#fafafa" />
          <rect x="84" y="7.5" width="0.5" height="5" stroke="#fafafa" />
          <!-- Thay thế đoạn mã icon GitHub bằng icon Streak -->
          <path d="M84.5 6.5 l-3 3v1 l3 3" stroke="d5d5d5" fill="#fafafa" />
        </g>
        <!-- Thay thế dữ liệu base64 của icon GitHub bằng dữ liệu base64 của icon Streak -->
        <image x="5" y="3" width="14" height="14" xlink:href="${imageData}" />
        <g aria-hidden="true" fill="#333" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif"
          text-rendering="geometricPrecision" font-weight="700" font-size="110px" line-height="14px">
          <rect id="llink" stroke="#d5d5d5" fill="url(#a)" x=".5" y=".5" width="78" height="19" rx="2" /><text
            aria-hidden="true" x="475" y="150" fill="#fff" transform="scale(.1)" textLength="510">Streaks</text><text
            x="475" y="140" transform="scale(.1)" textLength="510">Streaks</text><text aria-hidden="true" x="945" y="150"
            fill="#fff" transform="scale(.1)" textLength="130">${currentStreakNumber}</text><text id="rlink" x="945" y="140"
            transform="scale(.1)" textLength="130">${currentStreakNumber}</text>
        </g>
      </svg>
    `;

    // Set Content-Type header to tell the browser that the response is an SVG
    res.set('Content-Type', 'image/svg+xml');

    // Send the SVG string as the response
    res.send(svgString);
  } catch (err) {
    console.log(err);
    return res.json(err)
  }
};

