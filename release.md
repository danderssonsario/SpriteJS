# Mall för inlämning laboration 1, 1dv610
​
## Checklista
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt: "det bör fungera" :) )
  - [x] Koden är objektorienterad
  - [x] Jag har skrivit en modul som riktar sig till programmerare
​
## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. (Då skall du inte lämna in! Lämna då istället in på restlaboration.)
  - [x] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [x] De flesta testfall fungerar
    - [x] Koden är förberedd på Återanvändning
    - [x] All kod samt historik finns i git 
    - [x] Kodkvaliterskraven är ifyllda
    - [x] Reflektion är skriven utifrån bokens kapitel 
  - [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [ ] Samtliga testfall är skrivna    
    - [ ] Testfall är automatiserade
    - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [ ] Kodkvalitetskraven är varierade 
  - [ ] Jag eftersträvar med denna inlämning högsta betyg (A) 
​
Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 
​
## Återanvändning
Min modul är skapad för att underlätta för andra programmerare att skapa egna spelar-objekt i HTML Canvas. Målet har vart att komma på en generell lösning för olika typer av 2D-spel,
vilket gör att modulen kan betraktas som en slags boilerplate för skapande av spelar-objekt. HuvudKlassen består utav ett urval av attribut och metoder som ofta förekommer i spel.

Instruktioner med exempel på hur denna modul används återfinns i README.md

Beskriv hur du anpassat din kod och instruktioner för att någon annan programmerare skall kunna använda din modul. Om du skrivit instruktioner för din användare, länka till dessa. Om inte, beskriv här hur någon skall göra för att använda din modul.
​
## Beskrivning av min kod
Beskriv din kod på en hög abstraktionsnivå. En kort beskrivning av dina viktigaste klasser och metoder. Skapa gärna ett klassdiagram som bild. Använd det ni lärt er så här långt i 1dv607. Kommunicera så att jag kan förstå.
​
## Hur jag testat
Jag har testat min modul via ett gränssnitt skapat i webbläsare. Där skapar jag en synlig sprite och testar via anrop till klassmetoderna. Jag jämför sedan förväntat utfall med det faktiskta utfallet genom att observera beteenden av spriteobjektet i användargränssnittet samt undersökning av attribut i konsol.

### Testfall
Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall. Om ni använder vertyg för testning kan ni ha en bild här med testrapporten. Tänk på att kommunicera till mig. Vad fungerar?, vad fungerar inte? Hur är det testat? Vilka delar testas inte?

## **Testfall 1: Instansiera ett objekt.**
### **Skapar en Sprite-instans enligt nedan.
````javascript
import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

const options = {
  positionX: 50,
  positionY: innerHeight/2,
  width: 100,
  height: 100,
  image: '../player.png',
}

const player = new Sprite('player', context, options)
console.log(player)
````
### **Förväntat utfall: objekt syns i konsol.**

## **Testfall 2: Lägga till en animation.**
### **Förutsättning: Testfall 1
### **Metodanrop enligt nedan.**
````javascript
player.addAnimation({
  name: 'Walk',
  frameWidth: 46,
  frameHeight: 50,
  frameCount: 8,
  rowIndex: 3,
})
console.log(player)
````

## **Testfall 3: Sätta en nuvarande animation.**
### **Förutsättning: Testfall 1, 2
### **Metodanrop enligt nedan.**
````javascript
//test
player.setCurrentAnimation('Walk')

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
}
animate()
````
### **Förväntat utfall: player-objekt har ett fält 'currentAnimation' satt till en tillagd animation. Specifierade sprite-bilder spelas upp i gränssnittet.

## **Testfall 4: Sätta hastighet.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**

````javascript
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  //test
  player.velocityX = 1
  console.log(player.velocityX)
}
animate()
````
### **Förväntat utfall: player-objekt rör sig konstant åt höger. värd

## **Testfall 5: Sätta acceleration.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  //test
  player.accelerationX = 1
  console.log(player.velocityX)
}
animate()
````
### **Förväntat utfall: player-objekt rör sig åt höger med ökande hastighet. player.velocityX ökar mellan varje frame med 1. 

