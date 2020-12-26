export default async (url) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  const res = await fetch(fetchUrl, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  });

  return res.json();
};
