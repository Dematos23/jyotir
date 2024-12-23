async function passGenerator() {
  function randomVowel() {
    const vowels = "aeiou";
    return vowels[Math.floor(Math.random() * vowels.length)];
  }

  function randomConsonant() {
    const consonants = "bcdfghjklmnpqrstvwxyz";
    return consonants[Math.floor(Math.random() * consonants.length)];
  }

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  function randomSpecialChar() {
    const specialChars = "!.-_$%@:;+*=";
    return specialChars[Math.floor(Math.random() * specialChars.length)];
  }

  const c1 = randomConsonant();
  const v1 = randomVowel();
  const c2 = randomConsonant();
  const c3 = randomConsonant();
  const v2 = randomVowel();
  const n1 = randomNumber();
  const n2 = randomNumber();
  const s1 = randomSpecialChar();

  const password = c1.toUpperCase() + v1 + c2 + c3 + v2 + n1 + n2 + s1;
  return password;
}

export default passGenerator;
