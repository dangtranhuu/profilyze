var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import cheerio from 'cheerio';
/**
* @throws Error
* @throws UserNotFoundError
*/
function scrapeYearLinks(username, query) {
  return __awaiter(this, void 0, void 0, function* () {
      const page = yield fetch(`https://github.com/${username}?action=show&controller=profiles&tab=contributions&user_id=${username}`, {
          headers: {
              referer: `https://github.com/${username}`,
              'x-requested-with': 'XMLHttpRequest',
          },
      });
      const $ = cheerio.load(yield page.text());
      const yearLinks = $('.js-year-link').get();
      if (yearLinks.length === 0) {
          throw new UserNotFoundError(username);
      }
      return yearLinks
          .map((a) => ({
          year: parseInt($(a).text().trim()),
      }))
          .filter((link) => query.fetchAll ? true : query.years.includes(link.year));
  });
}
/**
* @throws Error if scraping of GitHub profile fails
*/
function scrapeContributionsForYear(year, username, format) {
  return __awaiter(this, void 0, void 0, function* () {
      const url = `https://github.com/users/${username}/contributions`;
      const page = yield fetch(year === 'lastYear'
          ? url
          : url.concat(`?tab=overview&from=${year}-12-01&to=${year}-12-31`), {
          headers: {
              referer: `https://github.com/${username}`,
              'x-requested-with': 'XMLHttpRequest',
          },
      });
      const $ = cheerio.load(yield page.text());
      const $days = $('.js-calendar-graph-table .ContributionCalendar-day');
      const sortedDays = $days.get().sort((a, b) => {
          var _a, _b;
          const dateA = (_a = a.attribs['data-date']) !== null && _a !== void 0 ? _a : '';
          const dateB = (_b = b.attribs['data-date']) !== null && _b !== void 0 ? _b : '';
          return dateA.localeCompare(dateB, 'en');
      });
      const totalMatch = $('.js-yearly-contributions h2')
          .text()
          .trim()
          .match(/^([0-9,]+)\s/);
      if (!totalMatch) {
          throw Error('Unable to parse total contributions count.');
      }
      const total = parseInt(totalMatch[0].replace(/,/g, ''));
      // Required for contribution count
      const tooltipsByDayId = $('.js-calendar-graph tool-tip')
          .toArray()
          .reduce((map, elem) => {
          const $elem = $(elem);
          const dayId = $elem.attr('for');
          if (dayId) {
              map[dayId] = $elem;
          }
          return map;
      }, {});
      const response = {
          total: {
              [year]: total,
          },
          contributions: {},
      };
      if (format === 'nested') {
          return sortedDays.reduce((data, day) => {
              const { date, contribution } = parseDay(day, tooltipsByDayId);
              const [y, m, d] = date;
              if (!data.contributions[y])
                  data.contributions[y] = {};
              if (!data.contributions[y][m])
                  data.contributions[y][m] = {};
              data.contributions[y][m][d] = contribution;
              return data;
          }, response);
      }
      return Object.assign(Object.assign({}, response), { contributions: sortedDays.map((day) => parseDay(day, tooltipsByDayId).contribution, tooltipsByDayId) });
  });
}
const parseDay = (day, tooltipsByDayId) => {
  const attr = {
      id: day.attribs['id'],
      date: day.attribs['data-date'],
      level: day.attribs['data-level'],
  };
  if (!attr.date) {
      throw Error('Unable to parse contribution date attribute.');
  }
  if (!attr.level) {
      throw Error('Unable to parse contribution level attribute.');
  }
  let count = 0;
  if (tooltipsByDayId[attr.id]) {
      const countMatch = tooltipsByDayId[attr.id].text().trim().match(/^\d+/);
      if (countMatch) {
          count = parseInt(countMatch[0]);
      }
  }
  const level = parseInt(attr.level);
  if (isNaN(count)) {
      throw Error('Unable to parse contribution count.');
  }
  if (isNaN(level)) {
      throw Error('Unable to parse contribution level.');
  }
  const contribution = {
      date: attr.date,
      count,
      level,
  }, satisfies, Contribution;
  return {
      date: attr.date.split('-').map((d) => parseInt(d)),
      contribution,
  };
};
/**
* @throws UserNotFoundError
*/
export function scrapeGitHubContributions(username, query) {
  return __awaiter(this, void 0, void 0, function* () {
      const yearLinks = yield scrapeYearLinks(username, query);
      const contributionsForYear = yearLinks.map((link) => scrapeContributionsForYear(link.year, username, query.format));
      if (query.lastYear) {
          contributionsForYear.push(scrapeContributionsForYear('lastYear', username, query.format));
      }
      return Promise.all(contributionsForYear).then((contributions) => {
          if (query.format === 'nested') {
              return contributions.reduce((acc, curr) => ({
                  total: Object.assign(Object.assign({}, acc.total), curr.total),
                  contributions: Object.assign(Object.assign({}, acc.contributions), curr.contributions),
              }), {
                  total: {},
                  contributions: {},
              });
          }
          return contributions.reduce((acc, curr) => ({
              total: Object.assign(Object.assign({}, acc.total), curr.total),
              contributions: [...acc.contributions, ...curr.contributions],
          }), {
              total: {},
              contributions: [],
          });
      });
  });
}
export class UserNotFoundError extends Error {
  constructor(username) {
      super(`User "${username}" not found.`);
  }
}
