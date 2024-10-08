class helperfunctions {
  randomizeWords(wordList: { word: string; hint: string; id: number; definition: string; }[]) {
      // Create a copy of the original array to avoid modifying the input
      const shuffledList = [...wordList];
    
      // Shuffle the array using Fisher-Yates shuffle algorithm
      for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
      }
    
      return shuffledList;
  }

  scrambleWord(word: string, numSwaps: number) {
      const characters = word.split('');
    
      // Perform a specified number of swaps
      for (let i = 0; i < numSwaps; i++) {
        const index1 = Math.floor(Math.random() * characters.length);
        const index2 = Math.floor(Math.random() * characters.length);
        
        // Swap characters at index1 and index2
        [characters[index1], characters[index2]] = [characters[index2], characters[index1]];
      }
    
      const scrambledWord = characters.join(' ');
      return scrambledWord;
  }

  maskWord(word: string, maskCharacter = '__') {
      const characters = word.split('');
      const wordLength = characters.length;
    
      // Determine how many characters to mask (can be adjust)
      const numToMask = Math.floor(wordLength / 2);
    
      // Create an array of indices to mask randomly
      const indicesToMask: number[] = [];
      while (indicesToMask.length < numToMask) {
        const randomIndex = Math.floor(Math.random() * wordLength);
        if (!indicesToMask.includes(randomIndex)) {
          indicesToMask.push(randomIndex);
        }
      }
    
      // Mask the selected indices with the maskCharacter
      for (const index of indicesToMask) {
        characters[index] = maskCharacter;
      }
    
      // Join the characters back together to form the masked word
      const maskedWord = characters.join(' ');
      return maskedWord;
    }
}


export default helperfunctions;