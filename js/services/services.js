   // Створюємо POST запит
   const fetchReq = async (url, data) => { // виносино запит на сервер в окрему функцію
      const res = await fetch(url, { // запит на сервер
         method: 'POST',
         body: data, 
         headers: {
            'Content-type': 'application/json'
         }
      })
      return await res.json();
   }

   const fetchGet = async (url) => { // виносино запит на сервер в окрему функцію
      const res = await fetch(url);
      if(!res.ok) {
         throw new Error(`Could fetch to ${url}, status: ${res.status}`)
      }
      return await res.json();
   }

   export {fetchReq};
   export {fetchGet};