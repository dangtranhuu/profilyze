const CountView = require("../models/countview.model");


exports.view = async (req, res) => {
  try {
    const req_url = req.query['url'];
    let result = await CountView.find({ url: req_url });

    if (!isValidURL(req_url))
      return res.json("URL not valid")

    if (result.length < 1) {
      const doc = new CountView({
        ip: "0:0:0:0/0",  //GUEST
        view_count: 1,
        type: ["link"],
        url: req_url
      });

      const saveDoc = await doc.save();
      console.log(1);
      const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" aria-label="1 lượt xem">
      <title>1 lượt xem</title>
      <linearGradient id="gradient" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity="0.1"/>
        <stop offset="1" stop-opacity="0.1"/>
      </linearGradient>
      <clipPath id="clip">
        <rect width="120" height="20" rx="3" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#clip)">
        <rect width="10" height="20" fill="#533566"/>
        <rect x="10" width="149" height="20" fill="#533566"/>
        <rect width="159" height="20" fill="url(#gradient)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-size="12">
        <text x="50.5" y="15">1 lượt xem</text>
      </g>
    </svg>
      `;
      res.set('Content-Type', 'image/svg+xml');
      return res.send(svgString);
    }

    result[0].view_count = result[0].view_count + 1;

    const update = await CountView.updateOne({ url: req_url }, { $set: result[0] });

    console.log(result[0].view_count);
    svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20" role="img"
    aria-label="👀">
    <title>👀</title>
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
    <g aria-hidden="true" fill="#333" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif"
      text-rendering="geometricPrecision" font-weight="700" font-size="110px" line-height="14px">
      <!-- Thay đổi giá trị của x và y để đặt icon vào vị trí mong muốn -->
      <text x="10" y="15"  font-size="15px" line-height="14px">👀</text>
      <rect id="llink" stroke="#d5d5d5" fill="url(#a)" x=".5" y=".5" width="78" height="19" rx="2" /><text
        aria-hidden="true" x="475" y="150" fill="#fff" transform="scale(.1)" textLength="510">Lượt xem</text><text
        x="475" y="140" transform="scale(.1)" textLength="510">Lượt xem</text><text aria-hidden="true" x="945" y="150"
        fill="#fff" transform="scale(.1)" textLength="130">${result[0].view_count}</text><text id="rlink" x="945" y="140"
        transform="scale(.1)" textLength="130">${result[0].view_count}</text>
    </g>
  </svg>
    `;

    res.set('Content-Type', 'image/svg+xml');
    return res.send(svgString);
  } catch (err) {
    console.log(err);
    console.log("ANY");
    svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="150">
      <style>
        .code {
          --code-ln-color: #9e9e9e;
          --inline-code-color: #c52950;
          --inline-code-bg-color: #f9f2f4;
          --font-family-code: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
          -webkit-font-smoothing: antialiased;
          display: inline;
          line-height: 23.12px;
          font-size: 0.875em;
          background: transparent;
          font-weight: 600;
          font-family: var(--font-family-code);
          color: var(--inline-code-color);
          padding: 0.25rem 0.5rem;
          margin: 0;
          background-color: var(--inline-code-bg-color);
          border-radius: 3px;
          overflow-wrap: break-word;
          transition: background-color var(--t-color);
        }
    
        .dark .code {
          --code-ln-color: #9e9e9e;
          --inline-code-color: #c52950;
          --inline-code-bg-color: #f9f2f4;
          --font-family-code: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
          color-scheme: dark;
          -webkit-font-smoothing: antialiased;
          display: inline;
          line-height: 23.12px;
          font-size: 0.875em;
          background: transparent;
          font-weight: 600;
          font-family: var(--font-family-code);
          color: var(--inline-code-color);
          padding: 0.25rem 0.5rem;
          margin: 0;
          background-color: var(--inline-code-bg-color);
          border-radius: 3px;
          overflow-wrap: break-word;
          transition: background-color var(--t-color);
        }
      </style>
      <foreignObject width="500" height="150">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <code class="code">any</code>
        </body>
      </foreignObject>
    </svg>
    `;
    res.set('Content-Type', 'image/svg+xml');
    return res.send(svgString);
  }
};

function isValidURL(url) {
  // Regular expression to match URL pattern
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}
