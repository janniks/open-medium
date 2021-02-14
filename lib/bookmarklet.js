const req = new XMLHttpRequest();

req.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    window.location.replace(JSON.parse(req.responseText));
  } else {
    alert(JSON.parse(req.responseText).error);
  }
};

req.open(
  "GET",
  "https://open-medium.now.sh/api/open?url=" +
    encodeURIComponent(location.href),
  true
);

req.send();
