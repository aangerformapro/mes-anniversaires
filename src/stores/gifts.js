import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import {Person} from "../models/Person.js";
import {Gift} from "../models/Gift.js";
import {isEmpty, removeAccent} from "../../assets/utils/utils.mjs";


export const useGiftsStore = defineStore('gifts', ()=>{

    const
        person = ref(null),
        value = ref(null),
        search = ref(''),
        all = ref(null);

    watch(person, p=>{
        if(p instanceof Person){
            all.value = p.gifts;

            console.debug(p.gifts);
        }
    });

    Gift.hook.subscribe(() => {
        all.value = (person.value?.gifts) ?? [];
    });

    function applyFilter(gifts, search) {
        if (isEmpty(search)) {
            return all.value;
        }
        const results = new Set;
        for (let s of search.split(/\s+/)) {

            gifts
                .filter(
                    x => removeAccent(x.description.toLowerCase())
                        .includes(removeAccent(s.toLowerCase())))
                .forEach(
                    x => results.add(x)
                );
        }
        return [...results];
    }

    watch(search, s=>{
        applyFilter(all.value, s);
    });

    watch(all, a=>{
        applyFilter(a, search.value);

        console.debug(all.value, value.value);
    });


    return {person, value, all, search};
}) ;