import { defineStore } from "pinia";
import { Person } from "../models/Person.js";
import { ref, watch } from "vue";
import {isEmpty, removeAccent} from "../../assets/utils/utils.mjs";





export const usePersonsStore = defineStore(
    'persons',
    () =>
    {

        const
            value = ref(Person.findAll()),
            search = ref(''),
            filtered = ref(Person.findAll());

        Person.hook.subscribe(() =>
        {
            value.value = Person.findAll();
        });

        function applyFilter(persons, search)
        {

            if(isEmpty(search)){
                return value.value;
            }


            const results = new Set;

            for (let s of search.split(/\s+/))
            {

                persons
                    .filter(
                        x => removeAccent(x.name.toLowerCase())
                                .includes(removeAccent(s.toLowerCase())))
                    .forEach(
                        x => results.add(x)
                    );
            }
            return [...results];
        }



        watch(search, newValue=>{
           filtered.value = applyFilter(value.value, newValue)
        });


        return { value, search, filtered };
    });