const { bg_png } = require('../utils/base64/index');
const Technical = require("../models/techical.model");
const Background = require("../models/background.model");
const { generateSVGString } = require("../services/generateSVGString");
const axios = require('axios');


const bannerCache = {}; // Simple RAM cache

exports.banner = async (req, res) => {
  try {
    const cacheKey = JSON.stringify(req.query);

    // Check cache first
    if (bannerCache[cacheKey] && (Date.now() - bannerCache[cacheKey].timestamp < 10 * 60 * 1000)) {
      console.log('Banner cache hit');
      res.set('Content-Type', 'image/svg+xml');
      return res.send(bannerCache[cacheKey].svg);
    }

    console.log('Banner cache miss');

    const name = req.query['name'] || 'theanishtar';
    const role = req.query['role'] || 'FULLSTACK DEVELOPER';
    const streaks = await Technical.find({ name: req.query['streaks'] });
    const view = await Technical.find({ name: req.query['view'] });
    const technical = await Technical.find({ name: req.query['tech'] || 'java' });
    // let background = await Background.find({ name: req.query['background'] });
    const skills = req.query.skills ? req.query.skills.split(',') : [];

    let background = [];
    const bgParam = req.query['background'];
    if (bgParam?.startsWith('embed:')) {
      const url = bgParam.replace('embed:', '');

      try {
        const response = await axios.get(url);
        background = [{
          name: 'custom',
          data: `data:image/svg+xml;base64,${Buffer.from(response.data).toString('base64')}`
        }];

        console.log(background.data)
      } catch (e) {
        console.error('Error fetching embedded background:', e.message);
        background = bg_png(); // fallback
      }
    } else {
      background = await Background.find({ name: bgParam });
      if (!background.length) background = bg_png();
    }



    if (!background.length)
      background = bg_png();

    let skillArr = [];
    if (skills.length !== 0) {
      for (const skillName of skills) {
        if (!skillName) continue;
        const tech = await Technical.findOne({ name: skillName });
        if (tech) {
          skillArr.push({
            data: tech.data,
            name: tech.name
          });
        }
      }
    }

    const svgString = generateSVGString(name, role, background, technical, streaks, view, skillArr);

    // Save into cache
    bannerCache[cacheKey] = {
      svg: svgString,
      timestamp: Date.now()
    };

    res.set('Content-Type', 'image/svg+xml');
    res.send(svgString);
  } catch (err) {
    console.error('Error generating banner:', err);
    res.set('Content-Type', 'image/svg+xml');
    return res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60">
      <text x="10" y="35" font-size="20" fill="red">Error generating banner</text>
    </svg>`);
  }
};
