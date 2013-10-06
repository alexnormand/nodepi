var RSVP    = require('rsvp');
var cheerio = require('cheerio');
var request = require('request');

var BASE_URL = 'http://nodejs.org/dist/';
var linkRe = /v(\d+)\.(\d+)\.(\d+)\//;

/**
 * Returns the id associated with a node version number.
 *
 * @param  {String} version the node version.
 * @return {number} the id associated with the provided node version number.
 * @private
 */
var getVersionId = function(version) {
  var result = linkRe.exec(version);
  var id = result.slice(1).map(function(n) {
    return (n.length === 1 ? '0' + n : n);
  }).join('');

  return +id;
};


/**
 * Returns all node versions links
 * @param  {String} [url="http://nodejs.org/dist/"]
 * @return {Promise}
 */
var getVersionLinks = function(url) {
  url = url || BASE_URL;

  return new RSVP.Promise(function(resolve, reject) {
    request(url, function(err, response, body) {

      if (err) {
        reject(err);
      }

      var $ = cheerio.load(body);
      var links =  $('a');

      // Returns true if the link's href attribute matches "vXX.XX.XX", false otherwise;
      var filterLinks = function(i, el) {
        return linkRe.test($(el).attr('href'));
      };

      //
      var mapLinks = function(i, el) {
        var href = $(el).attr('href');

        return {
          id: getVersionId(href),
          href: url + '/' + href,
          label: href.slice(0, -1)
        };
      };

      // Sort
      var sortVersionLinks = function(a, b) {
        return a.id - b.id;
      };

      resolve(links.filter(filterLinks).map(mapLinks).sort(sortVersionLinks));
    });
  });
};

/**
 * Returns a link to the raspberry pi binary.
 * @param  {String} version the node version.
 * @return {Promise}
 */
var getLinkToBuildFile = function(version) {
  return new RSVP.Promise(function(resolve, reject) {
    var url = BASE_URL + version + '/';

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
        resolve({
          id: getVersionId(url),
          href: url + result[0],
          label: linkRe.exec(url)[0].slice(0, -1)
        });
      } else {
        resolve(null);
      }
    });

  });
};

/**
 * Returns the list of node versions with a downloadable raspberry pi binary version.
 * @return {Promise}
 */
var getLatestBuildLinks = (function() {
  var cache = [];

  return function() {
    return new RSVP.Promise(function(resolve, reject) {

      if (cache.length) {
        resolve(cache);
      }

      var result = [];

      getVersionLinks().then(function(links) {
        var promises = links.map(function(l) {
          return getLinkToBuildFile(l.label);
        });

        RSVP.all(promises).then(function(links) {
          var res = links.filter(function(l) {
            return l !== null;
          });

          cache = res.slice().reverse();
          resolve(cache);
        });
      });
    });
  };
})();


module.exports = {
  getVersionLinks: getVersionLinks,
  getLinkToBuildFile: getLinkToBuildFile,
  getLatestBuildLinks: getLatestBuildLinks
};

