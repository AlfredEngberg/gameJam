Spelets logik utgår från klassen Game.

```javascript
// Här exporteras Game-klassen som standard (så att den kan användas i andra filer)
export default class Game {
  // Konstruktorn är en speciell metod som körs när ett nytt Game-objekt skapas
  constructor(width, height) {
    // I konstruktorn sätter vi upp egenskaper (properties) för objektet

    // Egenskaper för spelets bredd och höjd
    this.width = width
    this.height = height

    // En tom lista för att lagra tangentnedtryckningar (knapptryckningar)
    this.keys = []

    // En tom lista för att lagra fiender i spelet
    this.enemies = []

    // En flagga som visar om spelet är över eller inte
    this.gameOver = false

    // Gravitationskraften i spelet, som är satt till 1 som standard
    this.gravity = 1

    // En flagga som används för felsökning (debugging) och är satt till false som standard
    this.debug = false
  }

  // Metoden "update" används för att uppdatera spelets logik
  update(deltaTime) {
    // Här kollar vi om spelet inte är över (gameOver är false)
    if (!this.gameOver) {
      // Om spelet inte är över, ökar vi "gameTime" med "deltaTime"
      this.gameTime += deltaTime
    }
  }

  // Metoden "draw" används för att rita spelet (men den är tom i detta exempel)
  draw(context) {
    // Här skulle man normalt sätta kod för att rita spelet, men i detta exempel är metoden tom
  }
}
```

JavaScript-klassen Game är avsedd att hantera grundläggande data och logik för spelet. Den har egenskaper för spelets dimensioner, en lista för tangentnedtryckningar och fiender, samt flaggor för att hantera spelets status och felsökning. Metoden `update` används för att uppdatera spelets logik, och metoden `draw` används för att rita spelet.

För att utveckla spelet vidare så kommer vi att fylla på med mer logik i klassen Game, och vi kommer att skapa fler klasser för att hantera olika typer av objekt i spelet.