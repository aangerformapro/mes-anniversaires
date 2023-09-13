import { defineStore } from "pinia";
import
{
    isEmpty,
    isNumeric,
    isString
} from "../../assets/utils/utils.mjs";
import { fakerFR as faker } from "@faker-js/faker";
import Model from "../../assets/utils/model.mjs";
import {computed, reactive, ref} from "vue";
import {Person} from "../models/Person.js";
import {Gift} from "../models/Gift.js";










export function makeFakeData(max = 10)
{
    if (Person.findAll().length === 0)
    {

        for (let _ = 0; _ < max; ++_)
        {

            const _person = new Person;
            _person.name = faker.person.fullName();
            _person.birthday = faker.date.past({ years: 80 });
            // _person.photo = faker.image.urlLoremFlickr({ width: 320, height: 240 });
            Person.add(_person);

            for (let __ = 0; __ < Math.ceil(Math.random() * 10); ++__)
            {
                const _gift = new Gift, desc = [
                    faker.vehicle.vehicle(),
                    faker.commerce.product(),
                    faker.animal.type(),
                ];
                _gift.id_person = _person;
                _gift.annee = faker.date.past({ years: 79 }).getFullYear();
                _gift.description = desc[Math.floor(Math.random() * desc.length)];
                Gift.add(_gift);
            }
        }
    }
}





export const usePersonsStore = defineStore('persons', () =>
{
let
    initial = Person.findAll(),
    persons = ref(initial),
    search = ref(''),
    filtered = ref(initial);


    Person.hook.subscribe(list => persons.value = list.map(x => Person.findById(x.id)));

    function add(person)
    {
        Person.add(person);
    }

    function onInput(e){

        let input = e.target.value;
        search.value = input;

        filtered.value = persons.value.filter(item=>
            item.name.toLowerCase().includes(input.toLowerCase())
        );

    }



    return { persons,search, filtered, onInput,add };
});


export const useGiftStore = defineStore('gifts', () =>
{

    const gifts = ref([]);

    Gift.hook.subscribe(list => gifts.value = list.map(x => Gift.findById(x.id)));

    function add(gift)
    {
        Gift.add(gift);
    }

    return { gifts, add };
});