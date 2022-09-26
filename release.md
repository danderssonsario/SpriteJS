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
Min modul är skapad för att underlätta för andra programmerare att skapa egna spelar-objekt i HTML Canvas. Målet har vart att komma på en generell lösning
för olika typer av 2D-spel.
vilket gör att modulen kan betraktas som en slags boilerplate för skapande av spelar-objekt. HuvudKlassen består utav ett urval av attribut och metoder som ofta förekommer i spel. Återanvändning av koden i denna modul sker genom instansiering av huvudklassen och med instansen kunna göra anrop till klassmetoder och sätta attribut. För att Sprite-objekt ska uppnå full effekt brukas denna lämpligtvis i någon typ av spel loop, för att ge objektet en typ av livscykel.

Instruktioner med exempel på hur denna modul används återfinns i [README.md](./README.md)
​
## Beskrivning av min kod
Min modul cirkulerar kring Sprite klassen. Klassen fungerar som en mall för att skapa spelobjekt till spel skapat med HTML-Canvas.

Metoden 'update' är nog klassens viktigaste, då den uppdaterar ett Sprite-instans attribut över tid.
Under ett Sprite-instans livstid kan programmeraren sätta värden på ett urval av attribut som ofta förekommer i spel, som 'update' metoden sedan bearbetar. T.ex
kan programmeraren välja att sätta en vertikal acceleration och se sitt objekt accelerera upp/ned, utan att behöva tänka på förhållanden mellan acceleration, hastighet och position över tid.

Mycket av klassen bygger på att sätta klassattribut som 'update' tar hand om, men modulen innehåller även några metoder.

Metoden 'addAnimation' tar in information om enskilda bilder som parametrar och skapar en ny animation av bilder hämtade från Sprite-instansens 'spritesheet' (en bild som innehåller 'flera' bilder). Denna animation kan senare väljas ut av programmeraren att loopa igenom.

Metoden 'distanceTo' räknar ut avståndet i pixlar/punkter från mittpunkten av Sprite-instansen till en targetpunkt. Skulle denna target vara en annan Sprite-instans eller objekt kommer metoden räkna ut avståndet till dess mittpunkt.

Metoden 'angleTo' räknar ut vinkeln i grader från mittpunkten av Sprite-instansen till en targetpunkt. Skulle denna target vara en annan Sprite-instans eller objekt kommer metoden räkna ut vinkeln till dess mittpunkt.

Metoden 'detectCollision' kollar om Sprite-instansen överlappar med en annan Sprite-instans.
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

## **Testfall 4: Sätta horisontell hastighet.**
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
### **Förväntat utfall: player-objekt rör sig konstant åt höger. Konsol loggar en hastighet som är 1.

## **Testfall 5: Sätta vertikal hastighet.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**

````javascript
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  //test
  player.velocityY = 1
  console.log(player.velocityY)
}
animate()
````
### **Förväntat utfall: player-objekt rör sig konstant åt vänster. Konsol loggar en hastighet som är 1.

## **Testfall 6: Sätta horisontell acceleration.**
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

## **Testfall 7: Sätta vertikal acceleration.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  //test
  player.accelerationY = 1
  console.log(player.velocityX)
}
animate()
````
### **Förväntat utfall: player-objekt rör sig nedåt med ökande hastighet. player.velocityY ökar mellan varje frame med 1. 

## **Testfall 8: Sätta friktion.**
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

## **Testfall 9: Sätta rotationshastighet.**
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
### **Förväntat utfall: player-objekt roterar konstant åt höger. player.angle ökar med 10 grader mellan varje frame för att återgå till 0 vid varje heltvarv. 

## **Testfall 10: Sätta negativ rotationshastighet.**
### **Förutsättning: Testfall 1, 2, 3
### **Tilldelning av värde enligt nedan.**
````javascript
//test
player.rotationSpeed = -10

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  console.log(player.angle)
}
animate()
````
### **Förväntat utfall: player-objekt roterar konstant åt vänster. player.angle minskar med 10 grader mellan varje frame för att återgå till 0 vid varje heltvarv.

## **Testfall 11: Vända objekt runt x-axeln.**
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

## **Testfall 12: Vända objekt runt y-axeln.**
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
### **Förväntat utfall: player-objekt är vänt åt motsatt håll vertikalt. 

## **Testfall 13: Hämta avstånd till objekt/punkt.**
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

## **Testfall 14: Hämta vinkel till objekt/punkt.**
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

## **Testfall 15: Kollidering mellan objekt.**
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

## **Testfall 16: Avgränsning av objektets rörelser.**
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

