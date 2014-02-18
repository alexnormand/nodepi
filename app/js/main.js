(function(d) {
  var versionsList   = d.getElementById('versions-list');
  var downloadButton = d.getElementById('download');

  $(versionsList).selectize();

  downloadButton.addEventListener('click', function() {
    if (versionsList.value) {
      location.href = versionsList.value;
    }
  });
})(document);

