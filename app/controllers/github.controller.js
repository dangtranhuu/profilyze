const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const Github = require("../models/github.model");
const {bg_png, fire_png, sharingan_png} = require('../utils/base64/index');
const Technical = require("../models/techical.model");
const Background = require("../models/background.model");


function getClientIp(req) {
  let ipAddress = req.headers['x-forwarded-for'];
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['proxy-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['wl-proxy-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['http-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['http-x-forwarded-for'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.connection.remoteAddress;
    if (ipAddress === '::1') {
      // Get IPv4 address for localhost
      ipAddress = '127.0.0.1';
    }
  }
  return ipAddress;
}

exports.range = async (req, res) => {
  try {
    const user = req.query['user'] || 'theanishtar';
    const response = await axios.get(`https://streak-stats.demolab.com?user=${user}`);
    htmlString = response.data;
    // Phân tích chuỗi HTML bằng cheerio
    const $ = cheerio.load(htmlString);


    // Lấy thông tin về current streak
    const currentStreakInfo = $('g:contains("Current Streak")').next().find('text').text().trim();
    // const currentStreakRange = $('g:contains("Current Streak")').next().next().find('text').text().trim();
    // Biểu thức chính quy để tìm dòng chứa thông tin về khoảng thời gian
    const regex = /(\w+\s\d+\s-\s\w+\s\d+)/;

    // Sử dụng biểu thức chính quy để tìm kiếm dòng thỏa mãn và lấy ra thông tin
    const match = currentStreakInfo.match(regex);

    // Nếu có kết quả, lấy dòng thỏa mãn từ kết quả
    const currentStreakRange = match ? match[0] : null;

    console.log(`Current Streaks: ${currentStreakRange}`);

    const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="105" height="20" role="img" aria-label="${currentStreakRange}"><script xmlns="" id="nimlmejbmnecnaghgmbahmbaddhjbecg"/><script xmlns=""/><script xmlns=""/><script xmlns=""/><title>Current Streak Range</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="105" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="contributeUrl(#r)"><rect width="0" height="20" fill="#8a2be2"/><rect x="0" width="105" height="20" fill="#8a2be2"/><rect width="105" height="20" fill="contributeUrl(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="525" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="950">${currentStreakRange}</text><text x="525" y="140" transform="scale(.1)" fill="#fff" textLength="950">${currentStreakRange}</text></g><script xmlns=""/></svg>
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

exports.streak = async (req, res) => {
  try {
    const user = req.query['user'] || 'theanishtar';
    const response = await axios.get(`https://streak-stats.demolab.com?user=${user}`);
    htmlString = response.data;
    // Phân tích chuỗi HTML bằng cheerio
    const $ = cheerio.load(htmlString);


    // Lấy thông tin về current streak
    const currentStreakInfo = $('g:contains("Current Streak")').next().find('text').text().trim();
    const currentStreakNumber = currentStreakInfo.match(/\d+/)[0];
    // const currentStreakRange = $('g:contains("Current Streak")').next().next().find('text').text().trim();
    // Biểu thức chính quy để tìm dòng chứa thông tin về khoảng thời gian
    const regex = /(\w+\s\d+\s-\s\w+\s\d+)/;

    // Sử dụng biểu thức chính quy để tìm kiếm dòng thỏa mãn và lấy ra thông tin
    const match = currentStreakInfo.match(regex);

    // Nếu có kết quả, lấy dòng thỏa mãn từ kết quả
    const currentStreakRange = match ? match[0] : null;

    console.log(`Current Streaks: ${currentStreakRange}`);

    // // Xây dựng đường dẫn tương đối đến tệp hình ảnh
    // const imagePath = path.join(__dirname, '..', 'assets', 'images', '3d-fire.png');

    // console.log(imagePath)
    // // Đọc dữ liệu base64 của hình ảnh từ tệp
    // const imageData = fs.readFileSync(imagePath, 'base64');
    // const imageData = "https://github.com/theanishtar/count-viewer/blob/main/app/assets/images/3d-fire.png?raw=true";

    const imageData = "";

    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20" role="img"
        aria-label="${user} Streaks">
        <title>${user} Streaks</title>
        <style>
          a:hover #llink {
            fill: contributeUrl(#b);
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
        <!-- <image x="5" y="3" width="14" height="14" xlink:href="${imageData}" class="icon"/> 🔥 --> 
        <g aria-hidden="true" fill="#333" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif"
          text-rendering="geometricPrecision" font-weight="700" font-size="110px" line-height="14px" xlink:href="https://streak-stats.demolab.com/?user=${user}">
          <!-- Thay đổi giá trị của x và y để đặt icon vào vị trí mong muốn -->
          <text x="10" y="15"  font-size="15px" line-height="14px">🔥</text>
          <rect id="llink" stroke="#d5d5d5" fill="contributeUrl(#a)" x=".5" y=".5" width="78" height="19" rx="2" /><text
            aria-hidden="true" x="475" y="150" fill="#fff" transform="scale(.1)" textLength="510">Streaks</text><text
            x="475" y="140" transform="scale(.1)" textLength="510">Streaks</text><text id="rlink" aria-hidden="true" x="945" y="150"
            fill="#000000" transform="scale(.1)" textLength="180">${currentStreakNumber}</text>
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

exports.profile = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const user = req.query['user'] || 'theanishtar';
    const name = req.query['name'] || 'TRAN HUU DANG';
    const template = req.query['template'] || `basic`;
    const response = await axios.get(`https://streak-stats.demolab.com?user=${user}`);
    let contributions = await Github.find({ username: user });
    let view_profile = 1;

    if (contributions.length < 1) {
      const doc = new Github({
        ip: ip || "0:0:0:0/0",  //GUEST
        username: user,
        access_ip: [ip]
      });

      const saveDoc = await doc.save();

      return res.json(saveDoc);
    } else if (!contributions[0].access_ip.includes(ip)) {
      contributions[0].access_ip.push(ip);
      const update = await Github.updateOne({ username: user }, { $set: contributions[0] });
    }
    view_profile = contributions[0].access_ip.length;


    htmlString = response.data;
    // Phân tích chuỗi HTML bằng cheerio
    const $ = cheerio.load(htmlString);
    // Lấy thông tin về current streak
    const currentStreakInfo = $('g:contains("Current Streak")').next().find('text').text().trim();
    const currentStreakNumber = currentStreakInfo.match(/\d+/)[0];
    const svgString = `<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="-1.672 0 501.672 108.732" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
      <defs>
        <style bx:fonts="Allerta">@import contributeUrl(https://fonts.googleapis.com/css2?family=Allerta%3Aital%2Cwght%400%2C400&amp;display=swap);</style>
        <style bx:fonts="AR One Sans">@import contributeUrl(https://fonts.googleapis.com/css2?family=AR+One+Sans%3Aital%2Cwght%400%2C400..700&amp;display=swap);</style>
      </defs>
      <image width="1584" height="396" x="-309.3475754867652" y="51.999999603408014" style="" transform="matrix(0.316963, 0, 0, 0.284838, 96.543409, -18.343507)" xlink:href="${bg_png()}">
        <title>Background</title>
      </image>
      <text style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 28px;" transform="matrix(0.536962, 0, 0, 0.536965, 84.994726, 73.421301)"> </text>
      <text style="fill: rgb(255, 255, 255); font-family: Allerta; font-size: 28px; font-weight: 700; white-space: pre;" transform="matrix(1.226279, 0, 0, 1.28091, 81.830961, 66.402548)">TRAN HUU DANG</text>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.526322, 0, 0, 0.431086, 91.022329, 95.153448)">FULLSTACK DEVELOPER</text>
      <image width="512" height="512" x="-18.153" y="2.38" style="" transform="matrix(0.027412, 0, 0, 0.027442, 81.743475, 2.7735)" xlink:href="${fire_png()}">
        <title>3d-fire</title>
      </image>
      <image width="60.6" height="86.945" x="432.735" y="26.78" style="" xlink:href="${java_png()}">
        <title>Java</title>
      </image>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 99.962942, 14.705896)">${currentStreakNumber}</text>
      <image width="13.29" height="13.29" x="147.405" y="4.613" style="" xlink:href="${sharingan_png()}">
        <title>Sharingan</title>
      </image>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 167.196057, 14.812479)">${view_profile}</text>
      
      ${template === 'frog' ? '<image width="48.282" height="36.213" x="26.213" y="35.564" style="" xlink:href="${frog_gif()}"> <title>Frog</title> </image>': '-->'}  
      
    </svg>`;

    res.set('Content-Type', 'image/svg+xml');

    // Send the SVG string as the response
    res.send(svgString);
  } catch (err) {
    return res.json(err)
  }
};

const getUserCreateAtYear = async (user) => {
  try {
    const user_contributeUrl = `https://api.github.com/users/${user}`;
    const { data: { created_at } } = await axios.get(user_contributeUrl);
    return new Date(created_at).getFullYear();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

exports.contributes = async (req, res) => {
  try {

    const user = req.query['user'] || 'theanishtar';
    const yearView = req.query['year'];
    let userCreateAtYear = await getUserCreateAtYear(user);
    let currentYear = new Date().getFullYear();
    const contributions = [];
    let total = [];

    while (userCreateAtYear < currentYear+1) { 
      if (yearView){
        userCreateAtYear = yearView;
        currentYear = yearView-1;
      }
      let totalYearContribute = 0;
      let streak = 0;
      let streaks = 0;
      let ctbt = 0;
      
      const contributeUrl = `https://github.com/users/${user}/contributions?tab=overview&from=${userCreateAtYear}-01-01&to=${userCreateAtYear}-12-31`;
      const resContributionAtYear = await axios.get(contributeUrl);

      // Sử dụng cheerio để phân tích HTML
      const $ = cheerio.load(resContributionAtYear.data);

      // Lặp qua tất cả các thẻ <td> có thuộc tính data-level và tìm các thẻ <tool-tip> tương ứng
      $('td[data-level]').each(function() {
        const td = $(this);
        const tooltipId = td.attr('id');
        const tooltip = $(`tool-tip[for="${tooltipId}"]`);
        const tooltipText = tooltip.text().trim();

        // Thêm nội dung từ thẻ <tool-tip> vào thẻ <td>
        td.append(`<div class="tooltip-content">${tooltipText}</div>`);
      });

      // Lấy HTML đã được chỉnh sửa
      const modifiedHtml = $.html();

      // Duyệt qua từng thẻ <td> có thuộc tính data-date và tooltip-content
      $('td[data-date][data-level] .tooltip-content').each(function(index, element) {
        const td = $(this).parent(); // Lấy phần tử <td> bao quanh .tooltip-content
        const date = td.attr('data-date');
        const contribute = $(this).text().trim();
        const dataLevel = td.attr('data-level');

        // if (getContributions(contribute) <= 0){
        //   streak = 0;
        // }
        // else {
        //   streak++;
        //   if (streak > streaks)
        //     streaks = streak;
        // }

        // Đẩy dữ liệu vào mảng kết quả
          contributions.push({
            date: date,
            contribute: contribute,
            'data-level': parseInt(dataLevel),
            contributes: getContributions(contribute)
          });

        ctbt += getContributions(contribute);
      });

      total.push({
        year: userCreateAtYear,
        // streaks: streaks,
        contributions: ctbt
      });
      userCreateAtYear++;
    }

  contributions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

    // Send the SVG string as the response
    res.json({
      total,
      contributions
    });
  } catch (err) {
    console.log(err);
    return res.json(err)
  }
};

// Hàm để lấy số lượng đóng góp từ chuỗi
function getContributions(contributionString) {
  // Sử dụng biểu thức chính quy để tìm số lượng đóng góp
  const contributionMatch = contributionString.match(/(\d+) contribution/);

  if (contributionMatch) {
      // Trích xuất số lượng đóng góp và chuyển đổi thành số nguyên
      return parseInt(contributionMatch[1], 10);
  } else if (contributionString.includes("No contributions")) {
      // Trả về 0 nếu không có đóng góp
      return 0;
  } else {
      // Trường hợp khác, có thể xử lý hoặc trả về giá trị mặc định
      return 0;
  }
}

function getTechs(tech) {
  const { git, node, react, vsc, java, vue, js, javaGif } = require('../utils/base64/gif');
  switch (tech) {
    case 'java':
      return java;
    case 'javaGif':
      return javaGif;
    case 'git':
      return git;
    case 'node':
      return node;
    case 'react':
      return react;
    case 'vsc':
      return vsc;
    case 'vue':
      return vue;
    case 'js':
      return js;
    default:
      return 'java';
  }
}

exports.banner = async (req, res) => {
  try {
    const user = req.query['user'] || 'theanishtar';
    const name = req.query['name'] || 'TRAN HUU DANG';
    const description = req.query['description'] || 'Fullstack developer';
    const template = req.query['template'] || `basic`;
    const streaks = req.query['streaks'] || `none`; // default = auto
    const technical = await Technical.find({name: req.query['tech'] || 'java'});
    let background = await Background.find({name: req.query['background']});
    const view = req.query['view'] || `none`; // default = auto

    if (background.length == 0)
      background = req.query['background'] || bg_png();

    const svgString = `<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="-1.672 0 501.672 108.732" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
      <defs>
        <style bx:fonts="Allerta">@import contributeUrl(https://fonts.googleapis.com/css2?family=Allerta%3Aital%2Cwght%400%2C400&amp;display=swap);</style>
        <style bx:fonts="AR One Sans">@import contributeUrl(https://fonts.googleapis.com/css2?family=AR+One+Sans%3Aital%2Cwght%400%2C400..700&amp;display=swap);</style>
      </defs>

      <!-- Nền -->
      <image  width="1584" height="396"  preserveAspectRatio="xMidYMid slice" x="-309.3475754867652" y="51.999999603408014" style="" transform="matrix(0.316963, 0, 0, 0.284838, 96.543409, -18.343507)" 
        xlink:href="${background}"
      >
        <title>Background</title>
      </image>
      
      <text style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 28px;" transform="matrix(0.536962, 0, 0, 0.536965, 84.994726, 73.421301)"> </text>
      <text style="fill: rgb(255, 255, 255); font-family: Allerta; font-size: 28px; font-weight: 700; white-space: pre;" transform="matrix(1.226279, 0, 0, 1.28091, 81.830961, 66.402548)">TRAN HUU DANG</text>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.526322, 0, 0, 0.431086, 91.022329, 95.153448)">FULLSTACK DEVELOPER</text>
      
      <!-- Skill logo -->
      <image width="60.6" height="86.945" x="432.735" y="26.78" style="" xlink:href="${technical[0].data}">
        <title>${technical[0].name}</title>
      </image>

      ${streaks === 'auto' ?
        `<image width="512" height="512" x="-18.153" y="2.38" style="" transform="matrix(0.027412, 0, 0, 0.027442, 81.743475, 2.7735)" xlink:href="${fire_png()}">
        <title>3d-fire</title>
      </image>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 99.962942, 14.705896)">123</text>`
      :
        `<!-- streak logo -->`
      }

      ${view === 'auto' ? 
        `<image width="13.29" height="13.29" x="147.405" y="4.613" style="" xlink:href="${sharingan_png()}">
          <title>Sharingan</title>
        </image>
        <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 167.196057, 14.812479)">1233</text>`
      : 
        `<!-- View logo  -->`
      }
    </svg>`;

    res.set('Content-Type', 'image/svg+xml');

    // Send the SVG string as the response
    res.send(svgString);
  } catch (err) {
    return res.json(err)
  }
};

exports.bannerView = async (req, res) => {
  try {
    const images = data(); 
    // Trả về file HTML
    // res.sendFile(path.join(__dirname, '..', 'public', 'banner.html'));
    res.render('banner', { images });
  } catch (err) {
    return res.json(err)
  }
};