## **Testfall 6: Sätta friktion.**
### **Förutsättning: Testfall 1, 2, 3, 4
### **Tilldelning av värde enligt nedan.**
````javascript

//test
player.velocityX = 10
player.friction = 0.97

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  console.log(player.velocityX)
}
animate()
````
### **Förväntat utfall: player-objekt rör sig åt höger med avtagande hastighet. player.velocityX minskar 3% (friction är en faktor) mellan varje frame. 

## **Testfall 7: Sätta rotationshastighet.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
//test
player.rotationSpeed = 10

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  console.log(player.angle)
}
animate()
````
### **Förväntat utfall: player-objekt roterar konstant åt höger. player.angle ökar med 10 grader mellan varje frame. 

## **Testfall 8: Vända objekt.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
//test
player.flipX = true

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
}
animate()
````
### **Förväntat utfall: player-objekt är vänt åt motsatt håll horisontellt. 

## **Testfall 9: Hämta avstånd till objekt/punkt.**
### **Förutsättning: Testfall 1, 2, 3
### **Metodanrop enligt nedan.**
````javascript
//test
let distance = player.distanceTo({ positionX: 200, positionY: (player.positionY + player.width / 2) })
console.log(distance)

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
}
animate()
````
### **Förväntat utfall: Konsol visar att avståndet är 100 (pixlar/punkter). 

## **Testfall 10: Hämta vinkel till objekt/punkt.**
### **Förutsättning: Testfall 1, 2, 3
### **Metodanrop enligt nedan.**
````javascript
//test
// distance = 100 from test case 9, increase in 100 points down.
let angle = player.angleTo({ positionX: 200, positionY: (player.positionY + player.width / 2 + 100) })
console.log(angle)

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
}
animate()
````
### **Förväntat utfall: Konsol visar att vinkeln är 45 (grader). 

## **Testfall 11: Kollidering mellan objekt.**
### **Förutsättning: Testfall 1, 2, 3. Objekt instansierad 450 punkter ifrån player.
### **Metodanrop enligt nedan.**
````javascript
const options = {
  positionX: 50,
  positionY: innerHeight/2,
  width: 100,
  height: 100,
  image: '../player.png',
}

const options2 = {
  positionX: 500,
  positionY: innerHeight / 2,
  width: 100,
  height: 100
}

const player = new Sprite('player', context, options)
const player2 = new Sprite('player2', context, options2)

player.velocityX = 1

/*
 * Sprite loop.
 */
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player2.update()
  player.update()
  
  //test
  if (player.detectCollision(player2)) {
    console.log('Collision detected!')
  }
}
animate()
````
### **Förväntat utfall: Konsol loggar 'Collision detected!' 200 gånger (Summa bredd på objekten). 

## **Testfall 12: Avgränsning av objektets rörelser.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
const player = new Sprite('player', context, options)
player.velocityX = 10

//test
player.bounds = { x: { max: innerWidth, min: 0}, y: { max: innerHeight, min: 0 }}

/*
 * Sprite loop.
 */
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  
}
animate()
````
### **Förväntat utfall: player-objektets hastighet blir 0. player-objektets X-position blir nuvarande - 1.

| **Testfall** | PASS/FAIL | Notering |
|--------------|-----------|----------|
| 1 | PASS ||
| 2 | PASS ||
| 3 | PASS ||
| 4 | PASS ||
| 5 | PASS ||
| 6 | PASS ||
| 7 | PASS ||
| 8 | PASS ||
| 9 | PASS ||
| 10 | PASS ||
| 11 | PASS* | 201 gånger loggas strängen |
| 12 | PASS ||


​
​
## Kodkvalitetskrav
​
**Fetmarkera** de "regler" som används ur CC. Ni kan frångå tabellformat om ni vill. Skapa direktlänkar till er kod där det är lämpligt. Skriv så att jag kan förstå.
​
### Namngivning
​
| Namn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
|                      |                                              |
​
### Funktioner
​
| Metodnamn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
|                      |                                              |
​
## Laborationsreflektion
Reflektera över uppgiften utifrån ett kodkvalitetsperspektiv. Använd begrepp ifrån boken. 