| **Testfall** | **PASS/FAIL** | **Notering** |
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
| 11 | PASS ||
| 12 | PASS ||
| 13 | PASS ||
| 14 | PASS ||
| 15 | PASS* | Strängen loggas 201 gånger|
| 16 | PASS ||
​
## Kodkvalitetskrav
​
**Fetmarkera** de "regler" som används ur CC. Ni kan frångå tabellformat om ni vill. Skapa direktlänkar till er kod där det är lämpligt. Skriv så att jag kan förstå.
​
### Namngivning
​
| Namn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
| **Sprite** : namn på huvudklass    | **Class names**: Sprite är ett substantiv. <br> **Use solution domain names**: Termen Sprite är en känd term bland programmerare som jobbar med grafik. Däremot kan den vara okänd bland andra och möjligtvis förknippas med annat, exempelvis läsken. Ett namn som 'SpriteGraphic' hade passat bättre för att förtydliga att det handlar om datorgrafik. Namnet Sprite behölls eftersom den passar istället bra in i 'Problem Domain' <br> **Use problem domain names**: Modulen hanterar animationer/grafik med "spritesheets" och därför passar klassnamnet 'Sprite' bra.      |
|  **currentAnimation** : attribut till huvudklass Sprite    |   **Use pronouncable names**: Variabelnamnet är lätt att uttala och därför lätt att diskutera den i kodsammanhang. <br> **Use intention-revealing names**: Detta variabelnamn är bra på så sätt det enkelt att ta reda på varför den finns, och det för att lagra en nuvarande animation. Däremot kunde man ha tagit det ett steg längre och komma på ett namn som även avslöjar mer vad den används för. Möjligtvis hade 'currentAnimationToRender' vart ett bättre val enligt denna regel.   <br> **Use searchable names**: Variabelnamnet är en aningen svår att lokalisera i koden då det innehåller variabler som är ganska lika, t.ex currentFrame, animations och currentFrameIndex. Den är iallafall sökbar efter sökning på 'currentA'.           |
| **update** : metodnamn i huvudklass Sprite  | **Pick one word per Concept**: Termen update används för konceptet att uppdatera/ändra Sprite-instansen över tid vilket gör det enklare att förknippa metodnamnet med denna klass. <br> **Don't be cute**: Inget överflödigt alls i detta metodnamn. Ingen onödig humor eller slang involverat, bara ett enkelt 'update' rakt av. <br> **Use intention-revealing names**: Med metodnamnet 'update' är det enkelt att förstå vad metoden gör, uppdaterar/ändrar något. Men det går inte att veta vad som uppdateras utan att titta på kod. 'updateProperties' hade vart ett bättre namnval här för att visa just vad metoden uppdaterar.                                |
| **target**: lokal variabel och parameter i metoderna detectCollision, angleTo och distanceTo | **Make meaningful distinctions**: termen target används som prefix till variabler som representerar lika värden som metoden även räknar ut för instansen som gör anropet. T.ex 'targetCenterX' och 'centerX', detta gör target till ett bra namn, då det blir lätt att särskilja tillhörandet av variablerna. Target används även som objekt i en av metoderna, också bra för att särskilja vilket objekt ett attribut plockas ut från. 
​ **distanceTo**: metodnamn i huvudklass Sprite | **Method Names**: Metodnamnet är inte ett verb vilket ger ingen indikation på att någonting utförs. calculateDistanceTo eller hade vart bättre metodnamn enligt denna regel. <br> **Use intention-revealing names**: Den som läser metodnamnet får reda på att metoden handlar om distans till någonting, men den avslöjar inget mer än så. Bättre hade det vart att inkludera target i namnet istället för parameter för att förtydliga att det är avståndet till ett mål/slutpunkt. Metoden default:ar även från mittpunkten för objekt, det kan också inte på nåt sätt fås utav att bara läsa metodnamnet, utan man måste läsa kommentar/kod. |
### Funktioner
​
| Metodnamn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
| **player.addAnimation(options)**: Klassmetod i Sprite som skapar utifrån specifikationer om frames.  |  **Small!**: Metoden är 15 rader lång vilket är bra enligt regeln som vill att funktioner i princip aldrig ska överstiga 20 rader. <br> **Function Argument**: Metoden har en parameter options som är ett objekt innehållandes data om enskilda frames. Det som är mindre bra är att objektet i sin tur innehåller sex stycken nyckel-värde par. Men då det är grupperat i ett objekt som används för att instansiera en annan klass blir det mer ok, då det tillhör samma koncept.|
| **player.detectCollision(target)**: Klassmetod i Sprite som upptäcker/kollar om överlappning med ett annat objekt sker. | **Small!**: Metoden är lite över 60 rader lång, här finns definitivt förbättringsutrymme. <br> **Do one thing**: Metoden bryter mot denne regel då den gör mer än en sak. En metod för att ta fram normalvektorer och en för skalärprodukter kan man bryta ut ur denna metod för att metoden endast ska kolla överlappningen. <br> **Dont repeat yourself**: Metoden har ett fall av upprepning och det är for-looparna för att ta fram skalärprodukterna. En loop görs för Sprite-instansen som gör anropet och en för objektet som ska testas mot. Detta kan nog brytas ut i en egen funktion för att undvika upprepningen. 
| **player.update()**: Klassmetod i sprite som uppdaterar attribut. | **Function Argument**: Detta är den ideala metoden då den inte har någon parameter (niladic). <br> **One level of abstractions per function.**: Metoden innehåller flera anrop till andra privata klassmetoder för att uppdatera enskilda attribut/koncept för sig vilket är bra för att hålla metodkoden på samma abstraktionsnivå.
| **#hasReachedDelay()**: private hjälpmetod i Sprite-klassen som kollar om en fördröjning har uppnåtts. | **Do one thing**: Metoden gör endast en grej, kikar om en särskild tid har uppnåtts. <br> **Use descriptive names**: Metodens namn berättar ganska tydligt vad den vill uppnå med anropet, ordei 'has' i början av metodnamnet indikerar även att return-typen(boolean) vilket är bra.  <br> **One level of abstraction per function**: Metoden håller en låg abstraktionsnivå rakt igenom, men framförallt är nivån jämn vilket är bra. |
| **#updatePosition()**: privat hjälpmetod i Sprite-klassen som uppdaterar positionen. | **Command query separation**: Metoden följer denna regel bra då den endast gör saker. Den 'svarar' inte eller returnerar något utan existerar för att ändra på objektets tillstånd. <br> **Do one thing**: Metoden gör mer än att uppdatera positionen på sprite-objektet. Den räknar även objektets minsta och största positions-värden för att avgöra om objektet 'krockar i' eller rör sig utanför sin avgränsning innan den uppdaterar positionen, vilket strider mot regeln. Detta bör lösas med att åtminstone bryta ut logiken som räknar ut objektets minsta och största positions-värden. Gärna logiken som kollar avgränsningen också. **Have no side effects**: I och med undersökningen av avgränsningen, kommer denna metod att även ändra på värdena för objektets hastighet vid de fall objektet rör sig mot avgränsningen. Då updatePosition endast bör uppdatera positionen kan detta räknas som en sidoeffekt vilket inte är bra. |
​
## Laborationsreflektion
Reflektera över uppgiften utifrån ett kodkvalitetsperspektiv. Använd begrepp ifrån boken. 
Jag upplever koncepten och reglerna i boken mycket bra, då jag inte riktigt har stött på vägledning av denna detalj tidigare. Genom denna uppgift har jag definitivt stött på några brister i min kodkvalitét som boken hjälpt mig sätta ord på och finna åtgärder till. Några åtgärder som jag hunnit tillämpa denna uppgift, andra som får vänta till nästa.

