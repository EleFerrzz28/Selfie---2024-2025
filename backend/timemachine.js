import { DateTime } from "luxon";

// inizialmente, non c'è differenza con l'orologio real
let offset = 0; 
const ZONE = "Europe/Rome";

// restituisce ora corrente della TimeMachine
export const getNow = () => {
    return DateTime.now().setZone(ZONE).plus({ milliseconds: offset });
}

// imposta la TimeMachine a un ISO string (lato backend)
export const setTimeMachine = (isoString) => {
    // forza fuso Europe/Rome anche se l'ISO non contiene offset
    const target = DateTime.fromISO(isoString, { zone: ZONE });
    offset = target.toMillis() - DateTime.now().setZone(ZONE).toMillis();
    console.log("TimeMachine impostata a:", target.toISO(), "Offset ms:", offset);
};

// resetta TimeMachine all'orologio reale
export const resetTimeMachine = () => {
    offset = 0;
    console.log("TimeMachine resettata a ora reale:", DateTime.now().setZone(ZONE).toISO());
};