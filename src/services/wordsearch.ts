class WordSearchGenerator {

    isStraightPlacement(word: string, location: number, grid: string[], gridSize: number){
        let maxGridLength = Math.abs(location % gridSize - gridSize)
        if(word.length > maxGridLength) return false;
      
        for(let i=0; i<word.length; i++){
            let gridLocation = i + location;
            if(grid[gridLocation] !== "" && grid[gridLocation] !== word[i]) return false;
        }
      
        return true;
    }

    isDownPlacement(word: string, location: number, grid: string[], gridSize: number){
        let maxGridSize = gridSize*gridSize
        let lastLetterPosition = location + (word.length-1) * gridSize 
        if(maxGridSize < lastLetterPosition) return false;
      
      for(let i=0; i<word.length; i++){
        let gridLocation = location + (i*gridSize)
        if(grid[gridLocation] !== "" && grid[gridLocation] !== word[i]) return false
      }
      
      return true;
    }
    
    isDiagonalRightPlacement(word: string, location: number, grid: string[], gridSize: number){
        let maxGridSize = gridSize*gridSize
        let lastLetterPosition = (location + (word.length-1) * gridSize)+(word.length-1)
        if(maxGridSize < lastLetterPosition) return false;

        for(let i=0; i<word.length; i++){
            let rowLimit = ((i + (Math.trunc(location/gridSize) + 1)) * gridSize) - 1
            let currentPlacement = location + (i*gridSize) + i
            //let gridLocation = location +(i*gridSize) + i

            if(currentPlacement > rowLimit) return false
            if(grid[currentPlacement] !== "" && grid[currentPlacement] !== word[i]) return false
        }
      
      return true;
    }

    isDiagonalLeftPlacement(word: string, location: number, grid: string[], gridSize: number){
        let maxGridSize = gridSize*gridSize
        let lastLetterPosition = (location + (word.length-1) * gridSize)-(word.length-1)
        if(maxGridSize < lastLetterPosition) return false;

        for(let i=0; i<word.length; i++){
            let rowLimit = ((i + (Math.trunc(location/gridSize) + 1)) * gridSize) - gridSize
            let currentPlacement = location + (i*gridSize) - i
            //let gridLocation = location +(i*gridSize) - i

            if(currentPlacement < rowLimit) return false
            if(grid[currentPlacement] !== "" && grid[currentPlacement] !== word[i]) return false
        }
      
      return true;
    }

    diagonalLeftPlacement(word: string, location: number, grid: string[], gridSize: number){
        for(let i=0; i<word.length; i++){
            let gridLocation = location +(i*gridSize) - i

            if(grid[gridLocation] === "" || grid[gridLocation] === word[i]) grid[gridLocation] = word[i]
        }
      
        return grid;
    }
    
    diagonalRightPlacement(word: string, location: number, grid: string[], gridSize: number){
        for(let i=0; i<word.length; i++){
            let gridLocation = location + (i*gridSize) + i

            if(grid[gridLocation] === "" || grid[gridLocation] === word[i]) {
              grid[gridLocation] = word[i]
          }
        }

        return grid;
    }
      
    straightPlacement(word: string, location: number, grid: string[]){
        for(let i=0; i<word.length; i++){
            let gridLocation = i+location   
            
            if(grid[gridLocation] === "" || grid[gridLocation] === word[i]){ 
                grid[gridLocation] = word[i]
            }
        }
          
          return grid;
        }
        
    downPlacement(word: string, location: number, grid: string[], gridSize: number){
        for(let i=0; i<word.length; i++){
            let gridLocation = location +(i*gridSize)
            
            if(grid[gridLocation] === "" || grid[gridLocation] === word[i]) {
                grid[gridLocation] = word[i]
            }
        }
        
        return grid;
    }
        
    placeWords(grid: string[], words: string[], gridSize: number){
        let placedWords = [];
        let unplacedWords = [];
        
        for(let word of words){
            let positions = ["down", "straight", "diagonalright", "diagonalleft"]
            let isPlaced = false;
            let availableDownPositions = Array.from(Array( gridSize*gridSize ).keys())
            let availableStraightPositions = Array.from(Array( gridSize*gridSize ).keys())
            let availableDiagonalRightPositions = Array.from(Array( gridSize*gridSize ).keys())
            let availableDiagonalLeftPositions = Array.from(Array( gridSize*gridSize ).keys())

            while(!isPlaced && positions.length > 0){
                let positionSelect = Math.floor(Math.random() * positions.length)
    
                if(positions[positionSelect] === "down"){
                    let placementlocation = Math.floor(Math.random() * availableDownPositions.length)
                    if(this.isDownPlacement(word, availableDownPositions[placementlocation], grid, gridSize)){
                        grid = this.downPlacement(word, availableDownPositions[placementlocation], grid, gridSize);
                        isPlaced = true;
                        placedWords.push(word)
                    }
                    availableDownPositions = availableDownPositions.filter((item) => item !== availableDownPositions[placementlocation])
                    if(availableDownPositions.length <= 0) positions = positions.filter(item => item !== "down")
                    
                }else if(positions[positionSelect] === "straight"){
                    let placementlocation = Math.floor(Math.random() * availableStraightPositions.length)
                    if(this.isStraightPlacement(word, availableStraightPositions[placementlocation], grid, gridSize)){
                        grid = this.straightPlacement(word, availableStraightPositions[placementlocation], grid);
                        isPlaced = true;
                        placedWords.push(word)
                    }
                    availableStraightPositions = availableStraightPositions.filter((item) => item !== availableStraightPositions[placementlocation])
                    if(availableStraightPositions.length <= 0) positions = positions.filter(item => item !== "straight")

                }else if(positions[positionSelect] === "diagonalright"){
                    let placementlocation = Math.floor(Math.random() * availableDiagonalRightPositions.length)
                    if(this.isDiagonalRightPlacement(word, availableDiagonalRightPositions[placementlocation], grid, gridSize)){
                        grid = this.diagonalRightPlacement(word, availableDiagonalRightPositions[placementlocation], grid, gridSize);
                        isPlaced = true;
                        placedWords.push(word)
                    }
                    availableDiagonalRightPositions = availableDiagonalRightPositions.filter((item) => item !== availableDiagonalRightPositions[placementlocation])
                    if(availableDiagonalRightPositions.length <= 0) positions = positions.filter(item => item !== "diagonalright")

                }else if(positions[positionSelect] === "diagonalleft"){
                    let placementlocation = Math.floor(Math.random() * availableDiagonalLeftPositions.length)
                    if(this.isDiagonalLeftPlacement(word, availableDiagonalLeftPositions[placementlocation], grid, gridSize)){
                        grid = this.diagonalLeftPlacement(word, availableDiagonalLeftPositions[placementlocation], grid, gridSize);
                        isPlaced = true;
                        placedWords.push(word)
                    }
                    availableDiagonalLeftPositions = availableDiagonalLeftPositions.filter((item) => item !== availableDiagonalLeftPositions[placementlocation])
                    if(availableDiagonalLeftPositions.length <= 0) positions = positions.filter(item => item !== "diagonalleft")

                }
                
            }

            if(availableDownPositions.length <= 0 || availableStraightPositions.length <= 0 || availableDiagonalRightPositions.length <= 0){
                //console.log("not placed", word)
                unplacedWords.push(word)
            }
        }

        return {grid, placedWords, unplacedWords};
    }

    fillGrid(grid: string[]){
        let uniqueItems = [...new Set(grid)].filter((item) => item !== "")

        for(let i=0; i<grid.length; i++){
            let random = Math.floor(Math.random() * uniqueItems.length)
            if(grid[i] === "" ){
                grid[i] = uniqueItems[random]
            }
        }

        return grid;
    }

    generateWordSearch(grid: string[], words: string[], gridSize: number){
        // gridSize = Number(gridSize);
        for(let i=0; i<gridSize*gridSize; i++){
            grid.push("")
        }
        //words = words.filter((items,index) => index < 6)
        let wordsearch = this.placeWords(grid, words, gridSize);
        let wordsearchGrid = this.fillGrid(wordsearch.grid)

        return {grid: this.createGrid(wordsearchGrid, gridSize), placeWords: wordsearch.placedWords};
    }

    createGrid(gridValues: string[], gridSize: number){
        let start = 0
        let grid = []

        while(start + gridSize <= gridValues.length){
            grid.push(gridValues.slice(start, gridSize + start).join(""))
            start += gridSize;
        }
        
        return grid
    }

    
}
 
  
export default WordSearchGenerator;
