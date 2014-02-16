(function(d) {
  var versionsList   = d.getElementById('versions-list');
  var downloadButton = d.getElementById('download');

  $(versionsList).selectize({
    create: false
  });

  downloadButton.addEventListener('click', function() {
    location.href = versionsList.value;
  });
})(document);

