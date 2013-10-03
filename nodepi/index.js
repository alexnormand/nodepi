var RSVP    = require('rsvp');
var cheerio = require('cheerio');
var request = require('request');

var getVersionLinks = function(url) {
  url = url || 'http://nodejs.org/dist';

  return new RSVP.Promise(function(resolve, reject) {
    request(url, function(err, response, body) {

      if (err) {
        reject(err);
      }

      var $ = cheerio.load(body);
      var links =  $('a');
      var linkRegex = /v(\d+)\.(\d+)\.(\d+)\/$/;

      // Returns true if the link's href attribute matches "vXX.XX.XX", false otherwise;
      var filterLinks = function(i, el) {
        return linkRegex.test($(el).attr('href'));
      };

      //
      var mapLinks = function(i, el) {
        var href = $(el).attr('href');
        var result = linkRegex.exec(href);
        var id = +(result.slice(1).map(function(n) { return (n.length === 1 ? '0'+n : n); }).join(''));

        return { id: id, href: url + '/' + href };
      };

      // Sort
      var sortVersionLinks = function(a, b) {
        return a.id - b.id;
      };

      resolve(links.filter(filterLinks).map(mapLinks).sort(sortVersionLinks));
    });
  });
};

var getLinkBuildFile = function(url) {
  return new RSVP.Promise(function(resolve, reject) {
    request(url, function(err, reponse, body) {

      if (err) {
        reject(err);
      }

      var $ = cheerio.load(body);
      var links = $('a');

      var filterLinks = function(i, el) {
        return /linux-arm-pi/.test($(el).attr('href'));
      };

      var mapLinks = function(i, el) {
        return $(el).attr('href');
      };

      var result = links.filter(filterLinks).map(mapLinks);

      if (result.length) {
        resolve(url + result[0]);
      } else {
        resolve(null);
      }
    });

  });
};


var getLatestBuildLinks = (function() {
  var cache = [];

  return function() {
    return new RSVP.Promise(function(resolve, reject) {

      if (cache.length) {
        resolve(cache);
      }

      var result   = [];

      getVersionLinks().then(function(links) {
        var promises = links.map(function(l) {
          return getLinkBuildFile(l.href);
        });

        RSVP.all(promises).then(function(links) {
          var res = links.filter(function(l) {
            return l !== null;
          });

          cache = res.slice();
          resolve(res);
        });
      });
    });
  };
})();

module.exports = {
  getVersionLinks: getVersionLinks,
  getLinkBuildFile: getLinkBuildFile,
  getLatestBuildLinks: getLatestBuildLinks
};



