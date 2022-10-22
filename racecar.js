const form = document.querySelector('form');
const table = document.querySelector('table');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const season = form.season.value;
  const round = form.round.value;

  axios.get(`http://ergast.com/api/f1/${season}/${round}/drivers.json`)
    .then((response) => {
      const data = response.data.MRData.RaceTable.Races[0].Results;
      console.log(data);
      const tbody = document.createElement('tbody');
      data.forEach((driver) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${driver.Driver.givenName}</td>
          <td>${driver.Driver.familyName}</td>
          <td>${driver.Driver.dateOfBirth}</td>
          <td>${driver.position}</td>
          <td>${driver.wins}</td>
          <td>${driver.Driver.nationality}</td>
          <td>${driver.Constructors[0].name}</td>
        `;
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
    })
    .catch((error) => {
      console.log(error);
    });
});