const req = new XMLHttpRequest();

req.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    window.location.replace(JSON.parse(req.responseText));
  } else if (this.readyState == 4) {
    alert(JSON.parse(req.responseText).error);
  } else {
    console.error(req.responseText);
  }
};

req.open(
  "GET",
  "https://open-medium.now.sh/api?url=" + encodeURIComponent(location.href),
  true
);

req.send();
