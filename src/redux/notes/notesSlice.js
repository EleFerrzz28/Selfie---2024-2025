import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        value: [
             {
                 id: 0,
                 title: "Operating Systems",
                 desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
                 tags: ["university", "exams"],
                 date: "2025-10-12"
             },
             {
                 id: 1,
                 title: "Ricetta Crostini con Salsicce",
                 desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione veniam odit iusto unde laboriosam perferendis suscipit minima, animi optio aliquid qui nulla saepe magnam inventore rerum. Temporibus architecto libero eum aperiam delectus? Deserunt est officia harum, ipsa consequatur molestias blanditiis nemo asperiores quisquam tempora magni maiores dolor illo perferendis in.
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum rerum illum expedita consequuntur, ipsum numquam placeat voluptatum laborum magni sapiente quibusdam vel nihil harum reprehenderit soluta nemo accusamus doloremque a quis mollitia odio non, minima adipisci. Suscipit, natus nesciunt corrupti repellendus voluptatem laudantium, optio temporibus at neque animi praesentium illum asperiores? Reprehenderit at repellat maxime laborum rerum. Tempore, delectus. Distinctio ad dolorum autem necessitatibus ab, praesentium ullam debitis molestias officiis quas a, fuga repudiandae. Eius pariatur ut autem ducimus perferendis?`,
                 tags: ["kitchen", "snacks"],
                 date: "2024-04-17"
             },
             {
                 id: 2,
                 title: "Compiti Sabato",
                 desc: "Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
                 tags: ["homeworks"],
                 date: "2025-08-19"
             },
             {
                 id: 3,
                 title: "Dream",
                 desc: "Odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
                 tags: ["diary", "Freud"],
                 date: "2024-10-05"
             },
             {
                 id: 4,
                 title: "Ottimizzazione Veneta",
                 desc: "La ricetta originale dei pizzoccheri? Eccola servita e presentata dallo chef Alessandro Negrini, che nelle cucine di Giallozafferano ha portato questo primo piatto della tradizione valtellinese ricco e squisito. I pizzoccheri alla valtellinese sono una delle prelibatezze da assaggiare almeno una volta nella vita, da provare in particolare nel piccolo comune di Teglio (in provincia di Sondrio). Sono una pietanza la cui bontà non deriva solo dalla lavorazione degli ingredienti, ma anche dalla scelta degli stessi: farina di grano saraceno macinata a pietra, verze dell'orto, burro di malga sono alcuni tra i must have per riprodurli fedelmente a casa e lasciare i vostri ospiti sbalorditi. Alessandro Negrini spiega come fare i pizzoccheri in maniera straordinaria, un vero esperto perché li vedeva preparare fin dalla tenera età quando a prepararli era la sua nonna. Sulle orme della tradizione potrete realizzare questa pietanza goduriosa, da preparare in estate e in inverno, a partire dalla lavorazione stessa dei pizzoccheri, un formato di pasta simile a tagliatelle ma più corto, realizzato con farina di grano saraceno, farina tipo 0 e acqua. Per scoprire tutto il gusto autentico di questo piatto, seguite i passaggi e i suggerimenti per cucinare e condividere un favoloso piatto di pizzoccheri caldo e filante! Scoprite gli altri piatti tipici della Valtellina, o le loro sfiziose rivisitazioni: Pizzoccheri bianchi della Valtellina",
                 tags: ["veneto", "zagato", "flussi"],
                 date: "2023-03-09"
             },
        ],
        sortBy: "date",
        query: ""
    },
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload)
        },
        deleteNote: (state, action) => {
            state.value = state.value.filter(note => note.id !== action.payload);
        },
        copyNote: (state, action) => {
            const noteToCopy = state.value.find(note => note.id === action.payload);
            if (noteToCopy) {
                state.value.push({
                    ...noteToCopy,
                    id: Date.now()
                })
            }
        },
        setSortBy: (state, action) =>{
            state.sortBy = action.payload;
        },
        setQuery: (state, action) =>{
            state.query = action.payload;
        }
    },
})

export const { add, deleteNote, copyNote, setQuery, setSortBy } = notesSlice.actions;
export const notesReducer = notesSlice.reducer