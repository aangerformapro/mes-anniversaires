import {defineStore} from "pinia";
import {Person} from "../models/Person.js";
import {ref, watch} from "vue";
import {isEmpty, removeAccent} from "../../assets/utils/utils.mjs";


export const usePersonsStore = defineStore(
    'persons',
    () => {

        const
            value = ref(
                /** @type {Person[]} */
                []
            ),
            search = ref(''),
            all = ref(
                /** @type {Person[]} */
                []
            );


        function applySort(arr) {
            return arr.sort((a, b) => a.next.getTime() - b.next.getTime());
        }

        function applyFilter(persons, search) {
            if (isEmpty(search)) {
                return applySort(all.value);
            }
            const results = new Set;
            for (let s of search.split(/\s+/)) {

                persons
                    .filter(
                        x => removeAccent(x.name.toLowerCase())
                            .includes(removeAccent(s.toLowerCase())))
                    .forEach(
                        x => results.add(x)
                    );
            }
            return applySort([...results]);
        }


        watch(search, newValue => {
            value.value = applyFilter(all.value, newValue);
        });

        watch(all, newValue => {
            value.value = applyFilter(newValue, search.value);
        });


        Person.hook.subscribe(() => {
            all.value = Person.findAll();
        });

        return {value, search, all};
    });