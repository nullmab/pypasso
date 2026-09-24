var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),u=o(((e,t)=>{t.exports=l()})),d=[{id:`print`,number:1,title:`Il primo programma`,subtitle:`print, commenti, e l'ordine delle istruzioni`,minutes:18,goals:[`Capire che un programma è una lista di istruzioni`,`Usare print per mostrare un messaggio`,`Scrivere un commento con #`],theory:[{heading:`Che cosa stai imparando`,body:[`Python è un linguaggio di programmazione: un modo preciso per dire al computer cosa fare. Un programma è una sequenza di istruzioni, eseguite dall'alto verso il basso, una dopo l'altra.`,`La prima istruzione che imparerai è print. Non stampa su carta: scrive del testo nella console, lo schermo del laboratorio.`]},{heading:`La funzione print`,body:[`Il nome print è seguito da parentesi. Dentro le parentesi metti quello che vuoi mostrare, di solito un testo tra virgolette.`],code:{source:`print("Ciao, Python!")`,output:`Ciao, Python!`,caption:`Le virgolette delimitano il testo. Non appaiono nel risultato.`}},{heading:`Più istruzioni, in ordine`,body:[`Ogni print va a capo da sola. L'ordine nel file è l'ordine in cui Python lavora: la riga 1 prima della riga 2.`],code:{source:`print("Prima riga")
print("Seconda riga")`,output:`Prima riga
Seconda riga`}},{heading:`I commenti`,body:[`Tutto quello che sta dopo # su una riga è un commento: Python lo ignora. Servono a te, e a chi leggerà il codice (la tua prof, un compagno, il te del futuro).`],code:{source:`# Questo è un appunto per gli umani
print("Questo invece Python lo esegue")`,output:`Questo invece Python lo esegue`},callout:{tone:`rule`,title:`Virgolette aperte, virgolette chiuse`,body:`Se apri un testo con ", chiudilo con ". Lo stesso vale per l'apostrofo '. Mescolarle è un errore di sintassi.`}}],quiz:[{id:`q1`,prompt:`Cosa fa Python quando trova una riga che inizia con #?`,options:[{id:`a`,text:`La stampa nella console`},{id:`b`,text:`La ignora: è un commento`},{id:`c`,text:`Si ferma e chiede conferma`}],correctId:`b`,explain:`Il cancelletto # introduce un commento. Python non lo esegue.`},{id:`q2`,prompt:`Quale programma stampa esattamente Ciao su una riga?`,code:`Scegli l'istruzione corretta.`,options:[{id:`a`,text:`print Ciao`},{id:`b`,text:`print("Ciao")`},{id:`c`,text:`stampa("Ciao")`}],correctId:`b`,explain:`In Python la funzione si chiama print e vuole le parentesi. Il testo sta tra virgolette.`},{id:`q3`,prompt:`Cosa stampa questo programma?`,code:`print("A")
print("B")`,options:[{id:`a`,text:`AB`},{id:`b`,text:`A B`},{id:`c`,text:`A poi B, su due righe`}],correctId:`c`,explain:`Ogni print termina con un a capo, quindi ottieni due righe.`},{id:`q4`,prompt:`Perché questo codice dà errore?`,code:`print("Ciao)`,options:[{id:`a`,text:`print è scritto in minuscolo`},{id:`b`,text:`Le virgolette del testo non sono chiuse`},{id:`c`,text:`Manca un commento`}],correctId:`b`,explain:`Hai aperto " e non l'hai chiuso. Python chiama questo SyntaxError.`}],lab:{title:`Tre righe in console`,brief:`Scrivi un programma che si presenti in modo ordinato, con tre print.`,spec:[`Stampa esattamente: Ciao, Python!`,`Alla riga successiva: Sto imparando a programmare.`,`Alla terza riga: PyPasso e' il mio laboratorio.`],starter:`# Tre print, tre righe.
`,hint:`Usa tre istruzioni print, una sotto l'altra. Controlla maiuscole, virgole e apostrofi.`,solution:`print("Ciao, Python!")
print("Sto imparando a programmare.")
print("PyPasso e' il mio laboratorio.")
`,tests:[{id:`t1`,label:`Le tre righe coincidono con la traccia`,kind:`stdout`,expected:`Ciao, Python!
Sto imparando a programmare.
PyPasso e' il mio laboratorio.`}]}},{id:`variabili`,number:2,title:`Variabili e tipi`,subtitle:`Dare un nome ai valori: int, float, str, bool`,minutes:22,goals:[`Creare una variabile con l'assegnazione`,`Distinguere interi, decimali, testi e booleani`,`Usare type() per ispezionare un valore`],theory:[{heading:`Una scatola con un'etichetta`,body:[`Una variabile è un nome che punta a un valore. L'operazione si chiama assegnazione e usa il singolo uguale =.`,`A sinistra il nome, a destra il valore. Python valuta prima la destra, poi attacca il nome.`],code:{source:`nome = "Ada"
eta = 16
print(nome)
print(eta)`,output:`Ada
16`}},{heading:`I tipi che userai da subito`,body:[`Ogni valore ha un tipo. I quattro fondamentali:`],bullets:[`int — numero intero: 7, 0, -3`,`float — numero con la virgola (in codice è un punto): 3.14`,`str — stringa, cioè testo tra virgolette`,`bool — True oppure False (con la maiuscola)`],code:{source:`print(type(7))
print(type(3.5))
print(type("ciao"))
print(type(True))`,output:`<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`}},{heading:`Regole per i nomi`,body:[`Un nome può contenere lettere, cifre e trattino basso _, ma non può iniziare con una cifra. Python distingue maiuscole e minuscole: Punteggio e punteggio sono due variabili diverse.`],callout:{tone:`tip`,title:`Scegli nomi che parlano`,body:`eta_studente è meglio di x. Tra qualche settimana ringrazierai te stesso.`}}],quiz:[{id:`q1`,prompt:`Dopo queste istruzioni, cosa contiene x?`,code:`x = 2
x = 5`,options:[{id:`a`,text:`2`},{id:`b`,text:`5`},{id:`c`,text:`2 e 5 insieme`}],correctId:`b`,explain:`L'assegnazione sostituisce il valore precedente. x punta a 5.`},{id:`q2`,prompt:`Qual è il tipo di "3" (con le virgolette)?`,options:[{id:`a`,text:`int`},{id:`b`,text:`str`},{id:`c`,text:`float`}],correctId:`b`,explain:`Le virgolette fanno un testo. Il numero tre senza virgolette è un int.`},{id:`q3`,prompt:`Quale nome di variabile è illegale?`,options:[{id:`a`,text:`voto_finale`},{id:`b`,text:`2n`},{id:`c`,text:`n2`}],correctId:`b`,explain:`Non si può iniziare un nome con una cifra. n2 invece è valido.`},{id:`q4`,prompt:`Cosa stampa print(type(False))?`,options:[{id:`a`,text:`<class 'bool'>`},{id:`b`,text:`<class 'str'>`},{id:`c`,text:`False`}],correctId:`a`,explain:`False è un booleano. type descrive il tipo, non il valore.`}],lab:{title:`Scheda studente`,brief:`Crea tre variabili e usale per stampare una presentazione.`,spec:[`Crea nome con valore "Luca"`,`Crea eta con valore 15`,`Crea citta con valore "Milano"`,`Stampa esattamente: Luca, 15 anni, Milano`],starter:`nome = "Luca"
# crea eta e citta, poi un print
`,hint:`Puoi costruire la riga con una f-string: f"{nome}, {eta} anni, {citta}"`,solution:`nome = "Luca"
eta = 15
citta = "Milano"
print(f"{nome}, {eta} anni, {citta}")
`,tests:[{id:`t1`,label:`Output della scheda`,kind:`stdout`,expected:`Luca, 15 anni, Milano`},{id:`t2`,label:`nome è Luca`,kind:`equals`,expr:`nome`,expected:`Luca`},{id:`t3`,label:`eta è 15`,kind:`equals`,expr:`eta`,expected:15}]}},{id:`input`,number:3,title:`Input e conversioni`,subtitle:`Leggere dalla tastiera e trasformare il testo in numeri`,minutes:20,goals:[`Usare input() per leggere un valore`,`Ricordare che input restituisce sempre una stringa`,`Convertire con int() e float()`],theory:[{heading:`input restituisce testo`,body:[`input() mette in pausa il programma e legge una riga. Il valore che torna è sempre str, anche se hai digitato 7.`,`Nel laboratorio gli input sono simulati: li vedi elencati nella traccia, così i test sono ripetibili.`],code:{source:`nome = input("Come ti chiami? ")
print("Ciao", nome)`,output:`Come ti chiami? Ada
Ciao Ada`,caption:`Il laboratorio fornirà Ada come risposta.`}},{heading:`Convertire per calcolare`,body:[`Se sommi due stringhe ottieni una concatenazione: "2" + "3" è "23". Per fare 5 devi convertire.`],code:{source:`a = int("2")
b = int("3")
print(a + b)`,output:`5`},callout:{tone:`warn`,title:`Il classico errore`,body:`print("Hai " + 16 + " anni") non funziona: non si somma testo e numero. Converti il numero con str(16), oppure usa una f-string.`}}],quiz:[{id:`q1`,prompt:`Che tipo ha sempre il risultato di input()?`,options:[{id:`a`,text:`int se hai scritto un numero`},{id:`b`,text:`str, sempre`},{id:`c`,text:`bool`}],correctId:`b`,explain:`Anche "42" digitato da tastiera è testo. Serve int() se vuoi un numero.`},{id:`q2`,prompt:`Cosa produce int("7") + 1?`,options:[{id:`a`,text:`71`},{id:`b`,text:`8`},{id:`c`,text:`un errore`}],correctId:`b`,explain:`int converte il testo "7" nel numero 7, poi 7 + 1 = 8.`},{id:`q3`,prompt:`Cosa succede con int("ciao")?`,options:[{id:`a`,text:`Diventa 0`},{id:`b`,text:`ValueError: non è un numero`},{id:`c`,text:`Diventa la parola CIAO`}],correctId:`b`,explain:`int sa convertire solo testi che rappresentano un intero.`},{id:`q4`,prompt:`Cosa stampa print("2" + "3")?`,options:[{id:`a`,text:`5`},{id:`b`,text:`23`},{id:`c`,text:`2 3`}],correctId:`b`,explain:`Senza conversione, + tra stringhe concatena.`}],lab:{title:`Somma di due interi`,brief:`Il laboratorio invia due numeri, uno per riga. Stampane la somma.`,spec:[`Leggi il primo numero con int(input())`,`Leggi il secondo numero allo stesso modo`,`Stampa solo il risultato della somma, niente altro`],starter:`# Il laboratorio invierà 4 e poi 7
`,hint:`a = int(input()) legge e converte in un colpo solo.`,solution:`a = int(input())
b = int(input())
print(a + b)
`,inputs:[`4`,`7`],tests:[{id:`t1`,label:`4 + 7 = 11`,kind:`stdout`,expected:`11`,inputs:[`4`,`7`]},{id:`t2`,label:`10 + 20 = 30`,kind:`stdout`,expected:`30`,inputs:[`10`,`20`]},{id:`t3`,label:`0 + 5 = 5`,kind:`stdout`,expected:`5`,inputs:[`0`,`5`]}]}},{id:`operatori`,number:4,title:`Operatori e espressioni`,subtitle:`Calcoli: +, -, *, /, //, %, ** e le parentesi`,minutes:20,goals:[`Distinguere divisione reale e divisione intera`,`Usare il modulo % per il resto`,`Rispettare l'ordine delle operazioni`],theory:[{heading:`Le operazioni aritmetiche`,body:[`Python usa gli operatori che già conosci dalla matematica, con due extra molto usati in informatica.`],bullets:[`+  -  *  /  — somma, sottrazione, prodotto, divisione (risultato float)`,`// — divisione intera: 7 // 2 vale 3`,`% — resto: 7 % 2 vale 1`,`** — potenza: 2 ** 3 vale 8`],code:{source:`print(7 / 2)
print(7 // 2)
print(7 % 2)
print(2 ** 3)`,output:`3.5
3
1
8`}},{heading:`Parentesi e priorità`,body:[`Senza parentesi, potenza prima di moltiplicazione e divisione, poi somma e sottrazione. In dubbio, metti le parentesi: il codice si legge meglio.`],code:{source:`print(2 + 3 * 4)
print((2 + 3) * 4)`,output:`14
20`},callout:{tone:`tip`,title:`Un uso classico di %`,body:`n % 2 == 0 significa «n è pari». Lo userai nelle condizioni.`}}],quiz:[{id:`q1`,prompt:`Quanto vale 17 // 5?`,options:[{id:`a`,text:`3`},{id:`b`,text:`2`},{id:`c`,text:`3.4`}],correctId:`a`,explain:`La divisione intera scarta la parte decimale: 5*3 = 15, resto 2.`},{id:`q2`,prompt:`Quanto vale 17 % 5?`,options:[{id:`a`,text:`3`},{id:`b`,text:`2`},{id:`c`,text:`0`}],correctId:`b`,explain:`17 = 5*3 + 2, quindi il resto è 2.`},{id:`q3`,prompt:`Cosa stampa print(2 + 3 * 4)?`,options:[{id:`a`,text:`20`},{id:`b`,text:`14`},{id:`c`,text:`24`}],correctId:`b`,explain:`Prima 3 * 4 = 12, poi 2 + 12 = 14.`},{id:`q4`,prompt:`Quale espressione calcola il quadrato di n?`,options:[{id:`a`,text:`n // 2`},{id:`b`,text:`n ** 2`},{id:`c`,text:`n % 2`}],correctId:`b`,explain:`** è l'elevamento a potenza.`}],lab:{title:`Minuti in ore e resto`,brief:`Leggi un numero di minuti e stampalo spezzato in ore e minuti rimasti.`,spec:[`Leggi un intero minuti da input`,`Prima riga: quante ore intere (minuti // 60)`,`Seconda riga: i minuti rimanenti (minuti % 60)`],starter:`minuti = int(input())
# due print: ore, poi resto
`,hint:`130 minuti sono 2 ore e 10 minuti: 130 // 60 e 130 % 60.`,solution:`minuti = int(input())
print(minuti // 60)
print(minuti % 60)
`,inputs:[`130`],tests:[{id:`t1`,label:`130 → 2 ore e 10`,kind:`stdout`,expected:`2
10`,inputs:[`130`]},{id:`t2`,label:`60 → 1 ora e 0`,kind:`stdout`,expected:`1
0`,inputs:[`60`]},{id:`t3`,label:`45 → 0 ore e 45`,kind:`stdout`,expected:`0
45`,inputs:[`45`]}]}},{id:`stringhe`,number:5,title:`Stringhe`,subtitle:`Testo: indici, lunghezza, metodi e f-string`,minutes:24,goals:[`Usare len e gli indici (che partono da 0)`,`Affettare una stringa con lo slicing`,`Usare upper, lower, strip e le f-string`],theory:[{heading:`Una stringa è una sequenza`,body:[`Ogni carattere ha una posizione, detta indice. Il primo carattere è all'indice 0, non 1. L'ultimo è len(s) - 1, oppure l'indice negativo -1.`],code:{source:`s = "Python"
print(len(s))
print(s[0])
print(s[-1])
print(s[0:3])`,output:`6
P
n
Pyt`,caption:`s[0:3] è lo slicing: dal 0 incluso al 3 escluso.`}},{heading:`Metodi e f-string`,body:[`Un metodo è una funzione attaccata a un valore: si chiama con il punto. Le stringhe non si modificano sul posto; upper() restituisce una stringa nuova.`],code:{source:`nome = "  ada  "
pulito = nome.strip()
print(pulito.upper())
print(f"Ciao, {pulito}")`,output:`ADA
Ciao, ada`,caption:`I metodi più usati: upper, lower, strip, replace, split.`},callout:{tone:`rule`,title:`f-string`,body:`Una f-string inizia con f prima delle virgolette. Dentro { } puoi mettere un'espressione: f"Ciao {nome}".`}}],quiz:[{id:`q1`,prompt:`Se s = "ciao", quanto vale s[1]?`,options:[{id:`a`,text:`c`},{id:`b`,text:`i`},{id:`c`,text:`ciao`}],correctId:`b`,explain:`Indice 0 è c, indice 1 è i.`},{id:`q2`,prompt:`Cosa fa "PyPasso"[0:2]?`,options:[{id:`a`,text:`Py`},{id:`b`,text:`P`},{id:`c`,text:`PyP`}],correctId:`a`,explain:`Lo slicing esclude l'indice di fine: caratteri 0 e 1.`},{id:`q3`,prompt:`Cosa stampa print(len("Ada"))?`,options:[{id:`a`,text:`Ada`},{id:`b`,text:`3`},{id:`c`,text:`2`}],correctId:`b`,explain:`Tre lettere, lunghezza 3.`},{id:`q4`,prompt:`Quale istruzione mette il testo in maiuscolo?`,options:[{id:`a`,text:`s.upper()`},{id:`b`,text:`upper(s)`},{id:`c`,text:`s.maiuscolo()`}],correctId:`a`,explain:`upper è un metodo: si chiama sulla stringa con il punto.`}],lab:{title:`Iniziali`,brief:`Dati nome e cognome, stampa le iniziali maiuscole attaccate e la lunghezza del nome completo.`,spec:[`Prima input: nome`,`Seconda input: cognome`,`Prima riga di output: iniziali maiuscole attaccate (es. Ada Lovelace → AL)`,`Seconda riga: lunghezza di nome + spazio + cognome`],starter:`nome = input()
cognome = input()
# due print
`,hint:`L'iniziale è nome[0].upper(). La lunghezza del nome completo è len(nome) + 1 + len(cognome).`,solution:`nome = input()
cognome = input()
print(nome[0].upper() + cognome[0].upper())
print(len(nome) + 1 + len(cognome))
`,inputs:[`Ada`,`Lovelace`],tests:[{id:`t1`,label:`Ada Lovelace → AL e 12`,kind:`stdout`,expected:`AL
12`,inputs:[`Ada`,`Lovelace`]},{id:`t2`,label:`luca rossi → LR e 10`,kind:`stdout`,expected:`LR
10`,inputs:[`luca`,`rossi`]}]}},{id:`condizioni`,number:6,title:`Decisioni`,subtitle:`if, elif, else e i confronti`,minutes:24,goals:[`Scrivere un if con una condizione`,`Incatenare elif e chiudere con else`,`Usare and, or, not e i confronti`],theory:[{heading:`Il computer sceglie una strada`,body:[`Un if valuta una condizione. Se è True esegue il blocco indentato, altrimenti lo salta. elif (else if) prova un'altra condizione. else è il piano B, senza condizione.`],code:{source:`voto = 7
if voto >= 8:
    print("Ottimo")
elif voto >= 6:
    print("Sufficiente")
else:
    print("Insufficiente")`,output:`Sufficiente`}},{heading:`Confronti e logica`,body:[`I confronti producono un bool. Puoi combinarli.`],bullets:[`== uguale, != diverso, < > <= >=`,`and è True solo se entrambe le parti sono True`,`or è True se almeno una parte è True`,`not inverte True e False`],callout:{tone:`rule`,title:`L'indentazione non è un vezzo`,body:`In Python il blocco sotto if/elif/else si riconosce dagli spazi (4 spazi). Dimenticarli è l'errore numero uno. Il tasto Tab in questo laboratorio inserisce 4 spazi.`}}],quiz:[{id:`q1`,prompt:`Quale operatore testa l'uguaglianza?`,options:[{id:`a`,text:`=`},{id:`b`,text:`==`},{id:`c`,text:`===`}],correctId:`b`,explain:`Un solo = assegna. Due == confrontano. Python non usa ===.`},{id:`q2`,prompt:`Cosa stampa questo codice se n vale 4?`,code:`if n % 2 == 0:
    print("pari")
else:
    print("dispari")`,options:[{id:`a`,text:`pari`},{id:`b`,text:`dispari`},{id:`c`,text:`niente`}],correctId:`a`,explain:`4 % 2 è 0, quindi la condizione è True.`},{id:`q3`,prompt:`Quando è True l'espressione eta >= 18 and tessera?`,options:[{id:`a`,text:`Se almeno una delle due è vera`},{id:`b`,text:`Solo se entrambe sono vere`},{id:`c`,text:`Mai`}],correctId:`b`,explain:`and richiede tutte le parti vere.`},{id:`q4`,prompt:`A cosa servono i due punti dopo if voto >= 6?`,options:[{id:`a`,text:`Sono facoltativi`},{id:`b`,text:`Aprono il blocco indentato`},{id:`c`,text:`Stampano un messaggio`}],correctId:`b`,explain:`In Python i due punti chiudono l'intestazione di if, while, for, def.`}],lab:{title:`Giudizio sul voto`,brief:`Leggi un voto da 0 a 10 e stampa il giudizio richiesto.`,spec:[`Input: un intero voto`,`Se voto >= 8 stampa Ottimo`,`Altrimenti se voto >= 6 stampa Sufficiente`,`Altrimenti stampa Insufficiente`],starter:`voto = int(input())
`,hint:`L'ordine dei confronti conta: prima il caso più alto (>= 8), poi >= 6, poi else.`,solution:`voto = int(input())
if voto >= 8:
    print("Ottimo")
elif voto >= 6:
    print("Sufficiente")
else:
    print("Insufficiente")
`,inputs:[`7`],tests:[{id:`t1`,label:`9 → Ottimo`,kind:`stdout`,expected:`Ottimo`,inputs:[`9`]},{id:`t2`,label:`6 → Sufficiente`,kind:`stdout`,expected:`Sufficiente`,inputs:[`6`]},{id:`t3`,label:`5 → Insufficiente`,kind:`stdout`,expected:`Insufficiente`,inputs:[`5`]},{id:`t4`,label:`8 → Ottimo (soglia)`,kind:`stdout`,expected:`Ottimo`,inputs:[`8`]}]}},{id:`while`,number:7,title:`Ciclo while`,subtitle:`Ripetere finché una condizione resta vera`,minutes:22,goals:[`Scrivere un while con un contatore`,`Aggiornare la variabile di controllo`,`Usare break con criterio`],theory:[{heading:`Finché la condizione è True`,body:[`while ripete un blocco. All'inizio di ogni giro valuta la condizione: se è True esegue il corpo, poi ricomincia. Se è False esce.`,`Dentro il corpo di solito cambi qualcosa che influenza la condizione. Se dimentichi di aggiornare il contatore, il ciclo non termina: loop infinito.`],code:{source:`n = 3
while n > 0:
    print(n)
    n = n - 1
print("via!")`,output:`3
2
1
via!`}},{heading:`break e continue`,body:[`break esce subito dal ciclo. continue salta il resto del corpo e torna a valutare la condizione. Usali quando rendono il codice più chiaro, non per abitudine.`],callout:{tone:`warn`,title:`Sentinella 0`,body:`Un pattern classico: leggere numeri finché non arriva 0. Lo userai nel laboratorio.`}}],quiz:[{id:`q1`,prompt:`Quante volte si esegue il corpo se n parte da 0 e il while è while n > 0?`,options:[{id:`a`,text:`Zero: la condizione è già falsa`},{id:`b`,text:`Una`},{id:`c`,text:`Infinite`}],correctId:`a`,explain:`while controlla prima di entrare. Se è False, il corpo non gira.`},{id:`q2`,prompt:`Cosa rischia questo codice?`,code:`n = 1
while n > 0:
    print(n)`,options:[{id:`a`,text:`Non stampa niente`},{id:`b`,text:`Un ciclo infinito, perché n non cambia`},{id:`c`,text:`Un NameError`}],correctId:`b`,explain:`n resta 1, la condizione resta True.`},{id:`q3`,prompt:`A cosa serve break?`,options:[{id:`a`,text:`A fermare l'intero programma`},{id:`b`,text:`A uscire dal ciclo più interno`},{id:`c`,text:`A saltare una riga`}],correctId:`b`,explain:`break interrompe il while o il for in cui si trova.`},{id:`q4`,prompt:`Quale aggiornamento fa scendere n di uno?`,options:[{id:`a`,text:`n = n - 1`},{id:`b`,text:`n == n - 1`},{id:`c`,text:`n + 1`}],correctId:`a`,explain:`Serve un'assegnazione. n -= 1 è la forma compatta equivalente.`}],lab:{title:`Somma fino allo zero`,brief:`Leggi interi uno dopo l'altro. Lo 0 chiude la sequenza e non si somma.`,spec:[`Leggi numeri con int(input()) in un while`,`Lo 0 termina la lettura e non va sommato`,`Stampa la somma dei numeri letti prima dello 0`,`Se il primo numero è 0, stampa 0`],starter:`totale = 0
n = int(input())
# continua a leggere finché n non è 0
`,hint:`while n != 0: accumula, poi leggi il numero successivo.`,solution:`totale = 0
n = int(input())
while n != 0:
    totale = totale + n
    n = int(input())
print(totale)
`,inputs:[`3`,`4`,`5`,`0`],tests:[{id:`t1`,label:`3 4 5 0 → 12`,kind:`stdout`,expected:`12`,inputs:[`3`,`4`,`5`,`0`]},{id:`t2`,label:`0 subito → 0`,kind:`stdout`,expected:`0`,inputs:[`0`]},{id:`t3`,label:`10 -3 0 → 7`,kind:`stdout`,expected:`7`,inputs:[`10`,`-3`,`0`]}]}},{id:`for-liste`,number:8,title:`for e liste`,subtitle:`range, liste, indici e for elemento in sequenza`,minutes:26,goals:[`Creare e aggiornare una lista`,`Scorrere con for e con range`,`Usare len, append, min, max, sum`],theory:[{heading:`Una lista è una sequenza mutabile`,body:[`Si scrive tra parentesi quadre, con gli elementi separati da virgole. Come le stringhe, ha indici che partono da 0. A differenza delle stringhe, puoi cambiare un elemento o aggiungerne con append.`],code:{source:`voti = [7, 8, 6]
voti.append(9)
print(voti)
print(voti[1])
print(len(voti))
print(sum(voti))`,output:`[7, 8, 6, 9]
8
4
30`}},{heading:`for e range`,body:[`for elemento in sequenza: esegue il corpo una volta per ciascun elemento. range(n) produce 0, 1, ..., n-1. range(a, b) parte da a e si ferma prima di b.`],code:{source:`for x in [10, 20, 30]:
    print(x)
for i in range(3):
    print("i =", i)`,output:`10
20
30
i = 0
i = 1
i = 2`},callout:{tone:`tip`,title:`Due stili`,body:`Se ti serve solo il valore: for voto in voti. Se ti serve la posizione: for i in range(len(voti)) e poi voti[i].`}}],quiz:[{id:`q1`,prompt:`Cosa produce list(range(3))?`,options:[{id:`a`,text:`[1, 2, 3]`},{id:`b`,text:`[0, 1, 2]`},{id:`c`,text:`[0, 1, 2, 3]`}],correctId:`b`,explain:`range(3) è 0, 1, 2: tre valori, il 3 è il limite escluso.`},{id:`q2`,prompt:`Dopo xs = [1, 2]; xs.append(3), quanto vale xs?`,options:[{id:`a`,text:`[1, 2]`},{id:`b`,text:`[1, 2, 3]`},{id:`c`,text:`3`}],correctId:`b`,explain:`append aggiunge in coda e restituisce None: modifica la lista.`},{id:`q3`,prompt:`Quale ciclo stampa ogni nome di nomi = ["Ada", "Luca"]?`,options:[{id:`a`,text:`for n in nomi: print(n)`},{id:`b`,text:`while nomi: print(nomi)`},{id:`c`,text:`print(nomi[2])`}],correctId:`a`,explain:`for scorre gli elementi. nomi[2] sarebbe fuori indice.`},{id:`q4`,prompt:`Cosa fa sum([2, 3, 4])?`,options:[{id:`a`,text:`Restituisce 3, la lunghezza`},{id:`b`,text:`Restituisce 9`},{id:`c`,text:`Restituisce [2, 3, 4]`}],correctId:`b`,explain:`sum somma gli elementi numerici: 2+3+4 = 9.`}],lab:{title:`Statistiche di una lista`,brief:`Hai già una lista di numeri. Stampa il massimo, il minimo e quanti sono pari.`,spec:[`La lista numeri è già definita nello starter: non cancellarla`,`Prima riga: il massimo`,`Seconda riga: il minimo`,`Terza riga: quanti elementi sono pari (n % 2 == 0)`],starter:`numeri = [4, 7, 2, 9, 12]
# tre print: max, min, conteggio pari
`,hint:`max(numeri) e min(numeri) esistono già. Per i pari, un for con un contatore.`,solution:`numeri = [4, 7, 2, 9, 12]
print(max(numeri))
print(min(numeri))
pari = 0
for n in numeri:
    if n % 2 == 0:
        pari = pari + 1
print(pari)
`,tests:[{id:`t1`,label:`max, min, pari della lista data`,kind:`stdout`,expected:`12
2
3`}]}},{id:`funzioni`,number:9,title:`Funzioni`,subtitle:`def, parametri, return: spezzare il problema`,minutes:26,goals:[`Definire una funzione con def`,`Distinguere parametro e argomento`,`Restituire un valore con return`],theory:[{heading:`Un pezzo di programma con un nome`,body:[`Una funzione raccoglie istruzioni riutilizzabili. def nome(parametri): apre il blocco. return restituisce un valore a chi ha chiamato la funzione e la interrompe.`],code:{source:`def area_rettangolo(base, altezza):
    return base * altezza

print(area_rettangolo(3, 4))
print(area_rettangolo(10, 2))`,output:`12
20`}},{heading:`Parametri e argomenti`,body:[`I parametri sono i nomi nella definizione (base, altezza). Gli argomenti sono i valori passati alla chiamata (3, 4). L'ordine conta: il primo argomento va nel primo parametro.`],callout:{tone:`rule`,title:`print non è return`,body:`print mostra un valore a schermo. return lo consegna al resto del programma. Nei test di questo modulo le funzioni devono restituire, non stampare.`}}],quiz:[{id:`q1`,prompt:`Cosa restituisce una funzione senza return?`,options:[{id:`a`,text:`0`},{id:`b`,text:`None`},{id:`c`,text:`Un errore`}],correctId:`b`,explain:`Se non c'è return, Python restituisce None.`},{id:`q2`,prompt:`Nella riga def media(a, b): quali sono i parametri?`,options:[{id:`a`,text:`media`},{id:`b`,text:`a e b`},{id:`c`,text:`def`}],correctId:`b`,explain:`media è il nome della funzione. a e b sono i parametri.`},{id:`q3`,prompt:`Cosa stampa questo programma?`,code:`def doppio(n):
    return n * 2
print(doppio(5))`,options:[{id:`a`,text:`5`},{id:`b`,text:`10`},{id:`c`,text:`n * 2`}],correctId:`b`,explain:`La chiamata doppio(5) restituisce 10, print lo mostra.`},{id:`q4`,prompt:`Perché i test di questo laboratorio controllano il return e non la console?`,options:[{id:`a`,text:`Perché le funzioni devono poter essere riusate nei calcoli`},{id:`b`,text:`Perché print è vietato in Python`},{id:`c`,text:`Perché return è più veloce`}],correctId:`a`,explain:`Una funzione che restituisce un valore si può usare dentro altre espressioni.`}],lab:{title:`Tre funzioni da compito in classe`,brief:`Implementa le funzioni richieste. I test le chiamano con vari argomenti.`,spec:[`media(a, b, c) restituisce la media aritmetica dei tre numeri`,`e_pari(n) restituisce True se n è pari, False altrimenti`,`area_triangolo(base, altezza) restituisce base * altezza / 2`],starter:`def media(a, b, c):
    # restituisci la media
    return

def e_pari(n):
    return

def area_triangolo(base, altezza):
    return
`,hint:`media: (a + b + c) / 3. e_pari: n % 2 == 0. Non usare print.`,solution:`def media(a, b, c):
    return (a + b + c) / 3

def e_pari(n):
    return n % 2 == 0

def area_triangolo(base, altezza):
    return base * altezza / 2
`,tests:[{id:`t1`,label:`media(10, 20, 30) è 20`,kind:`equals`,expr:`media(10, 20, 30)`,expected:20},{id:`t2`,label:`media(0, 0, 0) è 0`,kind:`equals`,expr:`media(0, 0, 0)`,expected:0},{id:`t3`,label:`e_pari(4) è True`,kind:`equals`,expr:`e_pari(4)`,expected:!0},{id:`t4`,label:`e_pari(7) è False`,kind:`equals`,expr:`e_pari(7)`,expected:!1},{id:`t5`,label:`area_triangolo(10, 4) è 20`,kind:`equals`,expr:`area_triangolo(10, 4)`,expected:20}]}},{id:`progetto`,number:10,title:`Progetto: prezzi`,subtitle:`Metti insieme variabili, decisioni e funzioni`,minutes:30,goals:[`Comporre più funzioni`,`Applicare sconto e IVA in ordine`,`Restituire risultati arrotondati a 2 decimali`],theory:[{heading:`Un problema spezzato in pezzi`,body:[`Nei compiti veri non arriva una sola istruzione: arriva un problema. Il mestiere è spezzarlo in funzioni piccole, ciascuna con un compito solo, e poi comporle.`,`Qui simuli lo scontrino di un negozio: sconto sul prezzo, poi IVA. L'ordine conta.`],code:{source:`def sconto(prezzo, percentuale):
    return prezzo * (1 - percentuale / 100)

print(sconto(100, 20))`,output:`80.0`}},{heading:`Arrotondare i soldi`,body:[`I prezzi si mostrano con due decimali. round(valore, 2) arrotonda a 2 cifre dopo il punto.`],callout:{tone:`tip`,title:`Cosa viene dopo questo corso`,body:`A scuola andrete avanti con dizionari, file di testo, eccezioni e magari qualche grafico. Le basi — variabili, if, cicli, liste, funzioni — restano quelle di queste dieci unità.`}}],quiz:[{id:`q1`,prompt:`Uno sconto del 20% su 100 euro quanto lascia da pagare (prima dell'IVA)?`,options:[{id:`a`,text:`20`},{id:`b`,text:`80`},{id:`c`,text:`120`}],correctId:`b`,explain:`Si paga il 80%: 100 * (1 - 20/100) = 80.`},{id:`q2`,prompt:`Se applichi prima lo sconto e poi l'IVA, l'IVA si calcola sul prezzo già scontato?`,options:[{id:`a`,text:`Sì, è l'ordine di questo progetto`},{id:`b`,text:`No, l'IVA ignora lo sconto`},{id:`c`,text:`Dipende dal nome della variabile`}],correctId:`a`,explain:`Comporre le funzioni in quell'ordine significa tassare il prezzo scontato.`},{id:`q3`,prompt:`Cosa restituisce round(12.345, 2)?`,options:[{id:`a`,text:`12`},{id:`b`,text:`12.35`},{id:`c`,text:`12.34`}],correctId:`b`,explain:`Due decimali, con arrotondamento del 4 successivo (5 in su).`},{id:`q4`,prompt:`Perché conviene una funzione aggiungi_iva a parte?`,options:[{id:`a`,text:`Per poterla riusare e testare da sola`},{id:`b`,text:`Perché Python obbliga tre funzioni`},{id:`c`,text:`Per stampare più in fretta`}],correctId:`a`,explain:`Funzioni piccole e chiare si testano e si combinano senza copiare codice.`}],lab:{title:`Scontrino`,brief:`Tre funzioni che, insieme, calcolano il prezzo finale.`,spec:[`sconto(prezzo, percentuale) restituisce il prezzo già scontato`,`aggiungi_iva(prezzo, percentuale) restituisce il prezzo con IVA`,`prezzo_finale(prezzo, sconto_pct, iva_pct) applica prima lo sconto, poi l'IVA, e arrotonda a 2 decimali con round(..., 2)`],starter:`def sconto(prezzo, percentuale):
    return

def aggiungi_iva(prezzo, percentuale):
    return

def prezzo_finale(prezzo, sconto_pct, iva_pct):
    return
`,hint:`sconto: prezzo * (1 - percentuale / 100). IVA: prezzo * (1 + percentuale / 100). Nel finale: round(aggiungi_iva(sconto(...), iva_pct), 2).`,solution:`def sconto(prezzo, percentuale):
    return prezzo * (1 - percentuale / 100)

def aggiungi_iva(prezzo, percentuale):
    return prezzo * (1 + percentuale / 100)

def prezzo_finale(prezzo, sconto_pct, iva_pct):
    s = sconto(prezzo, sconto_pct)
    con_iva = aggiungi_iva(s, iva_pct)
    return round(con_iva, 2)
`,tests:[{id:`t1`,label:`sconto(100, 20) è 80`,kind:`equals`,expr:`sconto(100, 20)`,expected:80},{id:`t2`,label:`aggiungi_iva(100, 22) è 122`,kind:`equals`,expr:`aggiungi_iva(100, 22)`,expected:122},{id:`t3`,label:`prezzo_finale(100, 20, 22) è 97.6`,kind:`equals`,expr:`prezzo_finale(100, 20, 22)`,expected:97.6},{id:`t4`,label:`prezzo_finale(50, 0, 0) è 50`,kind:`equals`,expr:`prezzo_finale(50, 0, 0)`,expected:50}]}}],f=[{term:`Programma`,def:`Una sequenza di istruzioni che il computer esegue in ordine.`},{term:`Istruzione`,def:`Un comando completo, di solito una riga, come un print o un'assegnazione.`},{term:`Espressione`,def:`Un pezzo di codice che produce un valore, per esempio 2 + 3 o len(nome).`},{term:`Assegnazione`,def:`L'operazione nome = valore. Il nome punta al risultato della parte destra.`},{term:`Variabile`,def:`Un nome che si riferisce a un valore in memoria.`},{term:`Tipo`,def:`La specie di un valore: int, float, str, bool, list...`},{term:`Stringa (str)`,def:`Testo tra virgolette. È una sequenza di caratteri con indici da 0.`},{term:`Intero (int)`,def:`Numero senza parte decimale.`},{term:`Float`,def:`Numero con parte decimale. In codice il separatore è il punto: 3.14.`},{term:`Booleano (bool)`,def:`True oppure False. Risultato tipico di un confronto.`},{term:`Indentazione`,def:`Gli spazi a inizio riga che in Python delimitano i blocchi. Si usano 4 spazi.`},{term:`Condizione`,def:`Un'espressione che vale True o False, usata da if e while.`},{term:`Blocco`,def:`Un gruppo di istruzioni indentate sotto if, while, for o def.`},{term:`Ciclo`,def:`Una struttura che ripete un blocco: while o for.`},{term:`Lista`,def:`Sequenza mutabile tra parentesi quadre: [1, 2, 3].`},{term:`Indice`,def:`La posizione di un elemento, a partire da 0.`},{term:`Funzione`,def:`Un pezzo di programma con un nome, parametri e un eventuale valore di ritorno.`},{term:`Parametro`,def:`Il nome nella definizione: def area(base, altezza).`},{term:`Argomento`,def:`Il valore passato alla chiamata: area(3, 4).`},{term:`Return`,def:`Istruzione che consegna un valore a chi ha chiamato la funzione.`},{term:`None`,def:`Il valore «niente». È quello che restituisce una funzione senza return.`},{term:`Bug`,def:`Un errore nel programma. Debug è il lavoro di trovarlo e correggerlo.`},{term:`Sintassi`,def:`Le regole di scrittura del linguaggio. Un SyntaxError è una frase malformata.`},{term:`Runtime`,def:`Il momento in cui il programma gira. Un RuntimeError nasce durante l'esecuzione.`},{term:`Commento`,def:`Testo dopo #, ignorato da Python, utile alle persone.`}],p=[{title:`Console e variabili`,rows:[{code:`print("ciao")`,meaning:`Mostra un testo`},{code:`x = 7`,meaning:`Assegna 7 a x`},{code:`type(x)`,meaning:`Tipo del valore`},{code:`# commento`,meaning:`Ignorato da Python`}]},{title:`Input e conversioni`,rows:[{code:`s = input()`,meaning:`Legge una riga (str)`},{code:`n = int(s)`,meaning:`Testo → intero`},{code:`x = float(s)`,meaning:`Testo → decimale`},{code:`str(n)`,meaning:`Numero → testo`}]},{title:`Operatori`,rows:[{code:`a + b - c`,meaning:`Somma e sottrazione`},{code:`a * b / c`,meaning:`Prodotto e divisione float`},{code:`a // b`,meaning:`Divisione intera`},{code:`a % b`,meaning:`Resto`},{code:`a ** b`,meaning:`Potenza`}]},{title:`Stringhe`,rows:[{code:`s[0]`,meaning:`Primo carattere`},{code:`s[-1]`,meaning:`Ultimo carattere`},{code:`s[1:4]`,meaning:`Slicing`},{code:`s.upper()`,meaning:`Maiuscolo`},{code:`f"Ciao {nome}"`,meaning:`f-string`}]},{title:`Decisioni e cicli`,rows:[{code:`if x > 0:`,meaning:`Condizione`},{code:`elif x == 0:`,meaning:`Altra condizione`},{code:`else:`,meaning:`Altrimenti`},{code:`while n > 0:`,meaning:`Ripeti finché`},{code:`for x in xs:`,meaning:`Scorri una sequenza`},{code:`for i in range(n):`,meaning:`i da 0 a n-1`}]},{title:`Liste e funzioni`,rows:[{code:`xs.append(3)`,meaning:`Aggiungi in coda`},{code:`len(xs)`,meaning:`Quanti elementi`},{code:`sum(xs)`,meaning:`Somma`},{code:`def f(a, b):`,meaning:`Definisce una funzione`},{code:`return a + b`,meaning:`Valore di ritorno`}]}],m=[{id:`pari-dispari`,title:`Pari o dispari`,unlockAfter:6,minutes:8,brief:`Leggi un intero e di' se è pari o dispari.`,spec:[`Input: un intero`,`Stampa pari oppure dispari, minuscolo`],starter:`n = int(input())
`,hint:`n % 2 == 0 è la condizione di parità.`,solution:`n = int(input())
if n % 2 == 0:
    print("pari")
else:
    print("dispari")
`,inputs:[`7`],tests:[{id:`t1`,label:`7 → dispari`,kind:`stdout`,expected:`dispari`,inputs:[`7`]},{id:`t2`,label:`8 → pari`,kind:`stdout`,expected:`pari`,inputs:[`8`]},{id:`t3`,label:`0 → pari`,kind:`stdout`,expected:`pari`,inputs:[`0`]}]},{id:`tabellina`,title:`Tabellina`,unlockAfter:8,minutes:10,brief:`Stampa i primi 10 multipli di un numero letto da input.`,spec:[`Input: un intero n`,`Dieci righe: n*1, n*2, ... n*10, un valore per riga`],starter:`n = int(input())
`,hint:`for i in range(1, 11): print(n * i)`,solution:`n = int(input())
for i in range(1, 11):
    print(n * i)
`,inputs:[`3`],tests:[{id:`t1`,label:`tabellina del 3`,kind:`stdout`,expected:`3
6
9
12
15
18
21
24
27
30`,inputs:[`3`]}]},{id:`conta-vocali`,title:`Conta vocali`,unlockAfter:8,minutes:12,brief:`Quante vocali (a e i o u, minuscole o maiuscole) ci sono nella parola?`,spec:[`Input: una parola`,`Stampa un intero, il numero di vocali`,`Considera a e i o u, in minuscolo e maiuscolo`],starter:`parola = input()
`,hint:`Scorri i caratteri con for c in parola.lower(): e controlla if c in "aeiou".`,solution:`parola = input()
n = 0
for c in parola.lower():
    if c in "aeiou":
        n = n + 1
print(n)
`,inputs:[`Python`],tests:[{id:`t1`,label:`Python → 1`,kind:`stdout`,expected:`1`,inputs:[`Python`]},{id:`t2`,label:`Ada → 2`,kind:`stdout`,expected:`2`,inputs:[`Ada`]},{id:`t3`,label:`rhythm → 0`,kind:`stdout`,expected:`0`,inputs:[`rhythm`]}]},{id:`massimo-tre`,title:`Massimo di tre`,unlockAfter:9,minutes:10,brief:`Una funzione che restituisce il più grande di tre numeri.`,spec:[`def massimo(a, b, c) restituisce il maggiore dei tre`],starter:`def massimo(a, b, c):
    return
`,hint:`Puoi usare max(a, b, c) oppure una catena di if.`,solution:`def massimo(a, b, c):
    return max(a, b, c)
`,tests:[{id:`t1`,label:`massimo(1, 5, 3) è 5`,kind:`equals`,expr:`massimo(1, 5, 3)`,expected:5},{id:`t2`,label:`massimo(-1, -8, -3) è -1`,kind:`equals`,expr:`massimo(-1, -8, -3)`,expected:-1},{id:`t3`,label:`massimo(2, 2, 2) è 2`,kind:`equals`,expr:`massimo(2, 2, 2)`,expected:2}]},{id:`filtro-positivi`,title:`Solo positivi`,unlockAfter:9,minutes:12,brief:`Funzione che, data una lista, restituisce una nuova lista con i numeri > 0.`,spec:[`def positivi(xs) restituisce una lista nuova, senza modificare xs`],starter:`def positivi(xs):
    return
`,hint:`Crea out = [] e fai append dei n > 0.`,solution:`def positivi(xs):
    out = []
    for n in xs:
        if n > 0:
            out.append(n)
    return out
`,tests:[{id:`t1`,label:`[-1, 0, 2, 5] → [2, 5]`,kind:`equals`,expr:`positivi([-1, 0, 2, 5])`,expected:[2,5]},{id:`t2`,label:`lista vuota`,kind:`equals`,expr:`positivi([])`,expected:[]},{id:`t3`,label:`tutti negativi`,kind:`equals`,expr:`positivi([-3, -1])`,expected:[]}]}];function h(e){return d.find(t=>t.id===e)}function g(e){return m.find(t=>t.id===e)}export{f as a,o as c,h as i,c as l,m as n,d as o,g as r,u as s,p as t};