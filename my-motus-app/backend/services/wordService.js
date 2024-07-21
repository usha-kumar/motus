const axios = require('axios');

async function getRandomWord(difficulty) {
  const minLength = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const maxLength = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  console.log('`?`.repeat(minLength) + `-`.repeat(maxLength - minLength)',`?`.repeat(minLength) + `?`.repeat(maxLength - minLength))
  const response = await axios.get('https://api.datamuse.com/words', {
    params: {
      sp: `?`.repeat(minLength) + `?`.repeat(maxLength - minLength),
      max: 1
    }
  });

  return response.data[0].word;
}

module.exports = { getRandomWord };
