import { Orar } from '../components/Orar';
 
export function OrarPage() {
    const orar = [
        { id: 0, ziua: "LUNI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
        { id: 1, ziua: "LUNI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Gui", activitate: "Fitness" },
        { id: 2, ziua: "LUNI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Alexandru+Sărăndan", activitate: "Jogging" },
        { id: 3, ziua: "LUNI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Alexandru+Sărăndan", activitate: "Jogging" },
        { id: 4, ziua: "LUNI", baza: "Baza 1", locul: "Stadion", ora: "20:00", participanti: "Datcu+Ionescu", activitate: null },
        { id: 5, ziua: "LUNI", baza: "Baza 2", locul: "Sala", ora: "20:00", participanti: "Ionescu", activitate: "Baschet 3X3" },
        { id: 6, ziua: "LUNI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț+Szabo", activitate: "Fotbal" },
        { id: 7, ziua: "LUNI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Molcuț+Szabo", activitate: "Fotbal" },

        { id: 8, ziua: "MARTI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Alexandru", activitate: "Culturism" },
        { id: 9, ziua: "MARTI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Sărăndan", activitate: "Culturism" },
        { id: 10, ziua: "MARTI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Alexandru + Ionescu", activitate: "Jogging" },
        { id: 11, ziua: "MARTI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Chirilă M + Chirilă D", activitate: "Jogging" },
        { id: 12, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
        { id: 13, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 14, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Cerc volei" },
        { id: 15, ziua: "MARTI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț + Datcu", activitate: "Fotbal" },
        { id: 16, ziua: "MARTI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Szabo + Datcu", activitate: "Fotbal" },

        { id: 17, ziua: "MIERCURI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
        { id: 18, ziua: "MIERCURI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Sărăndan", activitate: "Culturism" },
        { id: 19, ziua: "MIERCURI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Gui + Alexandru", activitate: "Jogging" },
        { id: 20, ziua: "MIERCURI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Alexandru + Datcu", activitate: "Jogging" },
        { id: 21, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
        { id: 22, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 23, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 24, ziua: "MIERCURI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț + Szabo", activitate: "Fotbal" },

        { id: 25, ziua: "JOI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
        { id: 26, ziua: "JOI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Gui", activitate: "Fitness" },
        { id: 27, ziua: "JOI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Sărăndan + Alexandru", activitate: "Jogging" },
        { id: 28, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
        { id: 29, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 30, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Ionescu", activitate: "Baschet 3X3" },
        { id: 31, ziua: "JOI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Szabo + Datcu", activitate: "Fotbal" },
        { id: 32, ziua: "JOI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Molcuț + Datcu", activitate: "Fotbal feminin" },
        { id: 33, ziua: "JOI", baza: "Baza 2", locul: "Teren", ora: "20:00", participanti: "Molcuț + Szabo", activitate: null },

        { id: 34, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "08:00", participanti: "Sărăndan", activitate: "Culturism" },
        { id: 35, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "10:00", participanti: "Sărăndan", activitate: "Culturism" },
        { id: 36, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Chirilă M", activitate: "Fitness" },
        { id: 37, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Chirilă M", activitate: "Fitness" },
        { id: 38, ziua: "VINERI", baza: "Baza 1", locul: "Stadion", ora: "10:00", participanti: "Ciorsac + Ionescu", activitate: "Jogging" },
        { id: 39, ziua: "VINERI", baza: "Baza 1", locul: "Stadion", ora: "12:00", participanti: "Gui + Chirilă D", activitate: "Jogging" },
        { id: 40, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
        { id: 41, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "10:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 42, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "12:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 43, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
        { id: 44, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Cerc volei" }
        ];

    
    return (
        <>
            <Orar orar = {orar} /> 
        </>
    )

}