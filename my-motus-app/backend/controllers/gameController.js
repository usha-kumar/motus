const Mots = require('../models/mots');
const { getRandomWord } = require('../services/wordService');

exports.startGame = async (req, res) => {
  const { difficulte} = req.body;
  const word = await getRandomWord(difficulte);
  const mots = new Mots({
    word,
    difficulte
  });
  await mots.save();
  res.json({ motsId: mots.id, firstLetter: word[0] });
};

exports.makeGuess = async (req, res) => {
  const { motsId, guess } = req.body;
  const mots = await Mots.findOne(motsId);
  if (!mots || mots.completed) {
    return res.status(400).json({ message: 'Invalid mots' });
  }
  mots.attempts.push(guess);
  console.log('attempts ',mots.attempts);
  const feedback = generateFeedback(mots.word, guess, mots.attempts.length -1);
  if (mots.attempts.join('').toLowerCase() === mots.word.toLowerCase()) {
    mots.completed = true;
    mots.won = true;
  } else if (mots.attempts.length >= mots.word.length) {
    mots.completed = true;
    mots.won = false;
  }

  await mots.save();

  res.json({feedback,  completed: mots.completed, won: mots.won });
};

exports.deleteGuess = async (req, res) => {

  const { motsId } = req.body;


  const result = await Mots.findByIdAndDelete(motsId);
  res.json({  status: 200 });
};

function generateFeedback(word, guess, index ) {
  if(word.toLowerCase().includes(guess.toLowerCase()) ) {
    return word.toLowerCase().charAt(index) === guess ? 'correct' : 'misplaced';
  }
  return 'incorrect';
}
