const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const axios = require('axios');
const { html } = require('html-template-tag');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

exports.signin = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const user = await User.findOne({ username: username });
    //console.log("currentUser", user);

    if (!user) {
      return res.status(400).json({
        message: "You are not allowed to access the system. Please contact administrator",
      });
    }
    else {
      if (user.password === password)
        return res.status(201).json({
          message: "Login was successful",
          user: {
            fullname: user?.fullname,
            username: user?.username,
            token: jwt.sign({ username: user?.username, role: user?.role }, config.secret, {
              expiresIn: "1d",
            }),
          },
        });
      return res.status(403).json({
        message: "Login was failed, username or password not same with our system!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.dangth = async (req, res) => {
  try {
    const treakStats = await axios.get(`https://streak-stats.demolab.com?user=theanishtar&theme=dark&disable_animations=false`);
    const mostUsedLanguages = await axios.get(`https://github-readme-stats.vercel.app/api/top-langs/?username=theanishtar&theme=react&hide_border=true&bg_color=0d1117&title_color=F85D7F&icon_color=F8D866&card_width=500px&langs_count=8&hide=css,html&layout=compact&PAT_1&disable_animations=false`);
    const gitHubStats = await axios.get(`https://github-readme-stats.vercel.app/api?username=theanishtar&theme=react&hide_border=true&bg_color=0d1117&title_color=F85D7F&icon_color=F8D866&card_width=500px&count_private=true&disable_animations=false&PAT_1`);
    const contributionGraph = await axios.get(`https://github-readme-activity-graph.vercel.app/graph?username=theanishtar&bg_color=0d1117&color=9e4c98&line=2f81f7&point=403d3d&area=true&hide_border=true`);
    res.set('Content-Type', 'image/svg+xml');

    // const combinedSVG = `
    //   <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    //     <foreignObject x="0" y="0" width="400" height="200">
    //       <body xmlns="http://www.w3.org/1999/xhtml">
    //         ${treakStats.data}
    //       </body>
    //     </foreignObject>
    //     <foreignObject x="0" y="200" width="400" height="200">
    //       <body xmlns="http://www.w3.org/1999/xhtml">
    //         ${mostUsedLanguages.data}
    //       </body>
    //     </foreignObject>
    //     <foreignObject x="0" y="400" width="400" height="200">
    //       <body xmlns="http://www.w3.org/1999/xhtml">
    //         ${gitHubStats.data}
    //       </body>
    //     </foreignObject>
    //     <foreignObject x="0" y="600" width="400" height="200">
    //       <body xmlns="http://www.w3.org/1999/xhtml">
    //         ${contributionGraph.data}
    //       </body>
    //     </foreignObject>
    //   </svg>
    // `;

    res.json({
      treakStats: treakStats.data,
      mostUsedLanguages: mostUsedLanguages.data,
      gitHubStats: gitHubStats.data,
      contributionGraph: contributionGraph.data
    });
  } catch (err) {
    console.log(err);
  }
};

exports.renderHTML = async (req, res) => {
  try {
    const user = req.query['user'] || `theanishtar`;
    const treakStats = await axios.get(`https://streak-stats.demolab.com?user=${user}&theme=dark&disable_animations=false`);
    const mostUsedLanguages = await axios.get(`https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&theme=react&hide_border=true&bg_color=0d1117&title_color=F85D7F&icon_color=F8D866&card_width=500px&langs_count=8&hide=css,html&layout=compact&PAT_1&disable_animations=false`);
    const gitHubStats = await axios.get(`https://github-readme-stats.vercel.app/api?username=${user}&theme=react&hide_border=true&bg_color=0d1117&title_color=F85D7F&icon_color=F8D866&card_width=500px&count_private=true&disable_animations=false&PAT_1`);
    const contributionGraph = await axios.get(`https://github-readme-activity-graph.vercel.app/graph?username=${user}&bg_color=0d1117&color=9e4c98&line=2f81f7&point=403d3d&area=true&hide_border=true`);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SVG Display</title>
        <style>
          .svg-container {
            width: 400px;
            margin-bottom: 20px;
          }
          .svg-container svg {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="svg-container">${treakStats.data}</div>
        <div class="svg-container">${mostUsedLanguages.data}</div>
        <div class="svg-container">${gitHubStats.data}</div>
        <div class="svg-container">${contributionGraph.data}</div>
      </body>
      </html>
    `;

    res.status(200).send(htmlContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.guest = async (req, res) => {
  try {
    const response = await axios.get(`https://streak-stats.demolab.com?user=theanishtar`);
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


