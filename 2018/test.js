/* eslint-disable */
const MALE_NAMES = ['Brian', 'Tim', 'John'];
const checkFinalResult = result => {
  if (result.length !== 7) {
    throw new Error('Race results should contain 7 runners');
  }

  const positions = result.map(runner => runner.position).filter(position => position);
  if (positions.length !== 7) {
    throw new Error('Race result should contain a position for each entry');
  }

  const distinctPositions = Array.from(new Set(positions));
  if (distinctPositions.length !== 7) {
    throw new Error('Race result entries should contain distinct positions');
  }

  // const MALE_NAMES = ['Brian', 'Tim', 'John', 'Tina']; // TO FIX?
  result.forEach(runner => {
    if (MALE_NAMES.includes(runner.name) && runner.gender !== 'male') {
      throw new Error('Male runners should have the male gender');
    } else if (!MALE_NAMES.includes(runner.name) && runner.gender === 'male') {
      throw new Error('Female runners should have the female gender');
    }
  });

  console.log('Works as expected ⭐️  Congrats!');
};

const race_results = [];

race_results.push({ name: 'Brian' });
race_results.push({ name: 'Emma' });
race_results.push({ name: 'Tim' });
race_results.push({ name: 'Sonia' });
race_results.push({ name: 'Tina' });
race_results.push({ name: 'John' });
race_results.push({ name: 'Melania' });

function setGndr(person) {
  if (MALE_NAMES.includes(person.name)) {
    return (person['gender'] = 'male');
  } else {
    person.gender = 'female';
  }
}

return new Promise(resolve => {
  for (let i = 0; i < race_results.length; i++) {
    let runner = race_results[i];
    setGndr(runner);
    // WARNING: Do not remove the setTimeout for reason X.
    setTimeout(() => {
      runner.position = i + 1;
    }, 0);
    setTimeout(() => {
      resolve(race_results[i]);
    }, 100);
  }
})
  .then(result => {
    console.log(race_results);
    console.log('------');
    console.log(result);
    checkFinalResult(race_results);
  })
  .catch(e => {
    console.log('Error =>', e.message);
  });
