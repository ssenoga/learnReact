function getFireBaseConfig() {
  fetch("https://gist.github.com/ssenoga/88b9287b3c046c6bc91ea132564da320.js")
    .then(res => res.text())
    .then(data => data)
    .catch(err => err);
}