Ett problem jag hade var storleken på funktionerna. Mina funktioner i det tidigare skedet av denna uppgift har generellt varit ganska långa, definitivt över bokens smärtgräns på 20 rader. Detta ledde till en onödig komplexitet och en svårighet att underhålla koden under tiden jag utökade ny funktionalitet. Att hålla funktioner korta ökar både läsbarhet och förståelse och jag kommer definitivt ta med mig det till framtida projekt.

Kortare funktioner stödjer även andra koncept i boken som att låta en funktion göra en sak och att hålla kod av samma abstraktionsnivå i en funktion. Exempelvis i min ‘update’-metod har jag strävat efter att hålla en hög abstraktionsnivå för att öka läsbarheten för andra programmerare. Viktigt för mig att tänka på också är att i metoder på låg abstraktionsnivå undvika sidoeffekter som förutom bryter mot ‘Do one thing’ även förstör förtroendet för abstraktioner i kod. Att kunna separera handling och svar med hjälp utav ‘Command query separation’ finner jag grymt bra. Ibland är det tillämpat av mig omedvetet, men att ta med detta som koncept till framtida projekt tror jag kommer öka min kodkvalitét.

**När det kommer till namngivning känner jag att jag har bättre koll, däremot kan det bli fall som strider mot koncepten på grund av lathet/slarv. Men jag kommer i framtiden ta det som ett krav för mig att tillämpa koncepten fullt ut som t.ex att beskriva avsikter och undvika att lämna falska ledtrådar i nämngivningen. ‘Add meaningful context’ var ett extra intressant koncept för mig att tänka på. I enstaka fall har jag förut lagt till prefix på en grupp variabler för att visa att dessa är del av ett större koncept. I dessa fall är det istället ännu klokare att lägga till sammanhanget genom en klass. Just att lägga till fler klasser, för att gruppera koncept samt skriva återanvändbar kod, önskar jag att jag hade lagt mer tid på i denna uppgift.

Uppgiften har blivit en ögonöppnare för mig som programmerare. I tidigare projekt har man endast tänkt på att lösa ett problem. Nu i denna uppgift krävdes det att förutom lösa uppgiften, tänka extra på hur man kan göra ett problem lättare för en annan programmerare. Den approachen har jag inte riktigt tagit på mig tidigare utan nu genom denna uppgift har man förstått betydelsen av att skriva kod av hög kvalitét för att kunna kommunicera lösningar vidare.
