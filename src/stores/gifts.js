import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {Person} from "../models/Person.js";
import {Gift} from "../models/Gift.js";
import {isEmpty, removeAccent} from "../../assets/utils/utils.mjs";


/**
 * Custom store a la Svelte
 */

export const useGiftsStore = defineStore('gifts', () => {

    const
        person = ref(
            /** @type {Person|null} */
            null
        ),
        value = ref(
            /** @type {Gift[]} */
            []
        ),
        search = ref(''),
        all = ref(
            /** @type {Gift[]} */
            []
        );

    function applySort(arr) {
        return arr.sort((a, b) => b.annee - a.annee);
    }

    function applyFilter(gifts, search) {
        if (isEmpty(search)) {
            return applySort(all.value);
        }
        const results = new Set;
        for (let s of search.split(/\s+/)) {

            gifts
                .filter(
                    x => (
                        removeAccent(x.description.toLowerCase())
                            .includes(removeAccent(s.toLowerCase())) ||
                        (x.annee + '').includes(s)
                    )
                )
                .forEach(
                    x => results.add(x)
                );
        }
        return applySort([...results]);
    }

    watch(search, s => {
        value.value = applyFilter(all.value, s);
    });

    watch(all, a => {
        value.value = applyFilter(a, search.value);
    });


    watch(person, p => {
        if (p instanceof Person) {
            all.value = p.gifts;
        } else if (p === null) {
            all.value = [];
        }
    });

    Gift.hook.subscribe(() => {
        all.value = (person.value?.gifts) ?? [];
    });


    return {person, value, all, search};
});



