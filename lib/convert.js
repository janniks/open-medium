export default async (url, onSuccess) => {
  try {
    const result = await fetch(
      "https://open-medium.now.sh/api/open?url=" + encodeURIComponent(url)
    );
    const json = await result.json();
    if (json.error) return alert(json.error);
    onSuccess(json);
  } catch (error) {
    alert(error);
  }
};
