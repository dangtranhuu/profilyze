// Tạo hàm tạo chuỗi SVG động và xuất hàm này
exports.generateSVGString = (background, technical, streaks, view, additionalImages) => {
  let svgString = `<?xml version="1.0" encoding="utf-8"?>
    <svg viewBox="-1.672 0 501.672 108.732" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
      <defs>
        <style bx:fonts="Allerta">@import contributeUrl(https://fonts.googleapis.com/css2?family=Allerta%3Aital%2Cwght%400%2C400&amp;display=swap);</style>
        <style bx:fonts="AR One Sans">@import contributeUrl(https://fonts.googleapis.com/css2?family=AR+One+Sans%3Aital%2Cwght%400%2C400..700&amp;display=swap);</style>
      </defs>

      <!-- Nền -->
      <image width="1584" height="396" preserveAspectRatio="xMidYMid slice" x="-309.3475754867652" y="51.999999603408014" style="" transform="matrix(0.316963, 0, 0, 0.284838, 96.543409, -18.343507)" 
        xlink:href="${background[0].data}">
        <title>${background[0].name}</title>
      </image>

      <text style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 28px;" transform="matrix(0.536962, 0, 0, 0.536965, 84.994726, 73.421301)"> </text>
      <text style="fill: rgb(255, 255, 255); font-family: Allerta; font-size: 28px; font-weight: 700; white-space: pre;" transform="matrix(1.226279, 0, 0, 1.28091, 81.830961, 66.402548)">TRAN HUU DANG</text>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.526322, 0, 0, 0.431086, 91.022329, 95.153448)">FULLSTACK DEVELOPER</text>

      <!-- Skill logo -->
      <image width="60.6" height="86.945" x="432.735" y="26.78" style="" xlink:href="${technical[0].data}">
        <title>${technical[0].name}</title>
      </image>`;

  if (streaks.length != 0) {
    svgString += `
      <image width="700" height="512" x="-18.153" y="2.38" style="" transform="matrix(0.027412, 0, 0, 0.027442, 81.743475, 2.7735)" xlink:href="${streaks[0].data}">
        <title>${streaks[0].name}</title>
      </image>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 99.962942, 14.705896)">123</text>`;
  }

  if (view.length != 0) {
    svgString += `
      <image width="12" height="13.29" x="147.405" y="4.613" style="" xlink:href="${view[0].data}">
        <title>${view[0].name}</title>
      </image>
      <text style="fill: rgb(131, 235, 241); font-family: 'AR One Sans'; font-size: 28px; white-space: pre;" transform="matrix(0.337932, 0, 0, 0.337219, 167.196057, 14.812479)">1233</text>`;
  }

  // Vòng lặp cho các ảnh bổ sung
  let xOffset = 6800; // Giá trị x ban đầu
  additionalImages.forEach((image, index) => {
    svgString += `
      <image xmlns="http://www.w3.org/2000/svg" width="512" height="512" x="${xOffset}" y="2900" style="" transform="matrix(0.027412, 0, 0, 0.027442, 81.743475, 2.7735)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${image.data}">
        <title>${image.name}</title>
      </image>`;
    xOffset += 700; // Tăng giá trị x cho ảnh tiếp theo
  });



  svgString += `
    </svg>`;

  return svgString;
};